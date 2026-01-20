import mongoose from "mongoose";
import Favourite from "./Favourite.js";
import Cart from "./CartModel.js"; // 🔹 Add this

const productSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    price: { type: Number, required: true },
    mainCategory: { 
      type: String, 
      required: true,
      enum: ["STITCHED", "UNSTITCHED", "SHAWLS", "ESSEMBLES", "DUPATTAS", "FORMALS", "SUMMER", "VELVET", "WINTER"]
    },
    subCategory: { 
      type: String, 
      enum: ["FORMALS", "SUMMER", "VELVET", "WINTER", "ALL", ""],
      default: "ALL"
    },
    // Keep category for backward compatibility (deprecated)
    category: { type: String },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    sizes: [
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL"],
      },
    ],

    mainImageIndex: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

/**
 * 🔥 AUTO DELETE FAVOURITES & CART ITEMS WHEN PRODUCT IS DELETED
 */
productSchema.pre(
  "findOneAndDelete",
  async function (next) {
    const productId = this.getQuery()._id;

    // Delete related favourites
    await Favourite.deleteMany({ product: productId });

    // Delete related cart items
    await Cart.deleteMany({ product: productId });

    // next();
  }
);

export default mongoose.model("Product", productSchema);



// import mongoose from "mongoose";
// import Favourite from "./Favourite.js";

// const productSchema = new mongoose.Schema(
//   {
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },

//     images: [
//       {
//         type: String,
//         required: true,
//       },
//     ],

//     sizes: [
//       {
//         type: String,
//         enum: ["XS", "S", "M", "L", "XL"],
//       },
//     ],

//     mainImageIndex: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// /**
//  * 🔥 AUTO DELETE FAVOURITES WHEN PRODUCT IS DELETED
//  */
// productSchema.pre(
//   "findOneAndDelete",
//   async function (next) {
//     const productId = this.getQuery()._id;

//     await Favourite.deleteMany({ product: productId });
//     next();
//   }
// );

// export default mongoose.model("Product", productSchema);
