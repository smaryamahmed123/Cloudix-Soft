import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// Compared against when the email doesn't exist, so "unknown email" and
// "wrong password" take the same time and give the same answer.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // Reject objects like { "$ne": null } (NoSQL injection) and empty values
    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.trim() });

    // Google-only accounts may have no password at all, so guard before comparing
    const passwordOk = await bcrypt.compare(password, user?.password || DUMMY_HASH);

    if (!user || !user.password || !passwordOk) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Only reveal "not an admin" AFTER the password was correct
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Admin access only" });
    }

    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Also check utils/generateToken.js: the token must have an expiry, e.g.
//   jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
// and routes/authRoutes.js should use the limiter:  router.post("/login", loginLimiter, loginUser);