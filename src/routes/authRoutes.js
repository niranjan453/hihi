const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// password management
router.put("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;
