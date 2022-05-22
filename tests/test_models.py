import unittest, os
from app import app, db
from app.models import User, Score


class Models (unittest.TestCase):

    def setUp(self):
        basedir=os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI']=\
        'sqlite:///'+os.path.join(basedir,'test.db')
        self.app = app.test_client()
        db.create_all()
        u1 = User(id='00000000',username='bob12',email= 'bob@gmail.com')
        u2 = User(id='11111111',username='cassidy',email= "ca55@gmail.com")
        db.session.add(u1)
        db.session.add(u2)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        
    def test_password_hashing(self):
        s = User.query.get('00000000')
        s.set_password('hello')
        self.assertFalse(s.check_password('goodbye'))
        self.assertTrue(s.check_password('hello'))

if __name__=='__main__':
    unittest.main()




import os
os.environ['DATABASE_URL'] = 'sqlite://'  # use an in-memory database for tests

import unittest, os
from app import app, db
from app.models import User, Score


class TestWebApp(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['WTF_CSRF_ENABLED'] = False  # no CSRF during tests
        self.appctx = self.app.app_context()
        self.appctx.push()
        db.create_all()
        self.client = self.app.test_client()

    def tearDown(self):
        db.drop_all()
        self.appctx.pop()
        self.app = None
        self.appctx = None
        self.client = None

    def test_app(self):
        assert self.app is not None
        assert app == self.app

    def test_home_page_redirect(self):
        response = self.client.get('/', follow_redirects=True)
        assert response.status_code == 200
        assert response.request.path == '/login'


    def test_registration_form(self):
        response = self.client.get('/register')
        assert response.status_code == 200
        html = response.get_data(as_text=True)

        # make sure all the fields are included
        assert 'name="username"' in html
        assert 'name="email"' in html
        assert 'name="password"' in html
        assert 'name="password2"' in html
        assert 'name="submit"' in html


    def test_register_user(self):
        response = self.client.post('/register', data={
            'username': 'bob',
            'email': 'bob@example.com',
            'password': 'bam',
            'password2': 'bam',
        }, follow_redirects=True)
        assert response.status_code == 200
        assert response.request.path == '/login' # redirected to login


    def test_register_user_mismatched_passwords(self):
        response = self.client.post('/register', data={
            'username': 'bob',
            'email': 'bob@example.com',
            'password': 'bam',
            'password2': 'bar',
        })
        assert response.status_code == 200
        html = response.get_data(as_text=True)
        assert 'Field must be equal to password.' in html


