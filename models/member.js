var mongoose = require("mongoose");

var memberSchema = new mongoose.Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Member', memberSchema);