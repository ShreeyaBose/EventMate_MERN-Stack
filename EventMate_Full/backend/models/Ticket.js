const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  seats: { type: Number, default: 1 },
  status: { type: String, enum: ['booked','cancelled'], default: 'booked' },
  ticketNumber: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);