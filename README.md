# Skill Swap Platform

A beautiful skill exchange platform built with React frontend and Django backend, featuring modern UI design with a stunning color palette from Coolors.

## 🌟 Features

### Frontend (React)
- **Beautiful Modern UI** with gradient backgrounds and glass morphism effects
- **Responsive Design** that works on all devices
- **Dark/Light Theme** toggle with smooth transitions
- **Demo Mode** - works without backend using mock data
- **Real-time Updates** when backend is connected
- **Interactive Components** with hover effects and animations

### Backend (Django)
- **RESTful API** with Django REST Framework
- **JWT Authentication** for secure user sessions
- **Custom User Model** with profile management
- **Skill Management** with categorization
- **Swap Request System** with status tracking
- **Rating System** for completed swaps
- **Admin Interface** for data management

## 🎨 Design

The frontend features a beautiful color palette from Coolors:
- **Primary**: Dark Blue-Gray (#2D3047)
- **Secondary**: Emerald Green (#419D78)
- **Accent**: Warm Orange (#E0A458)
- **Background**: Gradient from Blue to Purple to Pink
- **Glass Effects**: Translucent cards with backdrop blur
- **Animations**: Smooth transitions and hover effects

## 🚀 Quick Start

### Prerequisites
- Node.js (for frontend)
- Python 3.8+ (for backend)
- npm or yarn

### Frontend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

The frontend will run at `http://localhost:3000`

### Backend Setup (Django)

1. **Navigate to Django backend**:
   ```bash
   cd django_backend
   ```

2. **Run setup script**:
   ```bash
   setup_django.bat
   ```

3. **Start Django server**:
   ```bash
   start_django.bat
   ```

The API will be available at `http://localhost:8000/api/`

## 📁 Project Structure

```
SwapSkill/
├── src/                    # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── context/          # React context
│   ├── services/         # API services
│   └── index.css         # Beautiful styling
├── django_backend/        # Django backend
│   ├── skillswap/        # Django project
│   ├── users/            # User management app
│   ├── skills/           # Skills app
│   ├── swaps/            # Swaps app
│   └── requirements.txt  # Python dependencies
├── public/               # Static files
└── README.md            # This file
```

## 🎯 Core Features

### User Management
- Registration and login with JWT tokens
- Profile management with skills and bio
- User search and filtering
- Rating system for reputation

### Skills System
- Browse available skills
- Search by skill category
- Popular skills tracking
- Skill request system

### Swap Requests
- Send swap requests to other users
- Accept/reject incoming requests
- Track request status (pending, accepted, completed)
- Rate completed swaps

### Beautiful UI Components
- **Glass Cards**: Translucent cards with backdrop blur
- **Gradient Buttons**: Beautiful gradient buttons with hover effects
- **Animated Loading**: Smooth loading spinners
- **Responsive Navigation**: Mobile-friendly navigation
- **Theme Toggle**: Dark/light mode with smooth transitions

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/me/` - Get current user

### Users
- `GET /api/users/list/` - List all users
- `GET /api/users/<id>/` - Get specific user
- `PUT /api/users/profile/` - Update profile

### Skills
- `GET /api/skills/available/` - Get users with skills
- `GET /api/skills/popular/` - Get popular skills
- `GET /api/skills/categories/` - Get skill categories

### Swaps
- `GET /api/swaps/` - List swap requests
- `POST /api/swaps/` - Create swap request
- `PUT /api/swaps/<id>/` - Update swap request
- `POST /api/swaps/<id>/accept/` - Accept request
- `POST /api/swaps/<id>/reject/` - Reject request

## 🎨 UI Components

### Glass Morphism Cards
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Gradient Buttons
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  transition: all 0.3s ease;
}
```

### Beautiful Animations
```css
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```

## 🚀 Demo Mode

The frontend works in **demo mode** without the backend:
- Uses mock data for all features
- Shows a demo banner
- All functionality works interactively
- Perfect for showcasing the UI

## 🔧 Development

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Backend Development
```bash
cd django_backend

# Activate virtual environment
venv\Scripts\activate.bat

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start server
python manage.py runserver
```

## 🎯 Key Features

### Beautiful Design
- **Modern Color Palette**: Carefully selected colors from Coolors
- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Beautiful gradient backgrounds
- **Smooth Animations**: CSS animations and transitions
- **Responsive Design**: Works on all screen sizes

### Full Functionality
- **User Authentication**: JWT-based authentication
- **Profile Management**: Complete user profiles
- **Skill Browsing**: Search and filter skills
- **Swap Requests**: Send and manage swap requests
- **Rating System**: Rate completed swaps
- **Admin Interface**: Django admin for data management

### Demo Mode
- **Works Without Backend**: Full functionality with mock data
- **Interactive Demo**: All features work in demo mode
- **Easy Setup**: No backend required to see the UI
- **Realistic Data**: Comprehensive mock data

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Beautiful animations and effects

### Backend
- **Django 4.2**: Python web framework
- **Django REST Framework**: API framework
- **JWT Authentication**: Secure token-based auth
- **SQLite**: Database (can be PostgreSQL/MySQL)

## 🎨 Color Palette

The design uses a beautiful color palette from Coolors:
- **Primary**: #2D3047 (Dark Blue-Gray)
- **Secondary**: #419D78 (Emerald Green)
- **Accent**: #E0A458 (Warm Orange)
- **Light**: #F7F7F7 (Off White)
- **Dark**: #1A1A2E (Deep Navy)

## 📱 Responsive Design

The platform is fully responsive:
- **Mobile**: Optimized for phones
- **Tablet**: Perfect for tablets
- **Desktop**: Full desktop experience
- **Touch Friendly**: Touch-optimized interactions

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the build folder to your hosting service
```

### Backend Deployment
```bash
cd django_backend
python manage.py collectstatic
# Deploy to your Django hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation in each folder
- Review the API endpoints
- Test the demo mode first
- Check the console for errors

---

**Skill Swap Platform** - Where learning meets community with beautiful design! 🎨✨ 