/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   03-04-2019
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

const mongoose = require('mongoose')
    House = require('../models/house'),
    Event = require('../models/event');

function calculatePoints() {

    /*
    from each event
    pull position and score
    of each house
    then update house
    use for loop through houses

    find house position in each event
    get points gained from that position in each event
    */


    // Source: https://mongoosejs.com/docs/queries.html

    var wyldePoints = 0,
        ottleyPoints = 0,
        elgarPoints = 0,
        whiteladiesPoints = 0;


    Event.find({}, {'name': 0, 'date': 0, '_id': 0}, (err, events) => {
        if(err){
            console.log(err);
        } else {
            // console.log(events);
            House.find({}, {'totalPoints': 1, 'name': 1, '_id': 0}, (err, houses) => {

                // console.log(houses);

                houses.forEach(house => {

                    switch(house.name){
                        case 'Wylde':

                            // console.log(house.totalPoints);

                            events.forEach(event => {
                                // console.log(house.name + event);

                                if(event.first.house == house.name){

                                }

                            });

                            break;
                        case 'Whiteladies':
                            console.log(house.totalPoints);
                            break;
                        case 'Elgar':
                            console.log(house.totalPoints);
                            break;
                        case 'Ottley':
                            console.log(house.totalPoints);
                            break;
                    }

                });

                // console.log('first points ' + firstPoints);
                // console.log('second points ' + secondPoints);
                // console.log('third points ' + thirdPoints);
                // console.log('fourth points ' + fourthPoints);
            });
        }
    });
}

module.exports = calculatePoints;
