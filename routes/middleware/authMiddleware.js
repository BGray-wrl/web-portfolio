const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    console.log('User is authenticated, proceeding to the next middleware/route handler.');
    return next(); // User is authenticated, proceed to the next middleware/route handler
  } else {
    console.log('User is not authenticated, redirecting to login.');
    return res.redirect('/auth/login'); // Redirect to login if not authenticated
  }
};

module.exports = {
  isAuthenticated
};