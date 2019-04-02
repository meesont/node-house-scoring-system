/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   31-03-2019
 * @Last modified by:   Tom
 * @Last modified time: 02-04-2019
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

const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport');

const loginToken = '9NQBmSuw6qK8zpxJII60dqJIDLACQ0yJwmQhWvpdjCZ26sLvqi';

// home route
router.get('/', function(req, res) {
    var title = 'Home';
    res.render('landing', {pageTitle: title}); //This tells express to render the home.ejs page, and we supply it with an object called title which is referenced within the ejs
    //file as pageTitle
});

router.get('/home', function(req, res) {
    res.redirect('/'); //This function just simply redirects the homepage, rather than repating the code to render the homepage
});


// ========================
// HIDDEN ROUTE
// ========================

router.get('/hidden', isLoggedIn, function(req, res){
    res.render('hidden', {pageTitle: 'Hidden Page'});
});

// ========================
// LOGIN/REGISTER/LOGOUT ROUTES
// ========================

router.get('/login', function(req, res) {
    res.render('login', {pageTitle: 'Login'});
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/events',
        failureRedirect: '/error/incorrectDetails'
    }), function(req, res){

});

router.get('/register', function(req, res) {
   res.render('register', {pageTitle: 'Register'});
});


// uses loginToken to check if if user is valid and allowed to create an account
router.post('/register', function(req, res){
    if(req.body.loginToken === loginToken){
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('errors/error', {pageTitle: 'Error'});
            }
            passport.authenticate('local')(req, res, function(){
                // res.redirect('/hidden');
                res.redirect('/events');
            });
        });
    } else {
        return res.redirect('/error/incorrectToken');
    }

});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// =================
// TEST AND DEFAULT
// =================

router.get('/test', function(req, res){
    res.render('test', {pageTitle: 'Test Route'});
});

router.get('/*', function(req, res){
    res.render('errors/error', {pageTitle: 'Error'});
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

// module.exports.loginToken = loginToken;
module.exports = router;
