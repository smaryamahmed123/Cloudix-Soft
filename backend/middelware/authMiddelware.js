export const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findById(decoded.id);

    if (!admin || !admin.isAdmin) {
      return res.status(403).json({ error: "Admin access only" });
    }

    req.adminId = admin._id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
