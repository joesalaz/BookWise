const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /signup route
router.post("/signup", authController.signup);

// (Later) POST /login route
// router.post('/login', authController.login);

module.exports = router;
