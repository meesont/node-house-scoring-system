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


// This model follows the same format as the event.js model, with very slight differences

var mongoose = require("mongoose");

/*
Each house can have many events
each event relates to all 4 houses
there are only 4 houese
*/

var houseSchema = new mongoose.Schema({
    name: String,
    houseMaster: String,
    email: String,
    totalPoints: Number,
    colour: String,
    events: [ // The only difference in this file is that there is an object reference within the file
              // This object reference allows me to link an array of events to the house
              // and therefore render the events for each house if needed
              // Source: https://docs.mongodb.com/manual/reference/database-references/
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

module.exports = mongoose.model('House', houseSchema);
