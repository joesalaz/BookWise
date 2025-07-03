// Import the User model
const { User } = require("../models");
// Import bcrypt for password hashing
const bcrypt = require("bcrypt");
// Import crypto for token generation
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
/**
 * Handle user signup
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
exports.signup = async (req, res) => {
  try {
    const { name, lastName, username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password || !name || !lastName) {
      return res.render("landing", {
        title: "BookWise",
        signupError: "All fields are required.",
        showAuthModal: true, // Add this flag to auto-open modal on error
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render("landing", {
        title: "BookWise",
        signupError: "Invalid email format.",
        showAuthModal: true,
      });
    }
    if (password.length < 6) {
      return res.render("landing", {
        title: "BookWise",
        signupError: "Password must be at least 6 characters.",
        showAuthModal: true,
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render("landing", {
        title: "BookWise",
        signupError: "A user with this email already exists.",
        showAuthModal: true,
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
      name,
      lastName,
      verificationToken,
      verificationTokenExpires,
      isVerified: false,
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 587,
      secure: false,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });
    const verificationUrl = `http://localhost:3000/auth/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      from: '"BookWise" <noreply@bookwise.joesalaz.com>',
      to: email,
      subject: "Verify your BookWise account",
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    });
    console.log("Verification email sent!");
    // Render check-email page with email
    return res.render("check-email", { email });

    // // On success, redirect to dashboard
    // return res.redirect("/dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    return res.render("landing", {
        title: "BookWise",
      signupError: "Server error during signup.",
      showAuthModal: true,
    });
  }
};
