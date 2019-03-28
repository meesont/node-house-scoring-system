const express = require('express'),
    router = express.Router(),
    House = require('../models/house'),
    Event = require('../models/event');

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

router.get('/:id', function(req, res){

    House.findById(req.params.id, function(err, house){
        if(err){
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('houses/show', {pageTitle: house.name, house: house});
        }
    });
});

module.exports = router;
