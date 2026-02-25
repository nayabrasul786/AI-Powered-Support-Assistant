const rateLimit = require("express-rate-limit");

// Create rate limiter middleware
const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 20, // Max 20 requests per IP per minute
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers

  message: {
    error: "Too many requests. Please try again after a minute."
  }
});

module.exports = rateLimiter;