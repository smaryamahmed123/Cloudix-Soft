import User from '../models/User.js';
import jwt from "jsonwebtoken"; // ✅ Add this

export const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.error("❌ No Authorization header");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findById(decoded.id);

    if (!admin || !admin.isAdmin) {
      console.error("❌ User is not admin:", decoded.id);
      return res.status(403).json({ error: "Admin access only" });
    }

    req.adminId = admin._id;
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(403).json({ error: "Invalid token" });
  }
};
