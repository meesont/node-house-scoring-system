var mongoose = require("mongoose");

/*
Each house can have many events
each event relates to all 4 houses
there are only 4 houese
*/

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

module.exports = mongoose.model('House', houseSchema);