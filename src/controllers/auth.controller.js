const { registerUser, loginUser } = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      ...result,
    });

  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.code || "SERVER_ERROR",
      message: err.message || "Something went wrong",
    });
  }
};


const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    res.json({
      success: true,
      message: "Login successful",
      ...result,
    });

  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.code || "SERVER_ERROR",
      message: err.message || "Something went wrong",
    });
  }
};

module.exports = { register, login };