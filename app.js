var express = require("express"), //This defines the requirement for express
app = express(), //This initilises the express app
bodyParser = require("body-parser"),
mongoose = require("mongoose");

app.use(express.static('public')); //This sets the path for where express can find the CSS and JS files for the frontend
app.set('view engine', 'ejs'); //This sets the view engine for the project, saves me time when writing the res.render methods
app.use(bodyParser.urlencoded({extended: true}));

//DATABASE STUFF

mongoose.connect('mongodb://localhost:27017/house_scoring_sys', {useNewUrlParser: true});

var eventsSchema = mongoose.Schema({
   name: String,
   maxPoints: Number,
   date: Date
});

var Event = mongoose.model('Event', eventsSchema);

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

    Event.find({}, function(err, events) {
       if(err){
           console.log('Error encountered');
           console.log(err);
       } else {
           res.render('events', {pageTitle: title, events: events});
       }
    });
    
});

app.post('/events', function(req, res) {

  
  Event.create({
      name: req.body.name,
      date: req.body.date,
      maxPoints: req.body.maxPoints
  }, function (err, newEvent) {
      if(err){
          console.log('Error encountered');
          console.log(err);
      } else {
          res.redirect('/events');
      }
  });
   
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

var port = process.env.PORT, ip = process.env.IP; //This defines the port and IP, this is only used for C9

app.listen(port, ip, function(){
    console.log('Server Initalised');
    console.log(ip + ':' + port);
});