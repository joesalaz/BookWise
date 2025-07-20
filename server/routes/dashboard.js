var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {// Protect this route with authentication middleware
  res.render('dashboard', { title:'BookWise' });
});

module.exports = router;