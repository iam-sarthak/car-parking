const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
