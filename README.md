# COLOUR MATCH - CITS3403 Agile Web Development Project

## Purpose 

The aim of colour match is to guess as many colour matches in 30 seconds. There will be two words shown and you must select the colour box that is similar to both of them. As you guess correctly, the number of boxes will increase and the position of the boxes will move. In some rounds, there will be multiple boxes of the same colour e.g. yellow - you must select the box that matches the shade of the word shown in order to be correct. 

You can compete with your friends for the high score and share your achievements!

## Getting Set Up

### Prerequisites

Requires python3, flask, venv, and sqlite

### Installing

Install python3, sqlite3

1. Set up a virtual environment with the following terminal commands:
 - python3 -m venv venv
 - source venv/bin/activate
 - Now, the virtual environment is running. 
2. Install the following packages using the pip install command: 
 - flask, flask-wtf, flask-sqlalchemy, flask-migrate, flask-login, email_validator, python-dotenv. 
3. Install sqlite using the commands appropriate for your operating system. Sqlite is preinstalled on Mac OS.  
4. Use the 'flask run' command to run the server, which is located at http://127.0.0.1:5000. 
5. To exit, use the control-c keyboard shortcut and 'deactivate' terminal command to the close the server and shut down the virtual environment. 

## Running the tests

To run unit tests
`python -m tests/test_models.py`

These are unit tests for the User class. There are also tests to check whether the templates load correctly, i.e. the server responds with the 200 code. The tests check whether the password hash is functioning as expected, whether all the attributes defined in the classes match the user inputted data and validation including checking the two passwords match. 

## Architecture 

For the client-side (front end) of the application HTML, CSS and JavaScript were used to allow communication between the user interface and browser. AJAX and jQuery were also used to retrieve data from the server asynchronously with ease. For the server-side (back end) Python and Flask were used, along with SQLite for the database.  Jinja was used as a template engine to dynamically add content to the webpage. All the components work together to allow successful interactions between the server and client side.

## Authors

**Lara Posel, Cleo Sabath and Christine Harcourt-Cooke**

## Acknowledgments
-  W3Schools Tutorials: https://www.w3schools.com/ 
- Miguel Grinberg's Flask Mega Tutorial: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world 
- Tom Smoker's GitHub Repositories: 'basic_flask_template' and 'workshop' 
- drtnf's GitHub Repository: 'cits3403-pair-up' 
- Study Tonight Navigation Bar Tutorial: https://www.studytonight.com/post/create-modern-navigation-bar-with-icons-using-html-css-and-hover-effect 
- KnifeCircus Colour Game - How to code JavaScript Games: https://www.youtube.com/watch?v=p3f5X2duLO4&ab_channel=KnifeCircus 

## Contributions 

Please refer to contributions.txt file for our commit logs and contributions towards this app
