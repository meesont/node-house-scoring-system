var mongoose = require("mongoose");

var memberSchema = new mongoose.Schema({
    name: String,
    age: Number,
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});