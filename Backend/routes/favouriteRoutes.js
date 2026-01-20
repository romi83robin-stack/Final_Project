import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
  getFavourites,
  toggleFavourite,
  removeFavourite,
} from "../controllers/favouriteController.js"

const router = express.Router()

router.get("/", protect, getFavourites)
router.post("/", protect, toggleFavourite)
router.delete("/:productId", protect, removeFavourite)

export default router
