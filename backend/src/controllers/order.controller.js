import Order from "../models/order.model.js";
import { AppResponse } from "../utils/index.js";

/**
 * @route   GET /api/orders
 * @desc    Retrieve all orders for the authenticated user, sorted by most recent.
 * @access  Private
 */
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    return AppResponse.success(res, "Orders retrieved successfully.", orders);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/orders/:id
 * @desc    Retrieve a specific order by ID for the authenticated user.
 * @access  Private
 */
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (!order) {
      return AppResponse.error(res, "Order not found.", 404);
    }

    return AppResponse.success(res, "Order retrieved successfully.", order);
  } catch (error) {
    next(error);
  }
};
