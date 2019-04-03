/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   31-03-2019
 * @Last modified by:   Tom
 * @Last modified time: 03-04-2019
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


// This line imports the module mongoose (that was provided by NPM) as a constant
// This is the reverse of module.exports
const mongoose = require("mongoose");


// This is where I am defining a new Schema, a schema is a contstructor provided by mongoose in order to template a new model
// A model is a template for a document (documents are the MongoDB equivilent of Records), documents are then contained within a collection
// A collection is a grouping of MongoDB documents, the NoSQL equivilent of a table
// The whole schema is defined within a JavaScript object and contains nested objects
// Each of the positons (first, second, third, fourth) is an object nested within the parent object schema
// Source: https://docs.mongodb.com/manual/reference/glossary/
var eventsSchema = new mongoose.Schema({
   name: String, // The event name, with data type String
   date: Date, // Date with data type Date
   first: {
       points: Number, // The points awarded to the first place with data type Number
       house: String
   },
   second: {
       points: Number,
       house: String
   },
   third: {
       points: Number,
       house: String
   },
   fourth: {
       points: Number,
       house: String
   }
});

// The module.exports line is required to export this schema model as a module
// In this instance I have compacted the mongoose.model inside the export, whereas this can often be done seperately.
// EXAMPLE OF SEPERATION
    // const model = mongoose.model('Event', eventsSchema);
    // module.exports = model;
// This is simply compacted into a single line
// Source: https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
module.exports = mongoose.model('Event', eventsSchema);
