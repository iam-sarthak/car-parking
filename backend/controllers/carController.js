const Car = require('../models/Car');
const { handleResponse } = require('../utils/responseHandler');

// Create Car
exports.createCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];
    const car = new Car({ userId: req.user.id, title, description, tags, images });
    await car.save();
    return handleResponse(res, 201, 'Car created successfully', car);
  } catch (error) {
    return handleResponse(res, 500, 'Server error', error.message);
  }
};

// List Cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user.id });
    return handleResponse(res, 200, 'Cars fetched successfully', cars);
  } catch (error) {
    return handleResponse(res, 500, 'Server error', error.message);
  }
};

// Other CRUD operations (Get, Update, Delete)...
