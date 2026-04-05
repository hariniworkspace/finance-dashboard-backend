const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

const { register, login } = require("../controllers/auth.controller");

// register
router.post("/register", validate(registerSchema), register);

// login
router.post("/login", validate(loginSchema), login);

module.exports = router;