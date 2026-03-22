const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/dashboard", protect, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin 👑",
    admin: req.user,
  });
});

module.exports = router;
