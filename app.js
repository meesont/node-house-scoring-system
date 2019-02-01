var express = require("express"); //This defines the requirement for express
var app = express(); //This initilises the express app.
var port = process.env.PORT, ip = process.env.IP; //This defines the port and IP, this is only used for C9

app.use(express.static('public')); //This sets the path for where express can find the CSS and JS files for the frontend
app.set('view engine', 'ejs'); //This sets the view engine for the project, saves me time when writing the res.render methods

/*
=====
ROUTES
=====
*/


//Default Route
app.get('/*', function(req, res){
    res.render('error');
});

/*
=====
LISTENER
=====
*/

app.listen(port, ip, function(){
    console.log('Server Initalised');
    console.log(ip + ':' + port);
})