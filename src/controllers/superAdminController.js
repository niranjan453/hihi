const User = require("../models/User");

// SUPER ADMIN: make someone admin
const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already admin" });
    }

    user.role = "admin";
    await user.save();

    res.json({
      message: "User promoted to admin",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SUPER ADMIN: remove admin rights
const removeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ message: "User is not an admin" });
    }

    user.role = "student";
    await user.save();

    res.json({
      message: "Admin rights removed",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { makeAdmin, removeAdmin };
