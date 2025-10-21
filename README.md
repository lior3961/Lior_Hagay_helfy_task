# Task Manager App

A full-stack task management application built with React, Express.js, and Node.js. 

## 🚀 Features

-  Create, Read, Update, and Delete tasks
-  **Endless animated carousel** for task display (smooth infinite scrolling)
-  Toggle task completion status
-  Priority levels (Low, Medium, High) classification
-  Filter tasks by status
-  In-memory data storage

## 📋 Tech

### Frontend
- React 18
- Vanilla CSS (no frameworks)
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- CORS middleware
- In-memory data storage (array)


## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The server will run on **http://localhost:4000**

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The app will open automatically in your browser at **http://localhost:3000**

## 🔌 API Endpoints

### Base URL: `http://localhost:4000/api/tasks`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/toggle` | Toggle task completion status |

### Task Model

```javascript
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  priority: 'low' | 'medium' | 'high'
}
```

## 👤 Author

**Lior Hagay**
