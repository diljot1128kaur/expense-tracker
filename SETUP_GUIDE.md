# Setup Guide for Expense Tracker

## After uploading to GitHub:

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
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

### 4. Create Environment Files

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

## Troubleshooting

### If you get permission errors:
1. Close any IDEs or terminals that might be using the files
2. Run the cleanup.bat script as administrator
3. Or manually delete the node_modules folders

### If npm install fails:
1. Clear npm cache: `npm cache clean --force`
2. Delete package-lock.json files
3. Try installing again

### If TypeScript errors appear:
1. Make sure all dependencies are installed
2. Check that tsconfig.json is properly configured
3. Restart your IDE/editor

## Project Structure
```
expense-tracker/
├── frontend/          # Next.js frontend
├── backend/           # Node.js backend
├── .gitignore         # Git ignore rules
├── README.md          # Project documentation
├── SETUP_GUIDE.md     # This file
└── cleanup.bat        # Cleanup script
``` 