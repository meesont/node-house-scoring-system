const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport');

const loginToken = (process.env.LOGINTOKEN || 'loginToken');

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
        successRedirect: '/hidden',
        failureRedirect: '/login'
    }), function(req, res){

});

router.get('/register', function(req, res) {
   res.render('register', {pageTitle: 'Register'});
});

router.post('/register', function(req, res){
    if(req.body.loginToken === loginToken){
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('errors/error', {pageTitle: 'Error'});
            }
            passport.authenticate('local')(req, res, function(){
                res.redirect('/hidden');
            });
        });
    } else {
        return res.redirect('/register/incorrectToken');
    }

});

router.get('/register/incorrectToken', function(req, res) {
    res.render('errors/incorrectToken', {pageTitle: 'Incorrect Token'});
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// =================
// ERROR AND DEFAULT
// =================

router.get('/error', function(req, res) {
    res.render('errors/error', {pageTitle: 'Error'});
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

module.exports.loginToken = loginToken;
module.exports = router;
