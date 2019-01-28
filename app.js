var express = require("express");
var app = express();
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