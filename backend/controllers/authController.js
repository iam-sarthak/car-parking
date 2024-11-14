const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleResponse } = require('../utils/responseHandler');

// Register User
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return handleResponse(res, 400, 'Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return handleResponse(res, 201, 'User registered successfully');
  } catch (error) {
    return handleResponse(res, 500, 'Server error', error.message);
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return handleResponse(res, 404, 'User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return handleResponse(res, 400, 'Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return handleResponse(res, 200, 'Login successful', { token });
  } catch (error) {
    return handleResponse(res, 500, 'Server error', error.message);
  }
};
