# Skill Swap - Django Backend

A Django REST API backend for the Skill Swap platform, built with Django REST Framework and JWT authentication.

## Features

- **User Management**: Custom user model with profile management
- **Authentication**: JWT-based authentication with refresh tokens
- **Skills System**: Skill categorization and management
- **Swap Requests**: Request and manage skill swaps between users
- **Rating System**: Rate completed swaps and build reputation
- **Admin Interface**: Full Django admin interface for data management

## Tech Stack

- **Django 4.2.7**: Web framework
- **Django REST Framework 3.14.0**: API framework
- **djangorestframework-simplejwt 5.3.0**: JWT authentication
- **django-cors-headers 4.3.1**: CORS support for frontend
- **Pillow 10.1.0**: Image processing
- **SQLite**: Database (can be changed to PostgreSQL/MySQL)

## Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   cd django_backend
   ```

2. **Run the setup script**:
   ```bash
   setup_django.bat
   ```
   
   Or manually:
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   venv\Scripts\activate.bat
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run migrations
   python manage.py makemigrations
   python manage.py migrate
   
   # Create superuser
   python manage.py createsuperuser
   ```

3. **Start the server**:
   ```bash
   start_django.bat
   ```
   
   Or manually:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/me/` - Get current user

### Users
- `GET /api/users/list/` - List all users
- `GET /api/users/<id>/` - Get specific user
- `GET /api/users/profile/` - Get current user profile
- `PUT /api/users/profile/` - Update current user profile

### Skills
- `GET /api/skills/` - List all skills
- `GET /api/skills/<id>/` - Get specific skill
- `GET /api/skills/available/` - Get users with available skills
- `GET /api/skills/popular/` - Get popular skills
- `GET /api/skills/categories/` - Get skill categories
- `POST /api/skills/request/` - Request a skill

### Swaps
- `GET /api/swaps/` - List user's swap requests
- `POST /api/swaps/` - Create swap request
- `GET /api/swaps/<id>/` - Get specific swap request
- `PUT /api/swaps/<id>/` - Update swap request
- `DELETE /api/swaps/<id>/` - Delete swap request
- `POST /api/swaps/<id>/accept/` - Accept swap request
- `POST /api/swaps/<id>/reject/` - Reject swap request
- `POST /api/swaps/<id>/complete/` - Complete swap request
- `GET /api/swaps/my-requests/` - Get user's swap requests

### Health Check
- `GET /api/health/health/` - Health check endpoint

## Models

### User
- Custom user model extending AbstractUser
- Email as primary identifier
- Skills offered/wanted as JSON fields
- Rating system with average and count
- Profile photo support

### Skill
- Skill categorization system
- Popular skills tracking
- Skill request system

### SwapRequest
- Request/response system for skill swaps
- Status tracking (pending, accepted, rejected, completed)
- Message system for communication

### SwapRating
- Rating system for completed swaps
- Comment system for feedback
- Automatic user rating updates

## Admin Interface

Access the Django admin at `http://localhost:8000/admin/`

Default superuser credentials:
- Username: admin
- Email: admin@skillswap.com
- Password: (set during setup)

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

### Database

Default is SQLite. For production, update `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'skillswap_db',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Development

### Running Tests
```bash
python manage.py test
```

### Creating Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating Superuser
```bash
python manage.py createsuperuser
```

### Shell
```bash
python manage.py shell
```

## API Documentation

The API uses Django REST Framework with automatic documentation. Visit:
- `http://localhost:8000/api/` - API root
- `http://localhost:8000/admin/` - Admin interface

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:3000` (React development server)
- `http://127.0.0.1:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3001`

## Security

- JWT tokens with configurable expiration
- Password validation
- CORS protection
- CSRF protection
- SQL injection protection (Django ORM)

## Deployment

For production deployment:

1. Set `DEBUG = False` in settings.py
2. Use a production database (PostgreSQL recommended)
3. Configure static files serving
4. Set up proper CORS origins
5. Use environment variables for sensitive data
6. Set up HTTPS

## Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `runserver` command
2. **Migration errors**: Delete `db.sqlite3` and run migrations again
3. **Import errors**: Ensure virtual environment is activated
4. **CORS errors**: Check CORS configuration in settings.py

### Logs

Check Django logs in the console output for debugging information.

## Support

For issues and questions, check the main project README or create an issue in the repository. 