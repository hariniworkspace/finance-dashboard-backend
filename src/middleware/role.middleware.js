const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      console.log("ROLE CHECK:", req.user?.role);
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          error: "ACCESS_DENIED",
          message: "You do not have permission to perform this action",
        });
      }

      next();
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "SERVER_ERROR",
        message: "Authorization failed",
      });
    }
  };
};

module.exports = { authorizeRoles };