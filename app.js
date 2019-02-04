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
//Home route
app.get('/', function(req, res) {
    var title = 'Home';
    res.render('home', {pageTitle: title});
});

app.get('/home', function(req, res) {
    res.redirect('/'); //This function just simply redirects the homepage, rather than repating the code to render the 
});


//Default Route
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