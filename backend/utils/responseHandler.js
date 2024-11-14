exports.handleResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({ message, data });
  };
  