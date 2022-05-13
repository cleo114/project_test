from flask import render_template, flash, redirect, url_for, request
from app import app
from app.forms import LoginForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Score
from flask import request
from werkzeug.urls import url_parse
from app import db
from app.forms import RegistrationForm

from sqlalchemy.sql import func


@app.route('/')
@app.route('/index')
@login_required
def index():
    user = {'username': 'Miguel'}
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template('index.html', title='Home Page', posts=posts)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)




@app.route('/game' , methods=['GET', 'POST'])
@login_required
def play():
    if request.method =='POST':
        print(request.form['score'])
        record = Score(user_id=current_user.id, points= request.form['score'])
        db.session.add(record)
        db.session.commit()
        return('', 204)
    return render_template('game.html', title='Game')



@app.route('/score')
@login_required
def score():

    xx=db.session.query(User.username, func.max(Score.points), func.count(Score.user_id), func.round(func.avg(Score.points),1) ).filter(User.id==Score.user_id).group_by(Score.user_id).order_by(func.max(Score.points).desc()).limit(10).all()

    return render_template('score.html', title='Scores', res=xx)
