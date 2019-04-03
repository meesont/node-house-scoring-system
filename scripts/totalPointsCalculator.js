/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   03-04-2019
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

const mongoose = require('mongoose')
    House = require('../models/house'),
    Event = require('../models/event');

function calculatePoints(houses) {

    /*
    from each event
    pull position and score
    of each house
    then update house
    use for loop through houses

    find house position in each event
    get points gained from that position in each event
    */

    // House.find({}, function(err, houses){
    //     if(err){
    //         console.log(err);
    //         return;
    //     } else {
    //         houses.forEach(function(house){
    //             if(Event.find({first.name: house}).contains, function(err, foundEvent){
    //
    //             });
    //         });
    //     }
    // });
    var totalPointsWylde = 0,
        totalPointsWhiteladies = 0,
        totalPointsElgar = 0,
        totalPointsOttley = 0;

    houses.forEach(function(house){
        Event.find({})
    });


}

module.exports = calculatePoints;
