var express = require('express');
var router = express.Router();

// If the session has expired (user redirected with ?sessionExpired=1), 
// show a warning message and automatically open the login modal on the landing page.
router.get("/", function (req, res, next) {
  const sessionExpired = req.query.sessionExpired === "1";
  const showLoginModal = sessionExpired; // Open modal if session expired
  const successMessage = req.session.successMessage;
  delete req.session.successMessage;

  res.render("landing", {
    title: "BookWise",
    showLoginModal, // Triggers modal auto-open in JS
    successMessage,
    sessionExpired: sessionExpired
      ? "Your session has expired! Please, login again."
      : null, // Message shown in modal if session expired
  });
});

module.exports = router;