const express = require("express");
const { getStudentDashboard } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// student dashboard
router.get("/student", protect, getStudentDashboard);

module.exports = router;
