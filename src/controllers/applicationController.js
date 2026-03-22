const Application = require("../models/Application");
const Internship = require("../models/Internship");
const { sendEmail } = require("../services/emailService");

//
// STUDENT: Apply for internship
//
const applyInternship = async (req, res) => {
  try {
    const { internshipId } = req.body;

    if (!internshipId) {
      return res.status(400).json({ message: "Internship ID required" });
    }

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    // Prevent duplicate application
    const alreadyApplied = await Application.findOne({
      student: req.user._id,
      internship: internshipId,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "Already applied for this internship" });
    }

    const application = await Application.create({
      student: req.user._id,
      internship: internshipId,
      status: "pending",
      isActive: false,
    });

    // Send confirmation email
    await sendEmail({
      to: req.user.email,
      subject: "Internship Application Submitted",
      text: `Your application for "${internship.title}" has been submitted successfully.\n\nStatus: Pending review.`,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
// ADMIN: View all applications
//
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student", "name email role")
      .populate("internship", "title domain totalSeats filledSeats");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
// ADMIN: Approve or Reject application (Seat-Limit Enabled)
//
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be approved or rejected" });
    }

    const application = await Application.findById(req.params.id)
      .populate("student", "email name")
      .populate("internship");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const internship = await Internship.findById(
      application.internship._id
    );

    // If approving
    if (status === "approved") {
      if (internship.filledSeats >= internship.totalSeats) {
        return res
          .status(400)
          .json({ message: "Seats are full for this internship" });
      }

      // Increase seat count only if not already approved
      if (application.status !== "approved") {
        internship.filledSeats += 1;
        await internship.save();
      }

      application.status = "approved";
      application.isActive = true;
    }

    // If rejecting
    if (status === "rejected") {
      // If previously approved, reduce seat count
      if (application.status === "approved") {
        internship.filledSeats -= 1;
        await internship.save();
      }

      application.status = "rejected";
      application.isActive = false;
    }

    await application.save();

    // Send approval/rejection email
    await sendEmail({
      to: application.student.email,
      subject: `Application ${status}`,
      text:
        status === "approved"
          ? `Congratulations ${application.student.name}! Your application for "${internship.title}" has been approved.`
          : `Hello ${application.student.name}, your application for "${internship.title}" was rejected.`,
    });

    res.json({
      message: `Application ${status} successfully`,
      application,
      seats: {
        total: internship.totalSeats,
        filled: internship.filledSeats,
        remaining: internship.totalSeats - internship.filledSeats,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyInternship,
  getAllApplications,
  updateApplicationStatus,
};
