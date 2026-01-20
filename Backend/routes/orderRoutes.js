import express from "express";
import { checkout } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ named import

const router = express.Router();

// ================= Checkout Route =================
router.post("/checkout", protect, checkout);

export default router;
