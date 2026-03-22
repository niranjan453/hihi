const jwt = require("jsonwebtoken");
const User = require("../models/User");

//
// Protect Route (JWT required)
//
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

//
// Admin Only Middleware
//
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (req.user.role !== "admin" && req.user.role !== "super_admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};
