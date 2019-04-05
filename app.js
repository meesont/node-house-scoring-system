/**
 * @Author: Thomas Meeson <Tom>
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
 * @Copyright: Copyright(c) 2018 Thomas Meeson
 */

// The app.js file is the central file to the app. It brings together all of the routes,
// models, modules and scripts that have been defined within the project structure and
// serves those over a specific IP and PORT (more about this on the listener notes).
// The first lines import all of the routes, modules and models for use in this file,
// they are all defined as constants, all the scripts are also imported at this point.
// The express app is also initialised here, allowing us to access the functions within it
// with relative ease.


// ========================
// SETUP
// ========================

const express = require("express"), //This defines the requirement for express
    app = express(), //This initilises the express app
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    methodOverride = require('method-override'),
    Event = require("./models/event"),
    House = require("./models/house"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    seedDB = require("./scripts/seeds"),
    pointsCalculator = require('./scripts/totalPointsCalculator');


const eventRoutes = require('./routes/events'),
    indexRoutes = require('./routes/index'),
    houseRoutes = require('./routes/houses'),
    errorRoutes = require('./routes/errors');

// Some initial setup is required, here we are setting the path for the frontent CSS and JS;
// the view engine (templating language) that is being used; setting up body-parser to prevent
// encountering issues when it is used within routes and setting up the method-override module with
// the prefix that I wish to use when overriding a request, the prefix is '_' in this case.

app.use(express.static(__dirname + '/public')); //This sets the path for where express can find the CSS and JS files for the frontend
app.set('view engine', 'ejs'); //This sets the view engine for the project, saves time when writing the res.render methods
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//DATABASE STUFF

// The database is connected here, using a Mongoose function, we connect to the database at address
// localhost:27017. 2 parameters are also defined within an object here, they are added to prevent
// deprecation warnings on startup as there is no alternative at this current point in time.

mongoose.connect('mongodb://localhost:27017/house_scoring_sys', {useNewUrlParser: true , useFindAndModify: false});


// The seedDB function is here, however it is commented out as it has been ran on the current database I am using and
// it is unneeded currently.

/*
seedDB();
*/


//AUTHENTICATION STUFF

// Here we are reqiring express-session, a module that helps with managing web session cookies, this is useful
// as without it every session has to be stored as a JSON object within the app file structure individually
// this is not only inefficient, but also time consuming to implement.
// Express-session handles and manages session cookies by generating unique session ID's for each session;
// storing the session ID's in a session cookie and creating empty session objects.
// secret is a random string that is used to create the hashes for the passwords and the session.
// resave is to be enabled on systems which do not support the touch command (non unix based systems such as Windows).
// saveUninitialized is the option to permanently save the session cookies to a database rather than deleting them when the session
// is ended.

// Source: https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session

app.use(require("express-session")({
    secret: 'this is a completely random string that is used by express-session and passport!',
    resave: false,
    saveUninitialized: false
}));


// Passport is setup here
// passport.initialize is middleware provided by passport to initialise itself.
// passport.session is a middleware that is equivilent to passport.use(passort.authenticate('session')).
// session is an inbuilt strategy for passport, and is used by every other strategy, for it to work correctly
// the next 2 lines are required, where serializeUser and deserializeUser are used.
// serializeUser is used to determine what data of the user object should be stored in the session, because the
// User model I wrote simply contains just the password and username, we can just serialize and deserialize the
// entire user object without worrying about any unneeded data being stored in the session.

// Source: https://hackernoon.com/passportjs-the-confusing-parts-explained-edca874ebead
// Source: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// This use line tells passport to use the LocalStrategy, which is the name of the passport-local import.
passport.use(new LocalStrategy(User.authenticate()));

// This allows access to req.user when we are handling a request in one of the routes files. This must be defined above
// where the routes are used.
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// ========================
// TESTING
// ========================

// This simply calls the pointsCalculator() function when the server begins, updating and refreshing the
// house scores
pointsCalculator();


// ========================
// ROUTES IMPORT
// ========================

// Here is where the route imports are used, they are setup with prefixes for specific routes,
// the eventRoutes always have the prefix /events, therefore we can add '/events' as a parameter
// to the app.use function, specifying that the route will always prefix with what is set.

app.use('/events', eventRoutes);
app.use('/houses', houseRoutes);
app.use('/error', errorRoutes);
app.use(indexRoutes);

// ========================
// LISTENER
// ========================

// The listener function binds and listens for connections on a set port and ip address
// when you run app.js using node, the server will start and serve over the specific port

// I have used a constant to set the port that I want the server to be served over.
const port = 8080;

app.listen(port, () => {
    // The callback function is not required here, however it is useful to see a message on server startup
    // to be confident that the server successfully started.
    console.log('House Scoring Sys v0.1-BETA');
    console.log('localhost:' + port);
});
