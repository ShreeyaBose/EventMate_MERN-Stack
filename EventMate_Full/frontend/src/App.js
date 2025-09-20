import React, { useEffect, useState } from 'react';
import API from './services/api';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import EventDetail from './components/EventDetail';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editing, setEditing] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async (data) => {
    try {
      const res = await API.post('/events', data);
      setEvents(prev => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      alert('Failed to create event');
    }
  };

  const updateEvent = async (id, data) => {
    try {
      const res = await API.put(`/events/${id}`, data);
      setEvents(prev => prev.map(e => e._id === id ? res.data : e));
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update');
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await API.delete(`/events/${id}`);
      setEvents(prev => prev.filter(e => e._id !== id));
      if (selectedEvent && selectedEvent._id === id) setSelectedEvent(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>♥ — EventMate — ♥</h1>
        <p>Event Management & Ticket Booking</p>
      </header>
      <div className="main">
        <div className="left">
          <div className="card">
            <EventForm onCreate={createEvent} editing={editing} onUpdate={updateEvent} cancelEdit={() => setEditing(null)} />
          </div>
          <div className="card">
            <EventList events={events} loading={loading} onSelect={setSelectedEvent} onEdit={e => setEditing(e)} onDelete={deleteEvent} />
          </div>
        </div>
        <div className="right">
          <div className="card">
            {selectedEvent ? <EventDetail event={selectedEvent} onBooked={() => fetchEvents()} /> : <p>Select an event to view details & book tickets</p>}
          </div>
        </div>
      </div>
      <footer><small>♥ — EventMate — ♥</small></footer>
    </div>
  );
}

export default App;
