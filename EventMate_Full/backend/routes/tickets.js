const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

// Helper to count booked seats for an event
async function countBookedSeats(eventId) {
  const tickets = await Ticket.find({ event: eventId, status: 'booked' });
  return tickets.reduce((s,t)=> s + (t.seats || 0), 0);
}

// POST book ticket
router.post('/book', async (req, res) => {
  try {
    const { event: eventId, name, email, seats } = req.body;
    if (!eventId || !name || !email) return res.status(400).json({ message: 'event, name and email required' });
    const ev = await Event.findById(eventId);
    if (!ev) return res.status(404).json({ message: 'Event not found' });

    const bookedSeats = await countBookedSeats(eventId);
    const seatsToBook = Number(seats) || 1;
    if (bookedSeats + seatsToBook > ev.capacity) return res.status(400).json({ message: 'Not enough seats available' });

    const ticketNumber = 'TKT-' + Date.now().toString(36) + Math.floor(Math.random()*900 + 100).toString();
    const ticket = new Ticket({ event: eventId, name, email, seats: seatsToBook, ticketNumber });
    const saved = await ticket.save();
    res.status(201).json(saved);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET all tickets (admin)
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('event').sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET ticket details
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('event');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// DELETE / cancel booking (soft-cancel)
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    ticket.status = 'cancelled';
    await ticket.save();
    res.json({ message: 'Ticket cancelled' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;