/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   31-03-2019
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

// The first 4 lines of this file define constants that are imports required to work with
// Mongoose and the models. In this case I am trying to seed the database, which involves
// completely clearing the collections and enterting fresh data.

// Database seeding is a process that is not done within production versions of projects
// and should only be used when the project is in development and upon initial release
// or rerelease.

const mongoose = require("mongoose"),
    Event = require("./models/event"),
    House = require("./models/house"),
    User = require('./models/user');

// This is an array of objects that all follow the model for a House defined in the house
// model file, these are the seeding data that will be saved to the database upon seeding
// In the case of this web app, the houses are hard coded and cannot be edited by anyone whom
// doesn't have access to the Mongo console. I chose to do this because it is rare that major
// changes occur within the house structure and those major changes occur at the start of
// every academic year, when the database would be seeded anyway.

var dataHouse = [
    {
        name: 'Wylde',
        houseMaster: 'Dr Davison',
        email: 'ald@rgsw.org.uk',
        totalPoints: 20,
        colour: 'LightSkyBlue'
    },
    {
        name: 'Whiteladies',
        houseMaster: 'Miss Binner',
        email: 'erb@rgsw.org.uk',
        totalPoints: 40,
        colour: 'Crimson'
    },
    {
        name: 'Ottley',
        houseMaster: 'Mr Morgan',
        email: 'dam@rgsw.org.uk',
        totalPoints: 5,
        colour: 'Gold'
    },
    {
        name: 'Elgar',
        houseMaster: 'Mr Friend',
        email: 'jcf@rgsw.org.uk',
        totalPoints: 0,
        colour: '#FFA500'
    }
];

function seedDB(){
    //REMOVE EVENTS

    // The first stage is to use the Mongoose deleteMany function, this deletes all documents
    // that fit the critera defined within the first object provided.
    // When Mongoose queries critera are supplied with an empty object, they automatically
    // select all documents within the collection, so in this instance, it is deleting every
    // document that is inside the houses collection.
    // Because we are deleting data, there is no returned value, for this reason the callback function
    // only has an error parameter.
    House.deleteMany({}, function(err) {
        if(err) { // Basic error handling, log the error and automatically break out of routine.
            console.log(err);
        } else {
            console.log('removed all houses');

            //REMOVE HOUSES
            // The same Mongoose function is used here, however this is no acting on the events collection,
            // deleting all documents within this collection too.
            Event.deleteMany({}, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('removed all events');

                     // REPOPULATE DATABASE
                     // After all data has been deleted from both collections, the collections need
                     // repopulating with new and freshly created data, to do this, a forEach loop
                     // is used.
                     // This forEach loop goes through each object in the dataHouse array and creates
                     // a new house with the data contained within the object. A callback function is
                     // then used to handle any errors that may occur.
                     dataHouse.forEach(function(houseSeed) {
                         House.create(houseSeed, function(err, house){
                             if(err){
                                 console.log(err);
                             } else {

                                 // At this stage the houses collection has been repopulated, however
                                 // the events collection is still empty. This function below seeds the
                                 // events collection with new data. It is using a create function
                                 // provided by Mongoose to create a new event using the data given in the
                                 // first object parameter.

                                 Event.create({
                                     name: 'DefaultEvent',
                                     date: new Date("2019-03-13T00:00:00Z"),
                                     first: {points: 40, house: 'Wylde'},
                                     second: {points: 30, house: 'Whiteladies'},
                                     third: {points: 20, house: 'Ottley'},
                                     fourth: {points: 10, house: 'Elgar'}
                                 }, function(err, event){
                                     if(err) {
                                         console.log(err);
                                     } else {

                                         // The house schema contains an object reference to events, therefore
                                         // each event is pushed into every house's array of events.
                                         house.events.push(event);
                                         // Save the house object after pushing event into house.events array
                                         house.save(function(err){
                                             if(err){
                                                 console.log(err);
                                             } else {
                                                 // Log the event to the console for debugging and to check that
                                                 // the event and house were correctly added
                                                 console.log('created event');
                                                 console.log('');
                                                 console.log('');
                                                 console.log(house);
                                                 console.log('');
                                                 console.log('');
                                                 console.log(event);
                                             }
                                         });
                                     }
                                 });

                             }
                         });
                     });
                }
            });
        }
    });
}



module.exports = seedDB;


// function seedUserDB(){
//     User.deleteMany({}, function(err){
//         if(err) {
//             console.log(err);
//         } else {
//             console.log('removed user db');
//
//             User.create({
//                 username: 'admin',
//                 password: 'admin'
//             }, function(err, user){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log('created admin user');
//                     console.log(user);
//                 }
//             });
//         }
//     });
// }
