const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Destructure the needed controllers for clarity
const { signup, verifyEmail, resendVerificationEmail } = authController;

// Render signup page (GET /auth/)
router.get("/", function (req, res) {
  res.render("signup", { title: "BookWise" });
});

// Handle POST /auth/signup
router.post("/signup", signup);

// Handle GET /auth/verify-email?token=...
router.get("/verify-email", verifyEmail);

// Handle POST /auth/resend-verification
router.post("/resend-verification", resendVerificationEmail);

// (Optional) Render login page (GET /auth/login)
router.get("/login", (req, res) => {
  res.render("login", { title: "BookWise Login" });
});

module.exports = router;


