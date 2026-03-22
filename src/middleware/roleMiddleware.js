// Admin OR Super Admin
const isAdmin = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" || req.user.role === "super_admin")
  ) {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};

// ONLY Super Admin
const isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === "super_admin") {
    return next();
  }
  return res.status(403).json({ message: "Super admin access only" });
};

module.exports = { isAdmin, isSuperAdmin };
