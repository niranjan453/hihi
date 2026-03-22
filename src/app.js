const express = require("express");
const cors = require("cors")
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


const app = express();
app.use(cors())
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/dashboard", dashboardRoutes);



app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

module.exports = app;
