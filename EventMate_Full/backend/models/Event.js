const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  date: { type: Date, required: true },
  location: { type: String, default: '' },
  capacity: { type: Number, default: 100 },
  price: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);