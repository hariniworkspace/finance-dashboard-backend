const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const dashboardRoutes = require("./routes/dashboard.routes");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors()); // ✅ IMPORTANT for deployment

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/records", require("./routes/record.routes"));
app.use("/api/dashboard", dashboardRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Error Middleware (ALWAYS LAST)
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});