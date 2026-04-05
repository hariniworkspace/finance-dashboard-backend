const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const User = require("../models/user.model");

router.get("/", protect, authorizeRoles("admin"), async (req, res) => {
  const users = await User.find().select("-password");

  res.json({
    success: true,
    data: users,
  });
});

router.patch("/:id/role", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const { role } = req.body;

    const allowedRoles = ["admin", "analyst", "viewer"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User role updated",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;