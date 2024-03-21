const csurf = require('csurf');

// Setup CSRF protection middleware
const csrfProtection = csurf({ cookie: true });

module.exports = csrfProtection;