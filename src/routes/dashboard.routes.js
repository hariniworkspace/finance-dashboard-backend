const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const { getDashboard } = require("../controllers/dashboard.controller");

//for analyst and admin
router.get("/", protect, authorizeRoles("viewer", "analyst", "admin"), getDashboard);

module.exports = router;