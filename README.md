# WalletIQ

A full-stack budget tracking application built with React, Express, and PostgreSQL. Track your income, expenses, and manage your personal finances with an intuitive interface and AI-powered chatbot assistance.

## Features

- 📊 Track income and expenses
- 💰 Real-time budget overview
- 🔐 User authentication and authorization
- 🤖 AI chatbot for financial assistance
- 📱 Responsive design with Tailwind CSS
- 🔒 Secure password hashing with bcrypt

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **@n8n/chat** - Chatbot integration

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **bcrypt** - Password hashing
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/pradeeshl/BUDGET_TRACKER.git
cd BUDGET_TRACKER
```

2. Install backend dependencies:
```bash
cd back-end
npm install
```

3. Install frontend dependencies:
```bash
cd ../front-end
npm install
```

4. Set up environment variables:

Create a `.env` file in the `back-end` directory:
```env
DATABASE_URL=your_postgresql_connection_string
PORT=3000
```

5. Set up the database:
- Ensure PostgreSQL is running
- Create your database and configure the connection in `back-end/db.js`

## Running the Application

### Development Mode

1. Start the backend server:
```bash
cd back-end
npm run dev
```

2. Start the frontend development server:
```bash
cd front-end
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

### Production Mode

1. Build the frontend:
```bash
cd front-end
npm run build
```

2. Start the backend:
```bash
cd back-end
npm start
```

## Project Structure

```
BUDGET_TRACKER/
├── back-end/
│   ├── Controller/
│   │   └── ClientController.js
│   ├── Routes/
│   │   └── ClientRoutes.js
│   ├── db.js
│   ├── server.js
│   └── package.json
├── front-end/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BudgetTracker.jsx
│   │   │   ├── ChatBot.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## API Endpoints

All API endpoints are prefixed with `/api`

- Authentication routes
- Budget management routes
- Transaction routes


## Author

Pradeesh L

---
