/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   31-03-2019
 * @Last modified by:   thomas
 * @Last modified time: 04-04-2019
 * @License: Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 * @Copyright: Copyright(c) 2018 Thomas Meeson
 */


// Similarly to the errors.js, events.js contains the routes for the events pages and
// forms that are associated with it

// In this file, there is another route defined, this time importing one of the models that is
// defined for Mongoose to use, in this case the event model. It is imported using a path, and this path
// is ../models/event, the .. represents that the folder is contained 2 directories prior to the
// current working directory, then the path is /models/event, Node appends the .js onto the end of
// this path for us, preventing any confusion.

// Again within this file I am creating constants for express and the express router, these will occur
// in every single route file as they are required to handle and export the routes.
const express = require('express'),
    router = express.Router(),
    Event = require('../models/event');

// Again, as with the errors.js file, a predefined prefix for each of the routes has been set
// within the app.js. This prefix will be applied when anyone makes a request to any of the
// following routes

// This first route serves the index template for the events, it provides 2 objects to the
// route which are then used to render the template with the correct data
router.get('/', function(req, res) {

    // Below is a Mongoose find query that is used too find all events that are stored within the
    // Event is the model that is imported, and then find is a function that Mongoose attaches to that
    // model. There is then a callback function simply used to handle the error and the data that is
    // returned if the query is succesful
    Event.find({}, function(err, events) {
       if(err){ // A truthy if statement checkng to see if the err value is true (or been thrown in this case)
           console.log('Error encountered');
           console.log(err); // Logging the error to the console for debugging purposes
           res.redirect('/error'); // Redirect the user to the error page rather than just leave the request to
                                   // timeout
       } else {
           // If an error is not thrown, then redirect then render the template to the user and supply the data
           // returned from the database query
           res.render('events/index', {pageTitle: 'Events', events: events});
       }
    });

});

// In this project I am following RESTful routing principles, and that means that the POST, PUT and DELETE
// routes should go through the same route that the index does. This is the template that I have followed
// throughout the project.
// In this post route, a middleWare is also applied, and this middlware calls a function called 'isLoggedIn'
// which is defined at the bottom of this route file. When the middleware has sent a response, if the
// request is determined to be authenticated, then the callback function is called.
router.post('/', isLoggedIn, function(req, res) {

    //req.body.event used as entire form is done in event[value] style

    // POST routes are used for adding new data to the website, and a create method is used from Mongoose
    // on the event model to add a new event into the database.

    // req.body.event is the data provided from the form that is templated, the form is designed in a
    // key[value] design for the data that is submitted, allowing me to use the key (event in this case)
    // to submit the entire form into the create route.
    // The alternative of this would be to create a new object and add each individual field from the form
    // into this object, as follows:
        // var event = {name: req.body.name, date: req.body.date}
        // NOTE: I have only shown 2 of the fields here as an example

    Event.create(req.body.event, function (err, newEvent) {
        if(err){ // Again, a truthy if statement that checks to see if an error has been thrown
            console.log('Error encountered');
            console.log(err);
            res.redirect('/error'); // Same as previous route, redirect rather than let the request timeout
        } else {
            // Unlike the get route, there is no res.render required as a response as the user will be able
            // to see if the new addition was successful as it is rednered on the index route, therefore we simply
            // redirect the user to the index route
            res.redirect('/events');
        }
    });

});

// This route is a SHOW route, another route in RESTful routing.
// This route uses a paramater that is individual to each event, meaning that it is possible to use
// a Mongoose query to find the specific event via the parameter that is provided inside the route.
router.get('/:id', function(req, res) {

    // The Mongoose query used here is findById, and is used to find a document via the ID that is provided
    // when the document is created, ID's in MongoDB are 12 bytes and have timestamps built into the first 4
    // bytes, and then a 8 byte string of randomly generated characters. This means that each ID within the collection
    // is unique and therefore only linked to one individual document, using this to our advantage, we can create a page
    // that only shows information about a single document and the data stored within that document.

    // The callback function here returns a single event rather than an array of events like the basic Model.find function
    // does.

    // Source: https://stackoverflow.com/questions/5817795/how-are-mongodbs-objectids-generated
    // Source: https://stackoverflow.com/questions/4677237/possibility-of-duplicate-mongo-objectids-being-generated-in-two-different-colle
    Event.findById(req.params.id, (err, event) => {
        if(err) {
            console.log(err);
            res.redirect('/error');
        } else {
            var name = event.name;
            res.render('events/show', {pageTitle: name, event: event});
        }
    });
});


// RESTful routing requires an edit route that contains the ID of the entity to be edited as a
// paramater inside of the route. In this case the route will be /events/<ID given by mongoose>/edit
// The edit route is simply a get request that renders a form that is specific to the event that
// is provided inside the route parameter
router.get('/:id/edit', isLoggedIn, (req, res) => {

    // The => arrow function (AFs) is a JavaScript ES6 feature, and has advantages and disadvantages
    // to begin with, AFs are always anonymous, making it difficult to debug software and also means that
    // certain programming techniques such as recursion are not possible.

    // I chose to use arrow functions for each callback as callback functions do not require recursion,
    // should be simple and short, and only require 2 basic parameters

    // Source: https://medium.freecodecamp.org/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26

    // I am again using the findById Mongoose query, to find a specific event that is linked to an ID, howerver this time,
    // a different file is being rendered to the user, with different parameters
    Event.findById(req.params.id, (err, event) => {
        if(err){
            console.log(err);
            res.redirect('/error');
        } else {
            // "2019-03-13T00:00:00.000Z"

            // When trying to render the date in the template from the event object, I was encountering issues as
            // filling a form template was not possible as the date was being provided by the events object in a
            // string format, which could not be interpreted by the form correctly.
            // To counter this, I declare a variable called evtDate and then cast the string version of the date as
            // a new date object, which can then successfully be rendred into the template.
            var evtDate = new Date(event.date);
            res.render('events/edit', {pageTitle: 'Edit Event', event: event, eventDate: evtDate});
        }
    });
});

// This uses another RESTful route, this time a PUT route, which is similar to a POST route.
// It provides new data to the database and is provided this data by a form that is rendred from the GET request above
// This put route specifically changes the data for the document selected by the ID route parameter
router.put('/:id', isLoggedIn, (req, res) => {

    // This query uses the findByIdAndUpdate method provided by Mongoose. This method is used to find a
    // single document and then update the data contained within that document without wiping any data we
    // do not wish to update or remove.

    // req.params.id is the ID of the document that I am trying to lookup, req.body.event is the new
    // data that is to be pushed into the document. A callback function follows these, which has the parameters
    // err and updatedEvent

    Event.findByIdAndUpdate(req.params.id, req.body.event, (err, updatedEvent) => {
        if(err) { // error handling occurs here, an if statement checking if the value of error is truthy
            console.log(err);
            res.redirect('/error'); // redirect to the error route if an error occurs
        } else {
            // Nothing has to be done with the updatedEvent so therefore it simply redirects the user to the show
            // page for the event that they were editing.
            res.redirect('/events/' + req.params.id);
        }
    });
});

// This function is refered to as 'Middleware' throughout the documentation of this project
// this middleware uses a method added by passport-local that checks if a request is authenticated before
// allowing the request to take place, the next parameter automatically identifies the next step in the cycle, and
// is a function that is called when the request is authenticated.
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        // if the request is authenticated the middleware returns the next() method that is provided as a parameter
        return next();
    }
    // If the request is not authenticated, the user is redirected to a page saying that they are not authenticated.
    res.redirect('/error/notAuthenticated');
}


module.exports = router;
