import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value === undefined || value <= this.get("price");
        },
        message:
          "Discount price must be less than or equal to the original price",
      },
    },
    countInStock: {
      type: Number,
      required: [true, "Stock count is required"],
      default: 0,
    },
    sku: {
      type: String,
      unique: [true, "SKU must be unique"],
      required: [true, "SKU is required"],
      index: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    brand: {
      type: String,
      required: [true, "Product brand is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    sizes: {
      type: [String],
      required: [true, "Available sizes are required"],
      lowercase: true,
    },
    colors: {
      type: [String],
      required: [true, "Available colors are required"],
      lowercase: true,
    },
    collections: {
      type: String,
      required: [true, "Product collection is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    material: {
      type: String,
      required: [true, "Material is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["men", "women", "unisex"],
        message: "Gender must be either 'men', 'women', or 'unisex'",
      },
      lowercase: true,
    },
    images: [
      {
        url: {
          type: String,
          required: [true, "Image URL is required"],
        },
        altText: {
          type: String,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReview: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
      lowercase: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
