/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   31-03-2019
 * @Last modified by:   Tom
 * @Last modified time: 03-04-2019
 * @License: Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 * @Copyright: Copyright(c) 2018 Thomas Meeson
 */


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
