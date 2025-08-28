import { Schema, model } from "mongoose";

// Enum for Payment methods and order statuses
const paymentMethodEnum = ["credit_card", "paypal", "cash_on_delivery"];
const orderStatusEnum = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

// Order item schema
const orderItemSchema = new Schema(
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
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

// Order schema
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema],
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
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
      validate: {
        validator: function (value) {
          return this.isDelivered ? value != null : true;
        },
        message: "deliveredAt is required if isDelivered is true",
      },
    },
    estimatedArrival: {
      type: Date,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    status: {
      type: String,
      enum: orderStatusEnum,
      default: "processing",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
