/**
 * @Author: Thomas Meeson <thomas>
 * @Date:   31-03-2019
 * @Last modified by:   thomas
 * @Last modified time: 05-04-2019
 * @License: Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 * @Copyright: Copyright 2018 Thomas Meeson
 */


// These first 2 lines define 2 constants that are required to work with routes externally
// from the main node file. I am here requiring express.
// Express is a backend framework used to simplify the use of Node.js
// it is used to apply the MVC (Model, View, Controller) architecture on the server side (only model and controller)
// to create the entire MVC architecture it is combined with a templating language
// in my case I am using the EJS templating language, this handles the View from MVC
// This is then combined with (usually) a database, in this case I have chosen the
// NoSQL database MongoDB combined with Mongoose to create the Model aspect of MVC

// The router contstant is a 'Mini-application' used for only routing and middleware
// the router allows me to define routes outside the main node file, and then again using the
// module.exports function, I can export the router to the main node file to use the routes
// within the program successfully whilst reducing the size of the main file

// The general purpose of moving the routes outside of the main file is to 'declutter'
// the main node file, allowing for better documentation and bug fixing when errors occur

// Source: https://expressjs.com/en/api.html#router
// Source: https://expressjs.com/
// Source: https://stackoverflow.com/questions/12616153/what-is-express-js/12616205#12616205
const express = require('express'),
    router = express.Router();


// Each of the routes follows the RESTful routing principles.
// In this case the router is using a GET request to https://localhost:8081/error/incorrectToken
// When this get request is recieved a callback function is called, each of These
// callback functions require 2 parameters, request and response (req and res).
// The res is what is sent in response to the request, and the req is used to handle
// any middleware that is required and to check (if needed) that the request is authenticated

// In the case of the the error routes, it is unnecessary to check if the req is
// authenticated because the routes are not secure

// These routes all have the prefix /error/<route>. This is not shown here because
// the prefix is defined within the main node file when importing the exported router
// module
router.get('/incorrectToken', function(req, res) {
    // the res.render method sends an EJS template as a response to the request
    // This EJS template is then rendered and any values are provided within the trailing
    // parameter and are provided as an object.
    // This template only requires that a pageTitle is provided to the template
    res.render('errors/incorrectToken', {pageTitle: 'Incorrect Token'});
});

router.get('/incorrectDetails', function(req, res) {
    res.render('errors/incorrectDetails', {pageTitle: 'Incorrect Details'});
});

// router.get('/notAuthenticated', function(req, res) {
//     res.render('errors/notAuthenticated', {pageTitle: 'Not Authenticated'});
// });

router.get('/', function(req, res) {
    res.render('errors/error', {pageTitle: 'Error'});
});

// module.exports is again used to export this file as a module to be imported within other files
module.exports = router;
