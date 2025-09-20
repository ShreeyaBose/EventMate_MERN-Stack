import React from 'react';

export default function EventList({ events, loading, onSelect, onEdit, onDelete }) {
  if (loading) return <p>Loading events...</p>;
  if (!events.length) return <p>No events yet. Create one!</p>;

  return (
    <div className="panel card">
      <h3 style={{ marginBottom: '16px' }}>Events</h3>
      <ul className="list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map(ev => (
          <li key={ev._id} className="event-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', background: '#f9f7ff', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <div style={{ cursor: 'pointer' }} onClick={() => onSelect(ev)}>
              <strong style={{ fontSize: '1.1rem' }}>{ev.title}</strong>
              <div className="meta" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {new Date(ev.date).toLocaleDateString()} — {ev.location || 'Online'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn small primary" onClick={() => onSelect(ev)}>View</button>
              <button className="btn small primary" onClick={() => onEdit(ev)}>Edit</button>
              <button className="btn small danger" onClick={() => onDelete(ev._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
