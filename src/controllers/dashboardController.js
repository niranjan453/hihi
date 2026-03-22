const Application = require("../models/Application");

// STUDENT DASHBOARD
const getStudentDashboard = async (req, res) => {
  try {
    const application = await Application.findOne({
      student: req.user._id,
    }).populate("internship", "title domain description duration");

    // student has not applied yet
    if (!application) {
      return res.json({
        hasApplied: false,
        status: "not_applied",
        isActive: false,
        message: "You have not applied for any internship yet",
      });
    }

    // student applied but not approved
    if (!application.isActive) {
      return res.json({
        hasApplied: true,
        status: application.status, // pending / rejected
        isActive: false,
        internship: application.internship,
        message:
          application.status === "pending"
            ? "Your application is under review"
            : "Your application was rejected",
      });
    }

    // approved student
    res.json({
      hasApplied: true,
      status: "approved",
      isActive: true,
      internship: application.internship,
      message: "Welcome to your internship dashboard",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStudentDashboard };
