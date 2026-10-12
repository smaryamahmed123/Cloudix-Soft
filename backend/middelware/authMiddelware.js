import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 401 = "we don't know who you are / your login is no good" (frontend logs the user out)
// 403 = "we know who you are, but you're not allowed"
// 500 = our own failure (a DB hiccup must NOT look like a bad token)
export const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      error: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
  }

  try {
    const admin = await User.findById(decoded.id);

    if (!admin) return res.status(401).json({ error: "Account not found" });
    if (!admin.isAdmin) return res.status(403).json({ error: "Admin access only" });

    req.adminId = admin._id;
    next();
  } catch (err) {
    console.error("verifyAdmin DB error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
};