var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing', {  title:'BookWise' });// Still using index but showing a different layout
});
 
module.exports = router;
