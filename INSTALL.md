# 🚀 Quick Installation Guide for Windows

## Prerequisites
1. **Node.js** - Download from [nodejs.org](https://nodejs.org/)
2. **MongoDB** - Download from [mongodb.com](https://www.mongodb.com/try/download/community)

## Method 1: Automatic Setup (Recommended)

### Step 1: Run Setup Script
Double-click `setup.bat` in your project folder.

### Step 2: Start the Application
1. **Start Backend**: Double-click `start-backend.bat`
2. **Start Frontend**: Double-click `start-frontend.bat` (in a new window)

## Method 2: Manual Setup

### Step 1: Install Backend Dependencies
```cmd
cd backend
npm install
```

### Step 2: Create Environment File
```cmd
copy env.example .env
```

### Step 3: Install Frontend Dependencies
```cmd
cd ..
npm install
```

### Step 4: Start Backend
```cmd
cd backend
npm run dev
```

### Step 5: Start Frontend (New Terminal)
```cmd
npm start
```

## Verify Installation

1. **Backend**: Open http://localhost:5000/api/health
   - Should show: `{"status":"OK","message":"Skill Swap API is running"}`

2. **Frontend**: Open http://localhost:3000
   - Should show the Skill Swap homepage

## Troubleshooting

### If npm is not recognized:
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your computer
3. Try again

### If backend fails to start:
1. Make sure MongoDB is running
2. Check if port 5000 is available
3. Try: `netstat -ano | findstr :5000`

### If frontend fails to start:
1. Check if port 3000 is available
2. Try: `netstat -ano | findstr :3000`

## Database Setup

### Option A: Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Create database: `skillswap`

### Option B: MongoDB Atlas (Free)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` file with your connection string

## Environment Variables

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

## Success! 🎉

Once both servers are running:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

Register a new account and start swapping skills! 