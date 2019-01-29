var express = require("express"); //This defines the requirement for express
var app = express(); //This initilises the express app.
var port = process.env.PORT, ip = process.env.IP;

/*
=====
ROUTES
=====
*/


//Default Route
app.get('/*', function(req, res){
    res.render('error.ejs');
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