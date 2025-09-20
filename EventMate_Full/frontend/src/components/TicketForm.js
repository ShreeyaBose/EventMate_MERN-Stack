import React, { useState } from 'react';
import API from '../services/api';

export default function TicketForm({ eventId, onBooked }) {
  const [form, setForm] = useState({ name: '', email: '', seats: 1 });

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/tickets/book', { event: eventId, ...form });
      alert('Booked successfully!');
      setForm({ name: '', email: '', seats: 1 });
      if (onBooked) onBooked();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="card panel" style={{ padding: '16px', marginTop: '16px' }}>
      <h4 style={{ marginBottom: '16px' }}>Book Ticket</h4>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="form-group">
          <label>Seats</label>
          <input
            name="seats"
            type="number"
            value={form.seats}
            onChange={handleChange}
            min="1"
          />
        </div>
        <button
          type="submit"
          className="btn primary"
          style={{ alignSelf: 'flex-start', marginTop: '10px' }}
        >
          Book
        </button>
      </form>
    </div>
  );
}
