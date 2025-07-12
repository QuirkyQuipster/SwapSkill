# Skill Swap Platform

A full-stack web application for connecting people to swap skills and knowledge.

## Features

- **User Authentication** - Register, login, and profile management
- **Skill Management** - List skills you offer and want to learn
- **User Search** - Find people with specific skills
- **Swap Requests** - Send and manage skill swap requests
- **Rating System** - Rate and review after completed swaps
- **Real-time Updates** - Live notifications and status updates
- **Responsive Design** - Works on desktop and mobile
- **Dark/Light Theme** - Toggle between themes

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `skillswap`

#### Option B: MongoDB Atlas (Recommended)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get your connection string

### 3. Environment Configuration

#### Backend Setup
```bash
cd backend
cp env.example .env
```

Edit `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skillswap
# OR for Atlas: mongodb+srv://username:password@cluster.mongodb.net/skillswap
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

#### Frontend Setup (Optional)
Create `.env` in root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the Application

#### Terminal 1: Backend
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

#### Terminal 2: Frontend
```bash
npm start
```
Frontend will run on: http://localhost:3000

### 5. Verify Setup

1. Backend health check: http://localhost:5000/api/health
2. Frontend: http://localhost:3000
3. Register a new account
4. Create your profile with skills

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/search` - Search users
- `GET /api/users/:userId` - Get user by ID

### Skills
- `GET /api/skills/available` - Get available skills
- `GET /api/skills/popular` - Get popular skills
- `GET /api/skills/categories` - Get skill categories

### Swap Requests
- `POST /api/swaps` - Create swap request
- `GET /api/swaps` - Get user's swap requests
- `PATCH /api/swaps/:id` - Update swap request
- `DELETE /api/swaps/:id` - Delete swap request

## Project Structure

```
SwapSkill/
├── backend/                 # Backend API
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── context/           # React context
│   ├── services/          # API service
│   └── app.jsx            # Main app component
├── public/                # Static files
└── package.json           # Frontend dependencies
```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
npm start    # Starts React development server
```

### Database Management
```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use skillswap

# View collections
show collections

# View users
db.users.find()
```

## Deployment

### Backend Deployment (Heroku)
1. Create Heroku app
2. Add MongoDB Atlas addon
3. Set environment variables
4. Deploy with Git

### Frontend Deployment (Netlify/Vercel)
1. Build the app: `npm run build`
2. Deploy the `build` folder

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with details

---

**Happy Skill Swapping! 🚀** 