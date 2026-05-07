# Attendance Backend API

## Tech Stack
- Node.js
- Express.js
- MongoDB

## Setup Instructions

1. Make sure MongoDB is installed and running on your system
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Or start the production server:
   ```bash
   npm start
   ```

## API Endpoints

### POST /api/punch-in
Punch in API that records attendance data.

**Request Body:**
```json
{
  "userId": "user123",
  "email": "user@example.com",
  "workMode": "WFH" // or "WFO"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Punch in successful",
  "data": {
    "_id": "678...",
    "userId": "user123",
    "email": "user@example.com",
    "workMode": "WFH",
    "punchInTime": "2026-01-21T12:00:00.000Z",
    "date": "2026-01-21T00:00:00.000Z"
  }
}
```

### GET /api/attendance
Get all attendance records.

### GET /api/attendance/user/:userId
Get attendance records for a specific user.

## Database Schema

**Attendance Collection:**
- userId (String, required)
- email (String, required)
- workMode (String, enum: ['WFH', 'WFO'], required)
- punchInTime (Date, default: current timestamp)
- date (Date, default: today's date at 00:00:00)

## Features
- Prevents duplicate punches for the same user on the same day
- Validates work mode (WFH/WFO)
- Stores timestamps and dates automatically
- CORS enabled for frontend integration