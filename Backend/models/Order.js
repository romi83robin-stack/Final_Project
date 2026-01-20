import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size: { type: String },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
    shippingAddress: { type: String },
    paymentMethod: { type: String, default: "COD" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
