/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   03-04-2019
 * @Last modified by:   thomas
 * @Last modified time: 05-04-2019
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


// This is a script written to calculate the total points for each house by pulling from each

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

                            events.forEach(event => {
                                // console.log(house.name + event);

                                if(event.first.house == house.name){
                                    wyldePoints += event.first.points;
                                } else if (event.second.house == house.name) {
                                    wyldePoints += event.second.points;
                                } else if (event.third.house == house.name) {
                                    wyldePoints += event.third.points;
                                } else if (event.fourth.points == house.name) {
                                    wyldePoints += event.fourth.points;
                                }

                            });

                            break;
                        case 'Whiteladies':
                            // console.log(house.totalPoints);

                            events.forEach(event => {
                                // console.log(house.name + event);
                                if(event.first.house == house.name){
                                    whiteladiesPoints += event.first.points;
                                } else if (event.second.house == house.name) {
                                    whiteladiesPoints += event.second.points;
                                } else if (event.third.house == house.name) {
                                    whiteladiesPoints += event.third.points;
                                } else if (event.fourth.points == house.name) {
                                    whiteladiesPoints += event.fourth.points;
                                }

                            });

                            break;
                        case 'Elgar':
                            // console.log(house.totalPoints);

                            events.forEach(event => {
                                // console.log(house.name + event);
                                if(event.first.house == house.name){
                                    elgarPoints += event.first.points;
                                } else if (event.second.house == house.name) {
                                    elgarPoints += event.second.points;
                                } else if (event.third.house == house.name) {
                                    elgarPoints += event.third.points;
                                } else if (event.fourth.points == house.name) {
                                    elgarPoints += event.fourth.points;
                                }

                            });

                            break;
                        case 'Ottley':
                            // console.log(house.totalPoints);

                            events.forEach(event => {
                                // console.log(house.name + event);
                                if(event.first.house == house.name){
                                    ottleyPoints += event.first.points;
                                } else if (event.second.house == house.name) {
                                    ottleyPoints += event.second.points;
                                } else if (event.third.house == house.name) {
                                    ottleyPoints += event.third.points;
                                } else if (event.fourth.points == house.name) {
                                    ottleyPoints += event.fourth.points;
                                }

                            });

                            console.log(house.totalPoints);
                            // house.totalPoints = ottleyPoints;
                            // console.log(house.totalPoints);

                            House.updateOne({name: 'Ottley'}, {$set: {totalPoints: ottleyPoints}}, function(err, res) {
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log(res);
                                }
                            });

                            // https://stackoverflow.com/questions/47656515/updateone-on-mongodb-not-working-in-node-js

                            break;
                    }

                });

                console.log('wylde points ' + wyldePoints);
                console.log('whiteladies points ' + whiteladiesPoints);
                console.log('elgar points ' + elgarPoints);
                console.log('ottley points ' + ottleyPoints);
            });
        }
    });
}

module.exports = calculatePoints;
