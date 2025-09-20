import React, { useEffect, useState } from 'react';

const initial = { title:'', description:'', date:'', location:'', capacity:100, price:0 };

export default function EventForm({ onCreate, editing, onUpdate, cancelEdit }) {
  const [form, setForm] = useState(initial);

  useEffect(()=>{
    if (editing) {
      setForm({
        title: editing.title || '',
        description: editing.description || '',
        date: editing.date ? new Date(editing.date).toISOString().slice(0,10) : '',
        location: editing.location || '',
        capacity: editing.capacity || 100,
        price: editing.price || 0
      });
    } else setForm(initial);
  }, [editing]);

  const handleChange = (e) => setForm(prev=>({...prev, [e.target.name]: e.target.value}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, capacity: Number(form.capacity), price: Number(form.price) };
    if (editing) onUpdate(editing._id, payload);
    else onCreate(payload);
    setForm(initial);
  };

  return (
    <div className="panel card">
      <h3 style={{ marginBottom: '20px' }}>{editing ? 'Edit Event' : 'Create Event'}</h3>
      <form onSubmit={handleSubmit} className="form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="3" />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Capacity</label>
          <input name="capacity" type="number" value={form.capacity} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
        </div>
        <div className="actions" style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <button className="btn primary" type="submit">{editing ? 'Update' : 'Create'}</button>
          {editing && <button type="button" className="btn danger" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}
