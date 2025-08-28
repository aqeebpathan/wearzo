import jwt from "jsonwebtoken";
import AppResponse from "../utils/response/AppResponse.js";

/**
 * Middleware to protect routes that require authentication.
 * Verifies JWT token from cookies and attaches user data to the request object.
 *
 * @function
 * @name protectRoute
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - Error response if authentication fails
 *
 * @access Private
 */
export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return AppResponse.error(res, "Unauthorized - no token provided", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return AppResponse.error(res, "Unauthorized - invalid token", 401);
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to restrict access to admin-only routes.
 * Assumes `protectRoute` has already populated `req.userRole`.
 *
 * @function
 * @name requireAdmin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - Error response if user is not an admin
 *
 * @access Private (Admin only)
 */
export const requireAdmin = (req, res, next) => {
  try {
    if (req.userRole !== "admin") {
      return AppResponse.error(res, "Forbidden - Admin access only", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
