var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

/*
  "dependencies": {
    "body-parser": "^1.18.3",
    "ejs": "^2.6.1",
    "express": "^4.16.4",
    "express-session": "^1.15.6",
    "mongoose": "^5.4.20",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^5.0.1"
  }
*/