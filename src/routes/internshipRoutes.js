const express = require("express");
const router = express.Router();

const {
  createInternship,
  getInternships,
} = require("../controllers/internshipController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin create internship
router.post("/", protect, adminOnly, createInternship);

// Students view internships
router.get("/", protect, getInternships);

module.exports = router;
