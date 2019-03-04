var express = require("express"); //This defines the requirement for express
var app = express(); //This initilises the express app
var port = process.env.PORT, ip = process.env.IP; //This defines the port and IP, this is only used for C9

app.use(express.static('public')); //This sets the path for where express can find the CSS and JS files for the frontend
app.set('view engine', 'ejs'); //This sets the view engine for the project, saves me time when writing the res.render methods

/*
=====
ROUTES

Routes are the pathways that the website will be accessed through, for example when accessing this website the routes will be
/
/home
/events
/events/new
/leaderboards
/houses
/login
/login/register
/* - This is a default route which all extensions which are not of the above routes, for example if someone visited /abc it would display 
an error page
=====
*/

var events = [
{name: 'Football', date: '10/10/2018', maxPoints: 10},
{name: 'Rugby', date: '20/02/2019', maxPoints: 40}
];
//Home route
app.get('/', function(req, res) {
    var title = 'Home';
    res.render('home', {pageTitle: title}); //This tells express to render the home.ejs page, and we supply it with an object called title which is referenced within the ejs
    //file as pageTitle
});

app.get('/home', function(req, res) {
    res.redirect('/'); //This function just simply redirects the homepage, rather than repating the code to render the homepage
});




//EVENT PAGE MANAGEMENT
app.get('/events', function(req, res) {
    var title = 'Events';
    res.render('events', {pageTitle: title});
});

app.post('/events', function(req, res) {
   
   var newEvent = {name: req.body.name, date: req.body.date, maxPoints: req.body.maxPoints};
   
   events.push(newEvent);
   
   res.redirect('/events');
   
});

app.get('/events/new', function(req, res) {
    var title = 'New Event';
    res.render('newEvent', {pageTitle: title});
});




//FALLBACK ROUTE
app.get('/*', function(req, res){
    var title = 'Error';
    res.render('error', {pageTitle: title});
});

/*
=====
LISTENER
=====
*/

app.listen(port, ip, function(){
    console.log('Server Initalised');
    console.log(ip + ':' + port);
});