require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const sessionMiddleware = require("./middleware/session"); 
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const requireAuth = require("./middleware/auth");// Import the authentication middleware
const dashboardRouter = require("./routes/dashboard");
const bookRouter = require("./routes/book");
const booksRouter = require("./routes/books");
const categoriesRouter = require("./routes/categories");
const authRouter = require("./routes/auth"); // Import the auth router
const hbs = require("hbs");
const fs = require("fs");


// This function will walk through the given directory (and all its subfolders)
// and register every .hbs file it finds as a Handlebars partial.
// The partial's name will match its path inside the partials folder, using slashes.
function registerPartialsRecursively(dir, partialsRoot = dir) {
  // Let's look at everything in the current directory
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    // If we find a folder, let's dive in and look for more partials there
    if (fs.statSync(fullPath).isDirectory()) {
      registerPartialsRecursively(fullPath, partialsRoot);
    }
    // If it's a .hbs file, it's a partial—let's register it!
    else if (path.extname(fullPath) === ".hbs") {
      // Figure out what to call this partial based on its path inside the partials folder
      const partialName = path.relative(partialsRoot, fullPath)
        .replace(/\\/g, "/") // Make sure it works on Windows too
        .replace(/\.hbs$/, ""); // Drop the .hbs extension

      // Now, actually register the partial with Handlebars
      hbs.registerPartial(partialName, fs.readFileSync(fullPath, "utf8"));
    }
  });
}
// Just call this once, pointing to your partials folder.
// Now I can use partials from any subfolder, like {{> structure/footer-dashboard}}
registerPartialsRecursively(path.join(__dirname, "views/partials"));


var app = express();



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("view options", { layout: "layouts/layout" });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use(sessionMiddleware); // Use the session middleware

// Middleware to protect routes by checking if the user is authenticated
// If the user is logged in (req.session.user exists), allow access to the route.
const protectedRoutes = [ // Add your protected routes here
  { path: "/dashboard", router: dashboardRouter },
  { path: "/book", router: bookRouter },
  { path: "/books", router: booksRouter },
  { path: "/categories", router: categoriesRouter },

  // { path: '/profile', router: profileRouter }, // Add more protected routes here
];

protectedRoutes.forEach(({ path, router }) => {
  app.use(path, requireAuth, router);
});
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter); // Use the auth router for authentication routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
