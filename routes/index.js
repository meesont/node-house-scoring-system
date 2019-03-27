const express = require('express'),
    router = express.router(),
    User = require('../models/user'),
    passport = require('passport');

    //Home route
router.get('/', function(req, res) {
    var title = 'Home';
    res.render('landing', {pageTitle: title}); //This tells express to render the home.ejs page, and we supply it with an object called title which is referenced within the ejs
    //file as pageTitle
});

router.get('/home', function(req, res) {
    res.redirect('/'); //This function just simply redirects the homepage, rather than repating the code to render the homepage
});


//EVENT PAGE MANAGEMENT

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
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('error', {pageTitle: 'Error'});
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/hidden');
        });
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// =================
// ERROR AND DEFAULT
// =================

app.get('/error', function(req, res) {
    res.render('error', {pageTitle: 'Error'});
});

app.get('/*', function(req, res){
    res.render('error', {pageTitle: 'Error'});
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
