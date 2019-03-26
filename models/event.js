var mongoose = require("mongoose");

var eventsSchema = new mongoose.Schema({
   name: String,
   firstPoints: Number,
   secondPoints: Number,
   thirdPoints: Number,
   fourthPoints: Number,
   date: Date,
   winner: String,
   runnerUp: String,
   third: String,
   fourth: String
});


module.exports = mongoose.model('Event', eventsSchema);
