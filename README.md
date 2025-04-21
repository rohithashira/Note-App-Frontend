# Note-App-Frontend
# Simple Notes App

A full-stack notes application with authentication, rate limiting, and Redux-based state management.

## Features

- JWT-based authentication
- Create, read, update, and delete notes
- Rate limiting (10 requests per minute)
- Redux state management
- Modern UI with Tailwind CSS

## Project Structure

```
simple-notes-app/
├── backend/           # Node.js + Express backend
│   ├── src/
│   │   ├── config/   # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/    # Database models
│   │   ├── routes/    # API routes
│   │   └── server.js  # Entry point
│   └── package.json
│
└── frontend/         # React frontend
    ├── src/
    │   ├── components/ # React components
    │   ├── features/   # Redux slices
    │   ├── pages/      # Page components
    │   ├── services/   # API services
    │   └── App.tsx     # Root component
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user

### Notes
- GET /api/notes - Get all notes
- POST /api/notes - Create a new note
- PUT /api/notes/:id - Update a note
- DELETE /api/notes/:id - Delete a note

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- express-rate-limit for rate limiting

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- TypeScript
- React Router 
