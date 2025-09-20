import React from 'react';
import API from '../services/api';

export default function TicketList({ tickets, onChange }) {
  const cancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await API.delete(`/tickets/${id}`);
      alert('Cancelled');
      if (onChange) onChange();
    } catch (err) {
      console.error(err);
      alert('Cancel failed');
    }
  };

  if (!tickets.length) return <p>No participants yet.</p>;

  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0 }}>
      {tickets.map((t) => (
        <li
          key={t._id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '8px',
            background: '#f3f0ff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}
        >
          <div>
            <strong>{t.name}</strong> — {t.email} — Seats: {t.seats} — #{t.ticketNumber}
          </div>
          <div>
            <button className="btn small danger" onClick={() => cancel(t._id)}>
              Cancel
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
