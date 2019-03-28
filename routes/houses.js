const express = require('express'),
    router = express.Router(),
    House = require('../models/house'),
    Event = require('../models/event');

router.get('/', function(req, res){

    House.find({}, function(err, houses){
        if(err){
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('houses/index', {pageTitle: 'Houses', houses: houses});
        }
    })
    // res.render('leaderboards/index', {pageTitle: 'Leaderboards', houses: })
});

module.exports = router;
