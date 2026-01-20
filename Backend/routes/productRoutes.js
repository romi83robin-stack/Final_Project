import express from "express";
import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { upload } from "../middleware/cloudinaryUpload.js";

const router = express.Router();

// ADD PRODUCT
router.post("/", upload.array("images", 10), addProduct);

// GET ALL
router.get("/", getProducts);

// GET SINGLE
router.get("/:id", getSingleProduct);

// UPDATE PRODUCT
router.put("/:id", upload.array("images", 10), updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;
