const express = require('express'),
    router = express.Router(),
    House = require('../models/house'),
    Event = require('../models/event');

// const dotenv = require('dotenv').config();

router.get('/', function(req, res){

    var mySort = {totalPoints: -1};

    House.find().sort(mySort).exec(function(err, houses){
        if(err){
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('houses/index', {pageTitle: 'Houses', houses: houses});
        }
    });
});
/*
User.find({'links.url':req.params.query}, function(err, foundUsers){
   // ---
});
*/


/*
get event ids from House
get event information for each event
*/
router.get('/:id', function(req, res){

    House.findById(req.params.id, function(err, house){
        if(err){
            console.log(err);
            res.redirect('/error');
        } else {
            House.find({event: 1}, function(err, events){
                if(err) {
                    console.log(err);
                    res.redirect('/error');
                } else {
                    res.render('houses/show', {pageTitle: house.name, house: house, events: events});
                }
            });
        }
    });
});

module.exports = router;
