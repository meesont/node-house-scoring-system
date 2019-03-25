var mongoose = require("mongoose"),
    Event = require("./models/event"),
    House = require("./models/house"),
    Member = require("./models/member");


var dataEvent = [
    {
        name: 'Example event 1',
        maxPoints: 10,
        maxPlayers: 5,
        date: new Date("2019-03-13T00:00:00Z")
    },
    {
        name: 'Example event 2',
        maxPoints: 20,
        maxPlayers: 3,
        date: new Date("2019-02-10T00:00:00Z")
    },
    {
        name: 'Example event 3',
        maxPoints: 1000,
        maxPlayers: 204,
        date: new Date("2020-06-29T00:00:00Z")
    }
];

function seedDB() {
    //REMOVE EVENTS
    Event.deleteMany({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('removed all events');
            //REMOVE HOUSES
            House.deleteMany({}, function(err) {
                if(err){
                    console.log(err);
                } else {
                    console.log('removed all houses');
                    //REMOVE MEMBERS
                    Member.deleteMany({}, function(err) {
                        if(err){
                            console.log(err);
                        } else {
                            console.log('removed all members');
                            dataEvent.forEach(function(seed){ // seed is each event
                                Event.create(seed, function(event){ //evt is the event created if successful
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        console.log('created event');
                                        
                                        Member.create({
                                            name: 'Tom',
                                            age: 18
                                        }, function(err, member){
                                            if(err){
                                                console.log(err);
                                            } else {
                                                event.members.push(member);
                                                event.save(function(err){
                                                    if(err){
                                                        console.log(err);
                                                    } else {
                                                        console.log(event);
                                                        console.log("");
                                                        console.log(member);
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
    });
}

module.exports = seedDB;

/*
- delete all data in all collections
- Event
- House
- Member
- use data to seed dbs
- create 


var houseSchema = new mongoose.Schema({
    name: String,
    houseMaster: String,
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Member'
        }
    ]
});
*/