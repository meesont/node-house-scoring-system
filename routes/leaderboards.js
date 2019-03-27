const express = require('express'),
    router = express.Router();

router.get('/', function(req, res){
    res.render('leaderboards/index', {pageTitle: 'Leaderboards'})
});

module.exports = router;
