import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

import {
  getEndOfMonth,
  getStartOfMonth,
  getStartOfWeek,
} from "../utils/dateHelper.js";
import { AppResponse } from "../utils/index.js";
import cloudinary from "../config/cloudinary.config.js";

/**
 * @route  GET /api/admin/users
 * @desc   Retrieves all users (Admin access required).
 * @access Private (Admin only)
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    return AppResponse.success(res, "Users retrieved successfully.", users);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/users
 * @desc    Create a new user account
 * @access  Private (Admin only)
 */
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return AppResponse.error(res, "User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    await user.save();

    return AppResponse.success(res, "User created successfully", user, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/users/:id/role
 * @desc    Update a user's role
 * @access  Private (Admin only)
 */
export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return AppResponse.error(res, "Role is required", 400);
    }

    const allowedRoles = ["customer", "admin"];
    if (!allowedRoles.includes(role)) {
      return AppResponse.error(res, "Invalid role value", 400);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return AppResponse.error(res, "User not found", 404);
    }

    return AppResponse.success(
      res,
      `User role: ${user.role.toUpperCase()}`,
      user
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  Private (Admin only)
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return AppResponse.error(res, "User not found", 404);
    }

    await user.deleteOne();
    return AppResponse.success(res, "User deleted successfully.");
  } catch (error) {
    next(error);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   GET /api/admin/products
 * @desc    Retrieve all products
 * @access  Private (Admin only)
 */
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    return AppResponse.success(
      res,
      "Products retrieved successfully.",
      products
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/admin/products
 * @desc    Create a new product
 * @access  Private (Admin only)
 */
const uploadToCloudinary = (buffer, mimetype) => {
  const base64Str = `data:${mimetype};base64,${buffer.toString("base64")}`;

  return cloudinary.uploader.upload(base64Str, {
    folder: "ecommerce/products",
  });
};

export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      isFeatured,
      isPublished,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      // dimensions,
    } = req.body;

    // handle sizes/colors/tags as arrays (from form-data)
    const parsedSizes = Array.isArray(sizes) ? sizes : sizes?.split(",") || [];
    const parsedColors = Array.isArray(colors)
      ? colors
      : colors?.split(",") || [];
    const parsedTags = Array.isArray(tags) ? tags : tags?.split(",") || [];

    // uplaod iamges to cloudinary
    const images = [];

    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer, file.mimetype);
      images.push({ url: result.secure_url, altText: file.originalname });
    }

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes: parsedSizes,
      colors: parsedColors,
      collections,
      material,
      gender,
      images,
      isFeatured: isFeatured === "true",
      isPublished: isPublished === "true",
      rating: 0,
      numReview: 0,
      tags: parsedTags,
      user: req.userId,
      metaTitle,
      metaDescription,
      metaKeywords,
    });

    return AppResponse.success(
      res,
      "Product created successfully",
      product,
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/products/:id
 * @desc    Update product details (Admin only)
 * @access  Private (Admin only)
 */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return AppResponse.error(res, "Product not found.", 404);

    if (!validateDiscountPrice(req.body)) {
      return AppResponse.error(
        res,
        "Validation Error: 'discountPrice' must be less than or equal to 'price'.",
        400
      );
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    return AppResponse.success(
      res,
      "Product updated successfully.",
      updatedProduct
    );
  } catch (error) {
    next(error);
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   GET /api/admin/orders
 * @desc    Retrieve all orders
 * @access  Private (Admin only)
 */
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("user", "username email");

    return AppResponse.success(res, "Orders retrieved successfully.", orders);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/admin/orders/:id/status
 * @desc    Update the status of an order
 * @access  Private (Admin only)
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return AppResponse.error(res, "Invalid order status.", 400);
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        ...(status === "delivered" && {
          isDelivered: true,
          deliveredAt: Date.now(),
        }),
      },
      { new: true, runValidators: true }
    );

    if (!order) {
      return AppResponse.error(res, "Order not found.", 404);
    }

    return AppResponse.success(
      res,
      `Order status: ${order.status.toUpperCase()}.`,
      order
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/admin/orders/:id
 * @desc    Delete an order
 * @access  Private (Admin only)
 */
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return AppResponse.error(res, "Order not found.", 404);
    }

    return AppResponse.success(res, "Order deleted successfully.");
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/stats/overview
 * @desc    Get admin dashboard metrics
 * @access  Private (Admin only)
 */
export const getAdminOverview = async (req, res, next) => {
  try {
    const startOfMonth = getStartOfMonth();
    const endOfMonth = getEndOfMonth();
    const startOfWeek = getStartOfWeek();

    const [
      monthlyOrders,
      totalUsers,
      totalOrders,
      lowStockProducts,
      newUsersThisWeek,
    ] = await Promise.all([
      Order.find({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      }), // Orders for current month
      User.countDocuments(), // Total registered users
      Order.countDocuments(), // Total orders overall
      Product.find({ countInStock: { $lt: 3 } }), // Products with less than 2 in stock
      User.countDocuments({
        createdAt: { $gte: startOfWeek },
      }), // New users this week
    ]);

    // Sum up monthly revenue from orders
    const revenue = monthlyOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    return AppResponse.success(res, "Fetched Admin Stats Overview", {
      revenue,
      totalUsers,
      totalOrders,
      lowStockCount: lowStockProducts.length,
      newUsersThisWeek,
      lowStockProducts: lowStockProducts.map((p) => ({
        id: p._id,
        name: p.name,
        countInStock: p.countInStock,
      })),
    });
  } catch (error) {
    next(error);
  }
};
