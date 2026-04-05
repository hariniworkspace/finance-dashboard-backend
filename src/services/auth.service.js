const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = async (data) => {
  const { name, email, password } = data;

  
  if (!name || !email || !password) {
    const err = new Error("Name, email and password are required");
    err.statusCode = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const err = new Error("Invalid email format");
    err.statusCode = 400;
    err.code = "INVALID_EMAIL";
    throw err;
  }

  
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error("An account with this email already exists");
    err.statusCode = 400;
    err.code = "USER_EXISTS";
    throw err;
  }

  
  const user = await User.create({
    name,
    email,
    password,
    role: "viewer", 
  });

  return {
    user: sanitizeUser(user),
    token: generateToken(user),
  };
};



const loginUser = async (data) => {
  const { email, password } = data;

  
  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.statusCode = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  
  if (user.status !== "active") {
    const err = new Error("Account is inactive");
    err.statusCode = 403;
    err.code = "ACCOUNT_INACTIVE";
    throw err;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  return {
    user: sanitizeUser(user),
    token: generateToken(user),
  };
};



const sanitizeUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

module.exports = { registerUser, loginUser };