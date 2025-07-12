@echo off
echo Setting up Skill Swap Platform...

echo.
echo ========================================
echo Installing Frontend Dependencies
echo ========================================
npm install

echo.
echo ========================================
echo Setting up Django Backend
echo ========================================
cd django_backend
setup_django.bat
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Frontend: npm start
echo 2. Backend: start-backend.bat
echo.
echo The frontend will work in demo mode without the backend.
echo.
pause 