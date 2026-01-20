import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: String,
  address: String,
  apartment: String,
  city: String,
  postalCode: String,
  phone: String,
  password: { type: String, required: true },
  marketingEmail: { type: Boolean, default: false },
  saveInfo: { type: Boolean, default: false },
});

// ===== HASH PASSWORD BEFORE SAVE =====
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// ===== COMPARE PASSWORD =====
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
