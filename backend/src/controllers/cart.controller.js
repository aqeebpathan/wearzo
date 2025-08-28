import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

import { AppResponse } from "../utils/index.js";

/**
 * Retrieve the cart for a user or guest.
 *
 * @param   {string} userId - The ID of the logged-in user.
 * @param   {string} guestId - The ID of the guest session.
 * @returns {Promise<Object|null>} - The matching cart document or null.
 */
const findCart = async (userId, guestId) => {
  return userId
    ? await Cart.findOne({ user: userId })
    : await Cart.findOne({ guestId });
};

/**
 * @route   POST /api/cart
 * @desc    Add a product to the cart
 * @access  Public
 */
export const addProduct = async (req, res, next) => {
  try {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return AppResponse.error(res, "Product not found.", 404);

    if (!quantity || quantity <= 0) {
      return AppResponse.error(res, "Invalid quantity.", 400);
    }

    let cart = await findCart(userId, guestId);
    if (!cart) {
      cart = new Cart({
        user: userId || undefined,
        guestId: guestId || `guest_${Date.now()}`,
        products: [],
        totalPrice: 0,
      });
    }

    const existingProduct = cart.products.find(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({
        productId,
        name: product.name,
        image: product.images[0]?.url || "",
        price: product.price,
        size,
        color,
        quantity,
      });
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    await cart.save();

    return AppResponse.success(
      res,
      "Product added to cart successfully.",
      cart
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/cart
 * @desc    Update the quantity of a product in the cart
 * @access  Public
 */
export const updateProductQuantity = async (req, res, next) => {
  try {
    const { productId, quantityDelta, size, color, guestId, userId } = req.body;

    if (typeof quantityDelta !== "number" || quantityDelta === 0) {
      return AppResponse.error(
        res,
        "Invalid quantity change. Must be a non-zero number.",
        400
      );
    }

    let cart = await findCart(userId, guestId);
    if (!cart) return AppResponse.error(res, "Cart not found.", 404);

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex === -1)
      return AppResponse.error(res, "Product not found in cart.", 404);

    // Calculate new quantity
    const currentQuantity = cart.products[productIndex].quantity;
    const newQuantity = currentQuantity + quantityDelta;

    if (newQuantity > 0) {
      cart.products[productIndex].quantity = newQuantity;
    } else {
      // Remove product if quantity zero or less
      cart.products.splice(productIndex, 1);
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    await cart.save();

    cart.products.forEach((p) => {
      p.totalProductPrice = p.price * p.quantity;
    });

    return AppResponse.success(res, "Cart updated successfully.", cart, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/cart
 * @desc    Remove a product from the cart
 * @access  Public
 */
export const removeProduct = async (req, res, next) => {
  try {
    const { productId, size, color, guestId, userId } = req.body;

    let cart = await findCart(userId, guestId);
    if (!cart) return AppResponse.error(res, "Cart not found.", 404);

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex === -1)
      return AppResponse.error(res, "Product not found in cart.", 404);

    cart.products.splice(productIndex, 1);
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    await cart.save();

    return AppResponse.success(res, "Product removed successfully.", cart, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/cart
 * @desc    Retrieve the current cart for a user or guest
 * @access  Public
 */
export const getCart = async (req, res, next) => {
  try {
    const { userId, guestId } = req.query;
    let cart = await findCart(userId, guestId);

    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
        user: userId || null,
        guestId: guestId || null,
      };
    }

    const cartData = cart.toObject ? cart.toObject() : cart;

    const subtotal = cartData.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const estimatedTax = Number((subtotal * 0.1).toFixed(2));
    const deliveryFee = 0;
    const total = subtotal + estimatedTax + deliveryFee;

    const cartSummary = {
      ...cartData,
      summary: {
        subtotal,
        estimatedTax,
        deliveryFee,
        total,
      },
    };

    cartSummary.products.forEach((p) => {
      p.totalProductPrice = p.price * p.quantity;
    });

    return AppResponse.success(
      res,
      "Cart retrieved successfully.",
      cartSummary,
      200
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/cart/merge
 * @desc    Merge a guest cart into the user's cart upon login
 * @access  Private
 */
export const mergeCart = async (req, res, next) => {
  try {
    const { guestId } = req.body;

    // Find guest and user carts
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.userId });

    if (!guestCart || guestCart.products.length === 0) {
      return AppResponse.error(res, "Guest cart is empty.", 400);
    }

    if (!userCart) {
      // If user has no cart, assign guest cart to user and remove guest cart
      guestCart.user = req.userId;
      guestCart.guestId = undefined;
      await guestCart.save();
      return AppResponse.success(res, "Cart merged successfully.", guestCart);
    }

    // Merge guest cart into user cart
    guestCart.products.forEach((guestItem) => {
      const productIndex = userCart.products.findIndex(
        (item) =>
          item.productId.toString() === guestItem.productId.toString() &&
          item.size === guestItem.size &&
          item.color === guestItem.color
      );

      if (productIndex > -1) {
        // If product already exists, update quantity
        userCart.products[productIndex].quantity += guestItem.quantity;
      } else {
        // Otherwise, add new product
        userCart.products.push(guestItem);
      }
    });

    // Recalculate total price
    userCart.totalPrice = userCart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await userCart.save();
    await Cart.deleteOne({ guestId }); // Remove guest cart after merging

    return AppResponse.success(res, "Cart merged successfully.", userCart);
  } catch (error) {
    next(error);
  }
};
