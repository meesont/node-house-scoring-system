/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   31-03-2019
 * @Last modified by:   Tom
 * @Last modified time: 02-04-2019
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

var mongoose = require("mongoose");

var eventsSchema = new mongoose.Schema({
   name: String,
   date: Date,
   first: {
       points: Number,
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
// var eventsSchema = new mongoose.Schema({
//    name: String,
//    date: Date,
//    first: {
//        points: Number,
//        house: {
//            type: mongoose.Schema.Types.ObjectId,
//            ref: 'House'
//        }
//    },
//    second: {
//        points: Number,
//        house: {
//            type: mongoose.Schema.Types.ObjectId,
//            ref: 'House'
//        }
//    },
//    third: {
//        points: Number,
//        house: {
//            type: mongoose.Schema.Types.ObjectId,
//            ref: 'House'
//        }
//    },
//    fourth: {
//        points: Number,
//        house: {
//            type: mongoose.Schema.Types.ObjectId,
//            ref: 'House'
//        }
//    }
// });

module.exports = mongoose.model('Event', eventsSchema);
