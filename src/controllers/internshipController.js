const Internship = require("../models/Internship");

//
// ADMIN: Create Internship
//
const createInternship = async (req, res) => {
  try {
    const { title, description, domain, duration, totalSeats } = req.body;

    if (!title || !description || !domain || !duration || !totalSeats) {
      return res.status(400).json({ message: "All fields required" });
    }

    const internship = await Internship.create({
      title,
      description,
      domain,
      duration,
      totalSeats,
      createdBy: req.user._id,
    });

    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
// STUDENT: Get All Internships
//
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find();

    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInternship,
  getInternships,
};
