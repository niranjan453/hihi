const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Protected profile route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;
