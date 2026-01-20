import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    size: { type: String, default: "" }, // Optional - empty for SHAWLS, DUPATTAS, ESSEMBLES
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
