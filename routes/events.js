const express = require('express'),
    router = express.Router(),
    Event = require('../models/event');


router.get('/', function(req, res) {

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

router.post('/', isLoggedIn, function(req, res) {

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

// SHOW ROUTE
router.get('/:id', function(req, res) {

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


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;
