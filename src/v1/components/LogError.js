const httpStatus = require('http-status');
/**
 * @extends Error
 */
class ExtendableError extends Error {
  /**
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - visible to user or not.
   */
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * @extends ExtendableError
 */
class LogError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - visible to user or not.
   */
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR,
      isPublic = false) {
    super(message, status, isPublic);
  }
}

module.exports = LogError;
