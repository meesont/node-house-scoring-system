/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   31-03-2019
 * @Last modified by:   Tom
 * @Last modified time: 31-03-2019
 * @License: Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 * @Copyright: Copyright(c) 2018 Thomas Meeson
 */


// This model follows the same format as the event.js model, with very slight differences


// A slight change occurs within this file, because this file will be used to store passwords
// a libary called passport-local-mongoose is imported as a module which saves me working on manual
// password hashing which may create insecurities
var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

// In this instance, passport-local-mongoose creates a username, hash and salt field for us
// these fields are used to authenticate users and store passwords securely
// passport-local-mongoose also adds some methods to the schema, that are used for
// checking that users are authenticated and setting/changing passwords

var userSchema = new mongoose.Schema({
    username: String,
    password: String
    // isAdmin: {type: Boolean, default: false}
});

// passport-local-mongoose is a plugin for schemas, that adds functionality
// and extend the base setup and design of a schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
