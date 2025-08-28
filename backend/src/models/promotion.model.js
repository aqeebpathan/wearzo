import { model, Schema } from "mongoose";

const promotionSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Promotion = model("Promotion", promotionSchema);

export default Promotion;
