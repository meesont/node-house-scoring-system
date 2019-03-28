# TODO

* Setup events post route **DONE**
* Create form for new events **DONE**
* Move events from an array across to a database **DONE**
    * MongoDB
* Fix styling for the events rendering **DONE**
* Setup authentication
    * Install passport **DONE**
    * Setup second step auth to prevent unwanted people creating accounts **DONE**
    * Possibly use invite only method providing link to random str of characters **CANCELED**
* Fix footer styling **DONE**
* Add algorithm to calculate scoreboard
    * This is not required, it can be done with 3 lines of programming
    * Discuss big O notation for this algorithm
    * Fairly simple alg, use basic sort alg w lowest time complexity
* Fix styling on the date input label in events.ejs **DONE**
* Routes
    * /home **DONE**
    * /events **DONE**
    * /houses **DONE**
    * /login **DONE**
    * /register **DONE**
    * Default route **DONE**
* Organise files into folder for easier viewing **IN PROGRESS**
* Move routes into separate files, then import into app.js **DONE**
* Fix naming to conform with RESTful routing **DONE**
* Move mongoose schema to separate models folder **DONE**
* Collection modelling
    * Events **DONE**
    * Houses **DONE**
    * Users **DONE**
* Redo events index
* Redo events form
* restyle events form
* style login/register forms **DONE**
* update houses to organise in position
    * nth-child?
    * organisation alg from website?

### RESTFUL ROUTES

name | url | verb | desc.
--- | --- | --- | ---
INDEX | /events | GET | Display a list of all events
NEW | /events/new | GET | Displays form to make new event *not used*
CREATE | /events | POST | Add new event to db
SHOW | /event/:id | GET | Shows info about specific event
INDEX | /houses | GET | Display a list of all houses
