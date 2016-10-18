# PeopleSearch

**Important** Takes a second at first start-up to seed DB.


This application is built using asp.net MVC with angularjs.

Data is seeded into the database from a json file.

Data received and sent to the DB is in JSON.

DB is dropped and recreated everytime the app is run. Change initializer to "DropCreateDatabaseIfModelChanges"
to have persistant data. 

Features:
Seach
Slow search
Filter by First name, Last name, or age
Create a new user.
