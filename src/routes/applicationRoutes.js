const express = require("express");
const {
  applyInternship,
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

// student applies
router.post("/apply", protect, applyInternship);

// admin views all applications
router.get("/", protect, isAdmin, getAllApplications);

// admin approve / reject
router.put("/:id", protect, isAdmin, updateApplicationStatus);

module.exports = router;
