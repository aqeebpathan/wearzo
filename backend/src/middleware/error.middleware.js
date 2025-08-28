import "../config/dotenv.config.js";

/**
 * Global error handling middleware.
 * Sends error response with appropriate status code and message.
 * In development mode, sends detailed error messages.
 * In production, sends a generic "Internal Server Error" message.
 *
 * @function
 * @name errorHandler
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
};

export default errorHandler;
