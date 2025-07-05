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

router.get("/login", (req, res) => {
  const successMessage = req.session.successMessage;
  delete req.session.successMessage;
  res.render("login", { title: "BookWise Login", successMessage });
});

// Handle POST /auth/login
router.post("/login", authController.login); 

// Handle GET /auth/logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/");
  });
});

module.exports = router;


