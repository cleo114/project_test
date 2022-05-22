# COLOUR MATCH - CITS3403 Agile Web Development Project

## Things we need to add to README.MD
#### the purpose of the web application, explaining the design of the game 
#### the architecture of the web application.
#### describe how to launch the web application.
#### describe some unit tests for the web application, and how to run them.
#### Include commit logs, showing contributions and review from both contributing students

The aim of colour match is to guess as many colour matches in 30 seconds. There will be two words shown and you must select the colour box that is similar to both of them. As you guess correctly, the number of boxes will increase and the position of the boxes will move. In some rounds, there will be multiple boxes of the same colour e.g. yellow - you must select the box that matches the shade of the word shown in order to be correct. 

You can compete with your friends for the high score and share your achievements!

## Architecture


### Prerequisites

Requires python3, flask, venv, and sqlite

### Installing

Install python3, sqlite3

1. Set up a virtual environment with the following terminal commands:
 - python3 -m venv venv
 - source venv/bin/activate
   Now, the virtual environment is running. 
2. Install the following packages using the pip install command: 
 - flask, flask-wtf, flask-sqlalchemy, flask-migrate, flask-login, email_validator, python-dotenv. 
3. Install sqlite using the commands appropriate for your operating system. Sqlite is preinstalled on Mac OS.  
4. Use the 'flask run' to run the server, which is located at http://127.0.0.1:5000. 
5. To exit, use the control-c keyboard shortcut and 'deactivate' terminal command to the close the server and shut down the virtual environment. 

## Running the tests

To run unit tests
`python -m tests/test_models.py`

These are unit tests for the User class. There are also tests to check whether the templates load correctly, i.e. the server responds with the 200 code. The tests check whether the password hash is functioning as expected, whether all the attributes defined in the classes match the user inputted data and validation including checking the two passwords match. 

## Authors

**Lara Posel, Cleo Sabath and Christine Harcourt-Cooke** - *Initial work* - [drtnf](https://github.com/drtnf)( need to change to ours)

## Acknowledgments

W3Schools Tutorials: https://www.w3schools.com/
Miguel Grinberg's Flask Mega Tutorial: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world
Tom Smoker's GitHub Repositories: 'basic_flask_template' and 'workshop' 
drtnf's GitHub Repository: 'cits3403-pair-up'

