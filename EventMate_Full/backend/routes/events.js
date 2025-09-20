const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Event not found' });
    res.json(ev);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST create event
router.post('/', async (req, res) => {
  try {
    const { title, description, date, location, capacity, price } = req.body;
    if (!title || !date) return res.status(400).json({ message: 'title and date required' });
    const ev = new Event({ title, description, date, location, capacity, price });
    const saved = await ev.save();
    res.status(201).json(saved);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PUT update event (reschedule or edit info)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.json(updated);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// DELETE event (and remove tickets)
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Event.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Event not found' });
    // delete related tickets
    await Ticket.deleteMany({ event: req.params.id });
    res.json({ message: 'Event and its tickets removed' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET participants for an event
router.get('/:id/participants', async (req, res) => {
  try {
    const tickets = await Ticket.find({ event: req.params.id, status: 'booked' }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;