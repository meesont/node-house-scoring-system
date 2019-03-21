var express = require("express"); //This defines the requirement for express
var app = express(); //This initilises the express app
var bodyParser = require("body-parser");
var port = process.env.PORT, ip = process.env.IP; //This defines the port and IP, this is only used for C9

//DATABASE STUFF

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/house_scoring_sys', {useNewUrlParser: true});

app.use(express.static('public')); //This sets the path for where express can find the CSS and JS files for the frontend
app.set('view engine', 'ejs'); //This sets the view engine for the project, saves me time when writing the res.render methods
app.use(bodyParser.urlencoded({extended: true}));



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

var events = [
{name: 'Football', date: '10/10/2018', maxPoints: 10},
{name: 'Rugby', date: '20/02/2019', maxPoints: 40},
{name: 'Cricket', date: '19/05/2018', maxPoints: 90},
{name: 'Example', date: '00/00/0000', maxPoints: 10},
{name: 'Example2', date: '01/01/0001', maxPoints: 11},
{name: 'Example3', date: '02/02/0002', maxPoints: 12}
];


app.get('/events', function(req, res) {

    var title = 'Events';
    res.render('events', {pageTitle: title, events: events});
});

app.post('/events', function(req, res) {
   
  var newEvent = {name: req.body.name, date: req.body.date, maxPoints: req.body.maxPoints};
  
   
  events.push(newEvent);
  
//   console.log('new event added to array: ' + newEvent.name + newEvent.date + newEvent.maxPoints); 
  res.redirect('/events');
   
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