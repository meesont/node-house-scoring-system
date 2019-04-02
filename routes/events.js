/**
 * @Author: Thomas Meeson <Tom>
 * @Date:   31-03-2019
 * @Last modified by:   Tom
 * @Last modified time: 01-04-2019
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


const express = require('express'),
    router = express.Router(),
    Event = require('../models/event');


router.get('/', function(req, res) {

    var title = 'Events';

    Event.find({}, function(err, events) {
       if(err){
           console.log('Error encountered');
           console.log(err);
           res.redirect('/error');
       } else {
           res.render('events/index', {pageTitle: title, events: events});
       }
    });

});

router.post('/', isLoggedIn, function(req, res) {

    //req.body.event used as entire form is done in event[value] style

    Event.create(req.body.event, function (err, newEvent) {
        if(err){
            console.log('Error encountered');
            console.log(err);
            res.redirect('/error');
        } else {
            res.redirect('/events');
        }
    });

});

// SHOW ROUTE
router.get('/:id', function(req, res) {

    Event.findById(req.params.id, function(err, event) {
        if(err) {
            console.log(err);
            res.redirect('/error');
        } else {
            var name = event.name;
            res.render('events/show', {pageTitle: name, event: event});
        }
    });
});


router.get('/:id/edit', function(req, res) {
    Event.findById(req.params.id, function(err, event){
        if(err){
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('events/edit', {pageTitle: 'Edit Event', event: event});
        }
    });
});

router.put('/:id', function(req, res){
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedEvent){
        
    })
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/error/notAuthenticated');
}


module.exports = router;
