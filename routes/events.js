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
    Event.findById(req.params.id, function(err, event) {
        if(err) {
            console.log(err);
            res.redirect('/error');
        } else {
            var name = event.name;
            res.render('events/show', {pageTitle: name, event: event});
        }
    });
});


router.get('/:id/edit', function(req, res) {
    Event.findById(req.params.id, function(err, event){
        if(err){
            console.log(err);
            res.redirect('/error');
        } else {
            // res.send(event.date);
            // "2019-03-13T00:00:00.000Z"
            var evtDate = new Date(event.date);
            res.render('events/edit', {pageTitle: 'Edit Event', event: event, eventDate: evtDate});
        }
    });
});

router.put('/:id', function(req, res){
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedEvent){
        if(err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.redirect('/events/' + req.params.id);
        }
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/error/notAuthenticated');
}


module.exports = router;
