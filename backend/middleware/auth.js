const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Access denied. No token provided.');

  const token = authHeader.split(' ')[1]; // Extract the token part
  if (!token) return res.status(401).send('Access denied. Token not found.');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send('Token has expired.');
    }
    return res.status(400).send('Invalid token.');
  }
};

module.exports = auth;