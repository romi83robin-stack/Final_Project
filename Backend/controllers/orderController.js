import Order from "../models/Order.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

// ================= Checkout Controller =================
export const checkout = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's cart with product details
    const cart = await Cart.find({ user: userId }).populate("product");
    if (!cart || cart.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Calculate total and prepare order items
    let totalPrice = 0;
    const orderItems = cart.map((item) => {
      if (!item.product) throw new Error("Product not found");
      totalPrice += item.product.price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        size: item.size,
      };
    });

    // Create new order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalPrice,
      status: "Completed", // can be "Pending" if you want
    });
    await newOrder.save();

    // Clear user's cart
    await Cart.deleteMany({ user: userId });

    // Deduct stock from products (optional)
    for (const item of cart) {
      if (item.product?.stock != null) {
        await Product.findByIdAndUpdate(item.product._id, {
          $inc: { stock: -item.quantity },
        });
      }
    }

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
