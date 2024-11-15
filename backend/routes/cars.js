const express = require('express');
const Car = require('../models/car.js');
const auth = require('../middleware/auth.js');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.array('images', 10), async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files.map(file => file.path);
  
  const car = new Car({
    userId: req.user.id,
    title,
    description,
    tags: tags ? tags.split(',') : [], 
    images
  });

  await car.save();
  res.status(201).json(car);
});

router.get('/', auth, async (req, res) => {
  const cars = await Car.find({ userId: req.user.id });
  res.json(cars);
});

router.get('/search', auth, async (req, res) => {
  const { keyword } = req.query;
  const cars = await Car.find({
    userId: req.user.id,
    $or: [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { tags: { $regex: keyword, $options: 'i' } }
    ]
  });
  res.json(cars);
});

router.get('/:id', auth, async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).send('Car not found');
  res.json(car);
});

router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files ? req.files.map(file => file.path) : undefined;

  const updatedFields = { title, description, tags: tags ? tags.split(',') : [] };
  if (images) updatedFields.images = images;

  const updatedCar = await Car.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
  if (!updatedCar) return res.status(404).send('Car not found');
  res.json(updatedCar);
});

router.delete('/:id', auth, async (req, res) => {
  const deletedCar = await Car.findByIdAndDelete(req.params.id);
  if (!deletedCar) return res.status(404).send('Car not found');
  res.send('Car deleted');
});

module.exports = router;
