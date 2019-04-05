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


// This is a script written to calculate the total points for each house by pulling all the house and event
// documents and getting the scores from each, then looping through each house and for each house looping through
// each event; then adding all the scores that have been given together. An important factor to this is that it repeats
// itself every 5 minutes

const mongoose = require('mongoose')
    House = require('../models/house'),
    Event = require('../models/event');

function calculatePoints() {

    // This function here sets the interval for how often the function should run, and which function
    // should run every time. In this case the interval is set to 300000, which is in miliseconds and is 5 minutes,
    // it calls the calcScores function which is an anonymous function.
    setInterval(function () {
        calcScores();
    }, 300000);


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

    var calcScores = function(){

        // Variables are created for each house's total scores, these are 4 number variables that are all assigned
        // the value 0 every time this function runs
        var wyldePoints = 0,
            ottleyPoints = 0,
            elgarPoints = 0,
            whiteladiesPoints = 0;


        // The first Mongoose query that is made, selects every document inside the events collection, and selects only
        // the first, second, third and fourth data, this is decided by the second object within the query, which states
        // {'name': 0, 'date': 0, '_id': 0}
        // The data followed by the number 0 tells Mongoose to not return these data objects, as they are not required, but to
        // return everything else into an array called events.

        Event.find({}, {'name': 0, 'date': 0, '_id': 0}, (err, events) => {

            // Basic error handling is needed, if the collection could not be found for a certain reason, the error will be logged

            if(err){
                console.log(err);
            } else {

                // Embedded within the event query, there is another query but this time querying the houses collection and returning
                // the values of the data, totalPoints and name, and has also specifically been designed to not return the _id of
                // the documents.

                House.find({}, {'totalPoints': 1, 'name': 1, '_id': 0}, (err, houses) => {


                    // A forEach loop is used here to cycle through each house, and then within each house a switch control flow
                    // statement is used to match the specific house name to one of the 4 options.

                    houses.forEach(house => {

                        // Here we are defining the switch with the expression I wish to use, the case here is that we are switching
                        // on the house.name expression

                        switch(house.name){

                            // Each case checks for a match to a specific string, these strings represent each house's name, and
                            // check to match the current value of house.name to the value given in the case statement, similarly
                            // to a if else statement.

                            case 'Wylde':

                                // If the house.name matches the string 'Wylde', cycle through every event
                                events.forEach(event => {

                                    // Here we could use another switch control flow statement, however using an if else makes
                                    // it simpler to read as there are only small sections of code going within each if statement.

                                    // If the house that won first place and is stored in the first object is equal to the value of
                                    // house.name, add the points stored within the first object to the houses total points
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

                                // After the totalScore has been calculated by iterating through every event, update the entry
                                // within the House collection to match the new totalScore.
                                // The first object we supply to this update query is the search term, we are querying the collection
                                // for where house.name is 'Wylde'. When it is found, the second object is called, this object sets
                                // the specified data contained within the $set to the new value which is provided as a value to the key.
                                // In this case, the key is totalPoints and the value is wyldePoints.

                                // A callback function is required as to handle any errors, and also to get the response from the update
                                // query, this response is simply logged for debugging purposes.

                                // Source: https://docs.mongodb.com/manual/reference/operator/update/set/

                                House.updateOne({name: 'Wylde'}, {$set: {totalPoints: wyldePoints}}, (err, res) => {
                                    // Basic error handling, this logs the error then skips the to the break;
                                    if(err){
                                        console.log(err);
                                    } else {
                                        console.log(res);
                                    }
                                });

                                // The break statement breaks out of the switch, and returns to the main program
                                break;

                            case 'Whiteladies':

                                // All cases are the same except the house name is changed to the one respective to the case that is selected
                                // in this case, the variable we are updating is now whiteladiesPoints as we are in the whiteladies case.

                                events.forEach(event => {

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

                                House.updateOne({name: 'Whiteladies'}, {$set: {totalPoints: whiteladiesPoints}}, (err, res) => {
                                    if(err){
                                        console.log(err);
                                    } else {
                                        console.log(res);
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

                                House.updateOne({name: 'Elgar'}, {$set: {totalPoints: elgarPoints}}, (err, res) => {
                                    if(err){
                                        console.log(err);
                                    } else {
                                        console.log(res);
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

                                House.updateOne({name: 'Ottley'}, {$set: {totalPoints: ottleyPoints}}, (err, res) => {
                                    if(err){
                                        console.log(err);
                                    } else {
                                        console.log(res);
                                    }
                                });

                                // https://stackoverflow.com/questions/47656515/updateone-on-mongodb-not-working-in-node-js

                                break;


                            // A default case is required to catch when the switch does not match any of the set cases, this should
                            // not occur within this program, however this is here to catch any unexpected errors and for maintaining
                            // stability
                            default:
                                console.log('default case reached');
                                break;
                        }

                    });

                    console.log('house scores updated');

                });
            }
        });
    }


}

module.exports = calculatePoints;
