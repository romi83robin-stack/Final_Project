import Cart from "../models/CartModel.js";

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // Auth middleware should set req.user
    const { product, size, quantity } = req.body;

    if (!product || !quantity) {
      return res.status(400).json({ message: "Product and quantity are required" });
    }

    // Size is optional (for SHAWLS, DUPATTAS, ESSEMBLES)
    const cartItem = await Cart.findOne({ user: userId, product, size: size || "" });

    if (cartItem) {
      cartItem.quantity += Number(quantity);
      await cartItem.save();
      return res.json(cartItem);
    }

    const newCartItem = await Cart.create({
      user: userId,
      product,
      size: size || "", // Default to empty string if not provided
      quantity: Number(quantity),
    });

    res.status(201).json(newCartItem);
  } catch (error) {
    console.error("CartController Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await Cart.find({ user: userId }).populate("product");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
