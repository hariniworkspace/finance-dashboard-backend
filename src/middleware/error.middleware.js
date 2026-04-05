const errorHandler = (err, req, res, next) => {
  console.log("🔥 FULL ERROR OBJECT:");
  console.log(err); 
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;
