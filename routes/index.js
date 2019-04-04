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

// This file is the index routes file, it is used foe all other routes that cannot be specified as either
// houses or events, for example, all the login and creation routes are contained within this route.

// Similarly to the other route files, this file contains imports for modules that are requried, it contains similar
// modules except for the addition of passport and the User model
const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport');

// the loginToken is a constant that is defined in order to setup a new account, without this code, anybody would be
// able to create an account on this website, therefore allowing anyone to cause grief via submitting many events ect.
// This logintoken is simply a string of random chracters and integers that could not be easily guessed.
const loginToken = '9NQBmSuw6qK8zpxJII60dqJIDLACQ0yJwmQhWvpdjCZ26sLvqi';



// This route is the base route for all paths, when a user loads simply the website with no route specified
// this route is used and the landing page is rendered
router.get('/', function(req, res) {
    var title = 'Home';
    res.render('landing', {pageTitle: title}); //This tells express to render the landing.ejs page, and we supply it with an object
                                               //called title which is referenced within the ejs file as pageTitle
});

//This route just simply redirects the homepage, rather than repating the code to render the homepage, saving time
router.get('/home', function(req, res) {
    res.redirect('/');
});


// ========================
// HIDDEN ROUTE
// ========================

// This is a hidden route, I added this simply as to test the isLoggedIn middleware functionality and to ensure that it
// was working correctly, this route can still be reached by someone whom is logged in but simply provides a template containing
// information that is useful for debugging

router.get('/hidden', isLoggedIn, function(req, res){
    res.render('hidden', {pageTitle: 'Hidden Page'});
});

// ========================
// LOGIN/REGISTER/LOGOUT ROUTES
// ========================


// The login route is not secured in any way and does not require authentication, it simply renders a form that contains
// a username and password box, and allows the user to submit this information to login

router.get('/login', function(req, res) {
    res.render('login', {pageTitle: 'Login'});
});



// This POST route is slightly different to other post routes as it uses middleware defined by the passport to check that the
// authentication is successful, rather than if the user is authenticated already. The method is passport.authenticate and it
// takes an authentication strategy as a parameter, in this case 'local', and then an object with a successRedirect and failureRedirect
// as variables within that. These are the 2 routes that will be directed too if the user either successfully or unsuccessfully logs in
// The callback function here is nor really required as the request and response are handled entirely by the passport middleware

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/events',
        failureRedirect: '/error/incorrectDetails'
    }), function(req, res){

});


// This is another GET route, this time rendering the registration page.

router.get('/register', function(req, res) {
   res.render('register', {pageTitle: 'Register'});
});


// The register POST route is the most complex route of the entire project, it is a route that contains the checking
// to see if a potential user is allowed to create an account or not, and then creates a new user with a password and
// username that are hashed and stored in a predefined MongoDB schema called User.


router.post('/register', function(req, res){
    // The if statement below is used to check that the loginToken provided by the user on the registration page is
    // the loginToken defined within this file, ensuring the user has actually been given the token rather than just
    // attempting to guess the token
    if(req.body.loginToken === loginToken){

        // The User.register is a passport-local-mongoose function that creates a new document within the collection User, with the
        // username and password defined by the user within the registration form, but rather than storing the password
        // in a cleartext format, passport-local-mongoose automatically hashes the password and adds a salt onto the end to ensure
        // that it is encrypted and secure.

        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            // Simple error handling also occurs here, however we redirect to the default error route as several different
            // error types can be thrown from this process
            if(err){
                // log the error for debugging and fixing issues
                console.log(err);

                // return is used here as to escape the function and stopping a request that would otherwise just wait to
                // timeout

                return res.render('errors/error', {pageTitle: 'Error'});
            }
            // We can ignore using an else statment as we used a return statement to escape the if statment above.
            // Next is to authenticate the user, as we assume if they are creating an account they wish to login to the system too

            passport.authenticate('local')(req, res, () => {

                // originally I redirected to /hidden as to check that the route was working correctly however this has now been updated to
                // redirect to the /events route as that is where the user authentication is required to view additional options.

                // res.redirect('/hidden');
                res.redirect('/events');
            });
        });
    } else {

        // if the user does not provide the correct token, redirect them to the incorrectToken error route
        return res.redirect('/error/incorrectToken');
    }

});

// This is a get route to /logout, it is the only get route that does not render a page, rather simply ends the user session by using
// the req.logout() function provided by express-session
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// =================
// TEST AND DEFAULT
// =================


// This is a default route, the * stands for any route possible except the ones that are defined before this one, this means that
// when we are importing the routes we must also import the index routes last as otherwise the other routes will be overwritten by
// this final default route.

router.get('/*', function(req, res){
    res.render('errors/error', {pageTitle: 'Error'});
});

// Again we define the isLoggedIn middleware, this is used for the hidden route in this file and was simply used for testing
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
