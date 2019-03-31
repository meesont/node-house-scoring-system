/**
 * @Author: Thomas Meeson <thomas>
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
 * @Copyright: Copyright 2018 Thomas Meeson
 */

const express = require('express'),
    router = express.Router();


router.get('/error/incorrectToken', function(req, res) {
    res.render('errors/incorrectToken', {pageTitle: 'Incorrect Token'});
});

router.get('/error/incorrectDetails', function(req, res) {
    res.render('errors/incorrectDetails', {pageTitle: 'Incorrect Details'});
});

router.get('/error', function(req, res) {
    res.render('errors/error', {pageTitle: 'Error'});
});

module.exports = router;
