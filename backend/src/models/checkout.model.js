import { model, Schema } from "mongoose";

// Schema for individual items in checkout
const checkoutItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

// Enum for payment status and methods
const paymentStatusEnum = ["pending", "completed", "failed", "refunded"];
const paymentMethodEnum = ["credit_card", "paypal", "cash_on_delivery"];

// Main Checkout Schema
const checkoutSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: paymentMethodEnum,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    paidAt: {
      type: Date,
      validate: {
        validator: function () {
          return this.isPaid ? this.paidAt != null : true;
        },
        message: "paidAt is required if isPaid is true",
      },
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: paymentStatusEnum,
    },
    paymentDetails: {
      type: Schema.Types.Mixed,
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
    finalizedAt: {
      type: Date,
      validate: {
        validator: function () {
          return this.isFinalized ? this.finalizedAt != null : true;
        },
        message: "finalizedAt is required if isFinalized is true",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for payment status and finalized status for performance
checkoutSchema.index({ isPaid: 1, isFinalized: 1 });

const Checkout = model("Checkout", checkoutSchema);

export default Checkout;
