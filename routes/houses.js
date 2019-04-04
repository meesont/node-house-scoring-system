/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   31-03-2019
 * @Last modified by:   thomas
 * @Last modified time: 04-04-2019
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

 // Similarly to the errors.js, houses.js contains the routes for the events pages and
 // forms that are associated with it

const express = require('express'),
    router = express.Router(),
    House = require('../models/house'),
    Event = require('../models/event');

// This route is another get request, this time it is to the route /houses and returns the index page for the houses
// It also implements a sorting algorithm as to order the houses correctly in the order which the house with the most points
// is at the top and the house with the least points is at the bottom.
router.get('/', function(req, res){

    // I defined the sort as a variable as to break down and make the code easier to understand
    // The sort I have used here is simply a descending sort which starts with the greatest value of totalPoints
    // and works down to the smallest value.
    var mySort = {totalPoints: -1};

    // A slightly different notation is used here to implement the sort, this is because the sort cannot be passed as a
    // variable to the find method, therefore the sort must be additional, the .exec() tells the Mongoose find method to execute
    // and allows us to pass a callback function to handle any errors that may be produced
    House.find().sort(mySort).exec(function(err, houses){
        if(err){
            console.log(err);
            res.redirect('/error');
        } else {
            // The houses object returned by this find method is sorted as such that the house with the greatest totalPoints
            // is rendered first and so on, therefore meaning that the houses route is presented in the order of which the leaderboards
            // are in
            res.render('houses/index', {pageTitle: 'Houses', houses: houses});
        }
    });
});

module.exports = router;

/*
get event ids from House
get event information for each event
*/
// router.get('/:id', function(req, res){
//
//     House.findById(req.params.id, function(err, house){
//         if(err){
//             console.log(err);
//             res.redirect('/error');
//         } else {
//             House.find({event: 1}, function(err, events){
//                 if(err) {
//                     console.log(err);
//                     res.redirect('/error');
//                 } else {
//                     res.render('houses/show', {pageTitle: house.name, house: house, events: events});
//                 }
//             });
//         }
//     });
// });
