import User from "../models/User.js"
import generateToken from "../Utils/generateToken.js"

// ===== REGISTER =====
export const registerUser = async (req, res) => {
  const {
    name, email, country, address, apartment, city,
    postalCode, phone, password, marketingEmail, saveInfo
  } = req.body

  try {
    console.log("Register request body:", req.body)

    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ success: false, message: "Email already exists" })

    const user = await User.create({
      name, email, country, address, apartment, city,
      postalCode, phone, password, marketingEmail, saveInfo
    })

    console.log("New user created:", user)

    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id)
    })
  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ success: false, message: err.message })
  }
}

// ===== LOGIN =====
export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" })

    const isMatch = await user.matchPassword(password)
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" })

    res.status(200).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id)
    })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ success: false, message: err.message })
  }
}

// ===== PROFILE =====
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })

    res.status(200).json({
      success: true,
      user: {
        id: user._id, name: user.name, email: user.email,
        country: user.country, address: user.address,
        apartment: user.apartment, city: user.city,
        postalCode: user.postalCode, phone: user.phone,
        marketingEmail: user.marketingEmail, saveInfo: user.saveInfo
      }
    })
  } catch (err) {
    console.error("Get profile error:", err)
    res.status(500).json({ success: false, message: err.message })
  }
}
