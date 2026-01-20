// import express from "express"
// import User from "../models/User.js"
// import generateToken from "../Utils/generateToken.js"

// const router = express.Router()

// // ================= REGISTER =================
// router.post("/register", async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       country,
//       city,
//       address,
//       phone,
//       apartment,
//       postalCode,
//       marketingEmail,
//       saveInfo
//     } = req.body

//     // REQUIRED FIELDS CHECK
//     if (!name || !email || !password || !country || !city || !address || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing"
//       })
//     }

//     const userExists = await User.findOne({ email })
//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists"
//       })
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       country,
//       city,
//       address,
//       phone,
//       apartment,
//       postalCode,
//       marketingEmail,
//       saveInfo
//     })

//     const token = generateToken(user._id)

//     res.status(201).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     })
//   }
// })

// // ================= LOGIN =================
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body

//   const user = await User.findOne({ email })
//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       success: true,
//       token: generateToken(user._id),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     })
//   } else {
//     res.status(401).json({
//       success: false,
//       message: "Invalid email or password"
//     })
//   }
// })

// export default router

import express from "express"
import { registerUser, loginUser, getProfile } from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect, getProfile)

export default router
