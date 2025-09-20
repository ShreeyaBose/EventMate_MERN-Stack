# EventMate - MERN (Mini)

EventMate is a simple Event Management & Ticket Booking app (MERN stack).
Features:
1. Create event
2. Read events & participants
3. Update event (reschedule/edit)
4. Delete event & cancel bookings
5. Book tickets, view ticket details, cancel booking

## Setup (after extracting the zip)

### Prerequisites
- Node.js (v14+)
- MongoDB (local) or MongoDB Atlas

### Run backend
cd EventMate_Full/backend
npm install
# create .env from .env.example
# .env example:
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/eventmate
npm run dev   # (requires nodemon) or npm start

### Run frontend (in separate terminal)
cd EventMate_Full/frontend
npm install
npm start

App will be available at http://localhost:3000 and backend on http://localhost:5000

## API endpoints overview
- GET /api/events
- GET /api/events/:id
- POST /api/events
- PUT /api/events/:id
- DELETE /api/events/:id
- GET /api/events/:id/participants
- POST /api/tickets/book
- GET /api/tickets
- GET /api/tickets/:id
- DELETE /api/tickets/:id (cancel)

## Troubleshooting
- If frontend asks about browserslist, say Y or add browserslist entry to package.json (it's already included).
- If MongoDB not running, start with `mongod` or use Atlas connection string in .env.