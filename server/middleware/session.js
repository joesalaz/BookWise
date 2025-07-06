const session = require("express-session");

module.exports = session({
  secret: process.env.SESSION_SECRET,// Using my own secret key
  // Ensure you have set the SESSION_SECRET environment variable in your .env file
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  rolling: true // Reset cookie expiration on each request (sliding session)
  // This is useful for keeping the session alive as long as the user is active
});