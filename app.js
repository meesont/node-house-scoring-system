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

const eventRoutes = require('./routes/events'),
    indexRoutes = require('./routes/index');

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


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// ========================
// ROUTES IMPORT
// ========================

app.use('/events', eventRoutes);
app.use(indexRoutes);

// ========================
// LISTENER
// ========================

const port = 8080

app.listen(port, function(){
    console.log('Server Initalised');
    console.log('localhost:' + port);
});
