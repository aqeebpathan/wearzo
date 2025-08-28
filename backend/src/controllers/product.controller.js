import Product from "../models/product.model.js";
import { AppResponse, buildProductQuery } from "../utils/index.js";

/**
 * @route   GET /api/products
 * @desc    Retrieve all products with filtering, sorting, and optional limit.
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
  try {
    const { query, sortOptions, limit } = buildProductQuery(req.query);

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limit)
      .select("-__v")
      .lean();

    if (!products.length) {
      return AppResponse.error(
        res,
        "No products found. Try adjusting your filters."
      );
    }

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
 * @route   GET /api/products/:id
 * @desc    Retrieve a single product by ID.
 * @access  Public
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return AppResponse.error(res, "Product not found.", 404);

    return AppResponse.success(res, "Product retrieved successfully.", product);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/products/similar/:id
 * @desc    Retrieve similar products based on gender and category.
 * @access  Public
 */
export const getSimilarProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return AppResponse.error(res, "Product not found.", 404);

    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      gender: product.gender,
      category: product.category,
    })
      .limit(4)
      .lean();

    return AppResponse.success(
      res,
      "Retrieved similar products.",
      similarProducts
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/products/best-seller
 * @desc    Retrieve the best-selling product based on rating.
 * @access  Public
 */
export const getBestSellerProduct = async (req, res, next) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 }).lean();
    if (!bestSeller)
      return AppResponse.error(res, "No best seller product found.", 404);

    return AppResponse.success(
      res,
      "Best seller product retrieved.",
      bestSeller
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/products/new-arrivals
 * @desc    Retrieve the latest products sorted by creation date.
 * @access  Public
 */
export const getNewArrivalProducts = async (req, res, next) => {
  try {
    const newArrivals = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();
    if (!newArrivals.length)
      return AppResponse.error(res, "No new arrivals found.", 404);

    return AppResponse.success(
      res,
      "New arrival products retrieved.",
      newArrivals
    );
  } catch (error) {
    next(error);
  }
};
