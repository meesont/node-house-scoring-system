var mongoose = require("mongoose"),
    Event = require("./models/event"),
    House = require("./models/house"),
    User = require('./models/user');

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
    House.deleteMany({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('removed all houses');

            //REMOVE HOUSES
            Event.deleteMany({}, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('removed all events');

                     // REPOPULATE DATABASE
                     dataHouse.forEach(function(seed) {
                         House.create(seed, function(err, house){
                             if(err){
                                 console.log(err);
                             } else {
                                 console.log('created house');

                                 Event.create({
                                     name: 'Football',
                                     firstPoints: 10,
                                     secondPoints: 5,
                                     thirdPoints: 3,
                                     fourthPoints: 2,
                                     date: new Date("2019-03-13T00:00:00Z"),
                                     winner: 'Wylde',
                                     runnerUp: 'Whiteladies',
                                     third: 'Elgar',
                                     fourth: 'Ottley'
                                 }, function(err, event){
                                     if(err) {
                                         console.log(err);
                                     } else {
                                         house.events.push(event);
                                         house.save(function(err){
                                             if(err){
                                                 console.log(err);
                                             } else {
                                                 console.log('created event');
                                                 console.log(house);
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

module.exports = seedDB;

/*
- delete all data in all collections
- Event
- House
- Member
- use data to seed dbs
- create

var eventsSchema = new mongoose.Schema({
   name: String,
   firstPlacePoints: Number,
   runnerUpPoints: Number,
   date: Date,
   winner: String,
   runnerUp: String
});
*/
