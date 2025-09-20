import React, { useEffect, useState } from 'react';
import API from '../services/api';
import TicketForm from './TicketForm';
import TicketList from './TicketList';

export default function EventDetail({ event, onBooked }) {
  const [participants, setParticipants] = useState([]);

  const fetchParticipants = async () => {
    try {
      const res = await API.get(`/events/${event._id}/participants`);
      setParticipants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (event) fetchParticipants();
  }, [event]);

  if (!event) return null;

  return (
    <div className="panel card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '12px' }}>{event.title}</h3>
      {event.description && <p>{event.description}</p>}
      
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location || 'Online'}</p>
      <p><strong>Price:</strong> ₹{Number(event.price).toFixed(2)} | <strong>Capacity:</strong> {event.capacity}</p>
      
      <div style={{ marginTop: '12px' }}>
        <TicketForm eventId={event._id} onBooked={() => { fetchParticipants(); if (onBooked) onBooked(); }} />
      </div>

      <h4 style={{ marginTop: '20px' }}>Participants ({participants.length})</h4>
      <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '8px' }}>
        <TicketList tickets={participants} onChange={fetchParticipants} />
      </div>
    </div>
  );
}
