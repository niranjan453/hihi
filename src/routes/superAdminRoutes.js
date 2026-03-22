const express = require("express");
const { makeAdmin, removeAdmin } = require("../controllers/superAdminController");
const { protect } = require("../middleware/authMiddleware");
const { isSuperAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

// promote user to admin
router.put("/make-admin/:userId", protect, isSuperAdmin, makeAdmin);

// demote admin to student
router.put("/remove-admin/:userId", protect, isSuperAdmin, removeAdmin);

module.exports = router;
