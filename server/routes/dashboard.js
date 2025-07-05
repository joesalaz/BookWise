var express = require('express');
var router = express.Router();

const requireAuth = require("../middleware/auth");

/* GET home page. */
router.get('/', requireAuth, function(req, res, next) {// Protect this route with authentication middleware
  res.render('dashboard', { title:'BookWise' });
});

module.exports = router;