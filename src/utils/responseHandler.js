const success = (res, message, data = {}, meta = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta,
  });
};

const error = (res, message, status = 500) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

module.exports = { success, error };