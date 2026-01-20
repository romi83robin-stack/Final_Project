import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// ================= Middleware =================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://YOUR-FRONTEND.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/order", orderRoutes);

// ================= Health Check =================
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

// ================= Error Handler =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// ================= MongoDB Connection =================

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

connectDB();

// ❌ app.listen() REMOVE
// ✅ Vercel ke liye export
export default app;
