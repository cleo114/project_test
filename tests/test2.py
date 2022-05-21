import unittest, os
from app import app, db
 



    
 
class BasicTests(unittest.TestCase):
 
############################
#### setup and teardown ####
############################
       


    # executed prior to each test
    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        app.config['DEBUG'] = False
        basedir=os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI']=\
        'sqlite:///'+os.path.join(basedir,'test.db')
        self.app = app.test_client()
        db.drop_all()
        db.create_all()
    
    # # Disable sending emails during unit testing
    # mail.init_app(app)
    # self.assertEqual(app.debug, False)
    
    # executed after each test
    def tearDown(self):
        pass
    
    ###############
    #### tests ####
    ###############
    
    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)






        ########################
#### helper methods ####
########################
 
    def register(self, username, email, password, password2):
        return self.app.post(
        '/register',
        data=dict(username=username, email=email, password=password, password2=password2),
        follow_redirects=True
        )
    
    def login(self, email, password):
        return self.app.post(
        '/login',
        data=dict(email=email, password=password),
        follow_redirects=True
        )
    
    def logout(self):
        return self.app.get(
        '/logout',
        follow_redirects=True
        )


    def test_valid_user_registration(self):
        response = self.register('pat', 'patkennedy79@gmail.com', 'FlaskIsAwesome', 'FlaskIsAwesome')
        self.assertEqual(response.status_code, 200)


    def test_duplicate_email(self):
        response = self.register('pat', 'patkennedy79@gmail.com', 'FlaskIsAwesome', 'FlaskIsAwesome')
        self.assertEqual(response.status_code, 200)
        response = self.register('bob', 'patkennedy79@gmail.com', 'FlaskIsReallyAwesome', 'FlaskIsReallyAwesome')
        self.assertIn(b'Please use a different email address.', response.data)

    def test_duplicate_username(self):
        response = self.register('pat', 'patkennedy78@gmail.com', 'FlaskIsAwesome', 'FlaskIsAwesome')
        self.assertEqual(response.status_code, 200)
        response = self.register('pat', 'patkennedy79@gmail.com', 'FlaskIsReallyAwesome', 'FlaskIsReallyAwesome')
        self.assertIn(b'Please use a different username.', response.data)

    
    
    if __name__ == "__main__":
        unittest.main()







