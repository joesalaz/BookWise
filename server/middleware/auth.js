/* Middleware to protect routes by checking if the user is authenticated.
 If the user is logged in (req.session.user exists), allow access to the route.
 If not, redirect the user to the landing page ("/").
 Use this middleware on any route that should require authentication.*/

module.exports = function (req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/?sessionExpired=1');
};