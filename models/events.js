var mongoose = require("mongoose");

var eventsSchema = new mongoose.Schema({
   name: String,
   maxPoints: Number,
   maxPlayers: Number,
   date: Date
});


module.exports = mongoose.model('Event', eventsSchema);
