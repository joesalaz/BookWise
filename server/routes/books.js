var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
    res.render('books', {title:'books'});

});
module.exports = router;