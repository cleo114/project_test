# project_test

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

## Getting Started

Activate the python virtual environment:
`$source virtual-environment/bin/activate`

To run the app:
`$flask run`

To stop the app:
`$^C`

To exit the environment:
`$deactivate`

### Prerequisites

Requires python3, flask, venv, and sqlite

### Installing

Install python3, sqlite3

1. Set up a virtual environment:
 - use pip or another package manager to install virtualenv package `pip install virtualenv`
 - start the provided virtual environment
   `source virtual-environment/bin/activate`
 - This should include flask and all the required packages
2. Install sqlite
 - [Windows instructions](http://www.sqlitetutorial.net/download-install-sqlite/)
 - In \*nix, `sudo apt-get install sqlite`
3. Build the database: `flask db init`
4. `flask run`

This should start the app running on localhost at port 5000, i.e. [http://localhost:5000/index](http://localhost:5000/index)

## Running the tests

To run unit tests
`python -m tests.unittest`

To run selenium tests, make sure that you have the 
appropriate web driver installed. In this case it should be geckodriver for Firefox, 
and it assumes that it is installed in the test directory.
Then start the webserver in TestingConfig, and run
`python -m tests.systemtest`

## Deployment

via localhost

## Built With

vim and git

## Contributing

## Versioning

## Authors

**Lara Posel, Cleo Sabath and Christine Harcourt-Cooke** - *Initial work* - [drtnf](https://github.com/drtnf)( need to change to ours)

## Acknowledgments
