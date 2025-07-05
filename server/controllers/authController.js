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


exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.render("check-email", {
        error: "Invalid or missing verification token.",
      });
    }

    const user = await User.findOne({ where: { verificationToken: token } });
    if (!user) {
      return res.render("check-email", {
        error: "Invalid or expired verification token.",
      });
    }

    if (user.verificationTokenExpires < new Date()) {
      return res.render("check-email", {
        error: "Verification token has expired.",
        showResend: true,
        email: user.email,
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    // Set a flash message in session
    req.session.successMessage = "Email has been verified! You can now login.";
    return res.redirect("/?showLogin=1"); // Redirect to landing page with login modal open
  } catch (error) {
    console.error("Email verification error:", error);
    return res.render("check-email", {
      error: "Server error during verification.",
    });
  }
};

exports.resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.render("check-email", {
        error: "Email is required to resend verification.",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("check-email", {
        error: "No account found with that email.",
      });
    }

    if (user.isVerified) {
      return res.render("check-email", {
        error: "This email is already verified. Please log in.",
      });
    }

    // Generate new token and expiry
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    // Use BASE_URL from environment
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/auth/verify-email?token=${verificationToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 587,
      secure: false,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    await transporter.sendMail({
      from: '"BookWise" <noreply@bookwise.joesalaz.com>',
      to: email,
      subject: "Verify your BookWise account",
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    });

    return res.render("check-email", {
      email,
      message:
        "A new verification email has been sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    return res.render("check-email", {
      error: "Server error while resending verification email.",
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.render("login", {
        title: "BookWise Login",
        loginError: "Email and password are required.",
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("login", {
        title: "BookWise Login",
        loginError: "Invalid email or password.",
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.render("login", {
        title: "BookWise Login",
        loginError: "Please verify your email before logging in.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        title: "BookWise Login",
        loginError: "Invalid email or password.",
      });
    }

    // Login successful: set session here
    req.session.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      // add any other info you want to store
    };
    // Redirect to dashboard or home page
    return res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    return res.render("login", {
      title: "BookWise Login",
      loginError: "Server error during login.",
    });
  }
};