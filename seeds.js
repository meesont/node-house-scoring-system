var mongoose = require("mongoose"),
    Event = require("./models/event"),
    House = require("./models/house"),
    Member = require("./models/member");
    

var dataHouse = [
    {
        
    }
];

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
    
}

/*
- delete all data in all collections
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