class ExpressError extends Error {
  constructor(statusCode, message) {
    super(); // Call parent constructor
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;
