const rateLimit = require("express-rate-limit");

// middleware for the login route to prevent Brute-force attack
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6 // limit each IP to 100 requests per windowMs
});

module.exports = limiter;