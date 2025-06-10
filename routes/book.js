var express = require('express');
var router = express.Router();

//Get a specific book
router.get('/', function(req, res, next){
    res.render('book', {title: 'View Book'});

});
module.exports = router;