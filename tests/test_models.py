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
    
    # def test_is_committed(self):
    #     s = Score.query.get('00000000')
    #     self.assertFalse(s.is_committed())
    #     # usr=User.query.get("00000000")
    #     # sc = Score(user_id=usr.id,points=15)
    #     # db.session.add(sc)
    #     # db.session.flush()
    #     # s.user_id = sc.id
    #     # db.session.commit()
    #     # self.assertTrue(s.is_committed())




if __name__=='__main__':
    unittest.main()