const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const events = require('./routes/events');
const tickets = require('./routes/tickets');
const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not set. Copy .env.example to .env and set it.');
  process.exit(1);
}

connectDB(MONGO_URI);

app.use('/api/events', events);
app.use('/api/tickets', tickets);

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html')));
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));