# Expense Tracker Application

A full-stack expense tracking application built with Next.js frontend and Node.js backend.

## Features

- User authentication (login/register)
- Dashboard with expense overview
- Transaction management
- Budget tracking
- Investment tracking
- Goal setting
- Reports and analytics
- Responsive design

## Tech Stack

### Frontend
- Next.js 15
- React 18
- TypeScript
- Chakra UI
- Chart.js
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud)

## Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd expense-tracker
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

### 4. Environment Setup

Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### 5. Start the Application

**Start Backend:**
```bash
cd backend
npm start
```

**Start Frontend (Development):**
```bash
cd frontend
npm run dev
```

**Start Frontend (Production):**
```bash
cd frontend
npm run build  # This creates the .next folder
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start the server
- `npm run dev` - Start with nodemon (if available)

## Project Structure

```
expense-tracker/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utility libraries
│   │   ├── styles/          # CSS modules
│   │   └── utils/           # Utility functions
│   └── package.json
├── backend/                  # Node.js backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── config/              # Configuration files
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Budgets
- `GET /api/budgets` - Get user budgets
- `POST /api/budgets` - Create budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Goals
- `GET /api/goals` - Get user goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

### Investments
- `GET /api/investments` - Get user investments
- `POST /api/investments` - Create investment
- `PUT /api/investments/:id` - Update investment
- `DELETE /api/investments/:id` - Delete investment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues, please create an issue in the repository. 