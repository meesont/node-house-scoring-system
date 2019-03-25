var mongoose = require("mongoose");

var eventsSchema = new mongoose.Schema({
   name: String,
   maxPoints: Number,
   maxPlayers: Number,
   date: Date,
   members: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Member'
      }
   ]
});


module.exports = mongoose.model('Event', eventsSchema);
