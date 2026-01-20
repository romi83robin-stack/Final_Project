
import Favourite from "../models/Favourite.js";

// ================= GET FAVOURITES =================
export const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find({
      user: req.user._id,
    }).populate("product");

    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADD / TOGGLE FAVOURITE =================
export const toggleFavourite = async (req, res) => {
  try {
    const { productId } = req.body;

    const existing = await Favourite.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existing) {
      await existing.deleteOne();
      return res.json({ message: "Removed from favourites" });
    }

    const fav = await Favourite.create({
      user: req.user._id,
      product: productId,
    });

    res.status(201).json(fav);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= REMOVE FAVOURITE =================
export const removeFavourite = async (req, res) => {
  try {
    const { productId } = req.params;

    await Favourite.findOneAndDelete({
      user: req.user._id,
      product: productId,
    });

    res.json({ message: "Favourite removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
