import Promotion from "../models/promotion.model.js";
import AppResponse from "../utils/response/AppResponse.js";

/**
 * @route   POST /api/promotions
 * @desc    Create a new promotion (Admin only)
 * @access  Private (Admin)
 */
export const createPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.create(req.body);

    return AppResponse.success(
      res,
      "Promotion created successfully.",
      promotion,
      200
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/promotions/current
 * @desc    Retrieve the currently active promotion (if any)
 * @access  Public
 */
export const getCurrentPromotion = async (req, res, next) => {
  try {
    const now = new Date();

    const promotion = await Promotion.findOne({
      expiresAt: { $gte: now },
    }).sort({ expiresAt: 1 });

    if (!promotion) {
      return AppResponse.error(res, "No active promotion found.");
    }

    return AppResponse.success(
      res,
      "Active promotion retrieved successfully.",
      promotion,
      200
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/promotions/seed
 * @desc    Create a predefined one-time promotion if it doesn't already exist (Dev utility)
 * @access  Public
 */
export const createOneTimePromotion = async (req, res, next) => {
  try {
    const existing = await Promotion.findOne({
      message: "Get 25% Off This Summer Sale. Grab It Now!",
    });

    if (existing) {
      return AppResponse.success(
        res,
        "Promotion already exists.",
        existing,
        200
      );
    }

    const promotion = await Promotion.create({
      message: "Get 25% Off This Summer Sale. Grab It Now!",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return AppResponse.success(
      res,
      "One-time promotion created successfully.",
      promotion,
      201
    );
  } catch (error) {
    next(error);
  }
};
