// ========================
// SETUP
// ========================


const express = require("express"), //This defines the requirement for express
    app = express(), //This initilises the express app
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Event = require("./models/event"),
    House = require("./models/house"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    seedDB = require("./seeds");


app.use(express.static(__dirname + '/public')); //This sets the path for where express can find the CSS and JS files for the frontend
app.set('view engine', 'ejs'); //This sets the view engine for the project, saves me time when writing the res.render methods
app.use(bodyParser.urlencoded({extended: true}));

//DATABASE STUFF

mongoose.connect('mongodb://localhost:27017/house_scoring_sys', {useNewUrlParser: true});

// seedDB();

//AUTHENTICATION STUFF

app.use(require("express-session")({
    secret: 'this is a completely random string that is used by passport!',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.use(new LocalStrategy(User.authenticate()));


// ========================
// ROUTES
// ========================


//Home route
app.get('/', function(req, res) {
    var title = 'Home';
    res.render('landing', {pageTitle: title}); //This tells express to render the home.ejs page, and we supply it with an object called title which is referenced within the ejs
    //file as pageTitle
});

app.get('/home', function(req, res) {
    res.redirect('/'); //This function just simply redirects the homepage, rather than repating the code to render the homepage
});


//EVENT PAGE MANAGEMENT

app.get('/events', function(req, res) {

    var title = 'Events';

    Event.find({}, function(err, events) {
       if(err){
           console.log('Error encountered');
           console.log(err);
           res.redirect('/error');
       } else {
           res.render('events/index', {pageTitle: title, events: events});
       }
    });
    
});

app.post('/events', function(req, res) {

    //req.body.event used as entire form is done in event[value] style

    Event.create(req.body.event, function (err, newEvent) {
        if(err){
            console.log('Error encountered');
            console.log(err);
            res.redirect('/error');
        } else {
            res.redirect('/events');
        }
    });
   
});

app.get('/events/:id', function(req, res) {
    
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

// ========================
// LOGIN/REGISTER ROUTE
// ========================

app.get('/login', function(req, res) {
    res.render('login', {pageTitle: 'Login'});
});

app.get('/register', function(req, res) {
   res.render('register', {pageTitle: 'Register'});
});


// ========================
//FALLBACK ROUTE / ERROR ROUTE
// ========================

app.get('/error', function(req, res) {
    res.render('error', {pageTitle: 'Error'});
});

app.get('/*', function(req, res){
    var title = 'Error';
    res.render('error', {pageTitle: title});
});



// ========================
// ========================
// MIDDLEWARE
// ========================

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


// ========================
// LISTENER
// ========================


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server Initalised');
    console.log(process.env.IP + ':' + process.env.PORT);
});