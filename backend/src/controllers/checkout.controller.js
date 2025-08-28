import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Checkout from "../models/checkout.model.js";

import { AppResponse } from "../utils/index.js";
import { getRandomArrivalDate } from "../utils/dateHelper.js";

/**
 * @route   POST /api/checkout
 * @desc    Create a new checkout session for the authenticated user.
 * @access  Private
 */
export const createCheckout = async (req, res, next) => {
  try {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
      req.body;

    console.log(checkoutItems, shippingAddress, paymentMethod, totalPrice);

    if (!checkoutItems || checkoutItems.length === 0) {
      return AppResponse.error(res, "Checkout items cannot be empty.", 400);
    }

    const newCheckout = await Checkout.create({
      user: req.userId,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });

    return AppResponse.success(
      res,
      "Checkout created successfully.",
      { checkoutId: newCheckout._id },
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/checkout/:id/payment
 * @desc    Update the payment status of a checkout.
 * @access  Private
 */
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus, paymentDetails } = req.body;

    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return AppResponse.error(res, "Checkout not found.", 404);
    }

    console.log(paymentStatus);
    if (paymentStatus.toLowerCase() !== "completed") {
      return AppResponse.error(res, "Invalid payment status.", 400);
    }

    checkout.isPaid = true;
    checkout.paymentStatus = paymentStatus;
    checkout.paymentDetails = paymentDetails;
    checkout.paidAt = new Date();

    await checkout.save();

    return AppResponse.success(
      res,
      "Payment status updated successfully.",
      checkout
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/checkout/:id/finalize
 * @desc    Finalize a checkout and create an order if payment is completed.
 * @access  Private
 */
export const finalizeOrder = async (req, res, next) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return AppResponse.error(res, "Checkout not found.", 404);
    }

    if (!checkout.isPaid) {
      return AppResponse.error(
        res,
        "Checkout is not paid. Cannot finalize order.",
        400
      );
    }

    if (checkout.isFinalized) {
      return AppResponse.error(
        res,
        "Checkout has already been finalized.",
        400
      );
    }

    const arrivalDate = getRandomArrivalDate();

    // Create final order
    const finalOrder = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      paymentStatus: "completed",
      paymentDetails: checkout.paymentDetails,
      estimatedArrival: arrivalDate,
    });

    // Mark checkout as finalized
    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    // Remove the user's cart after checkout is finalized
    await Cart.findOneAndDelete({ user: checkout.user });

    return AppResponse.success(
      res,
      "Checkout finalized successfully.",
      // finalOrder, --> // Skipping full finalOrder response to reduce payload size and improve performance; only sending minimal data to frontend
      {
        orderId: finalOrder._id,
        status: "finalized",
      },
      200
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};
