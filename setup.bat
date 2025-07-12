@echo off
echo ========================================
echo Setting up Skill Swap Platform
echo ========================================

echo.
echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    echo Please make sure Node.js is installed
    pause
    exit /b 1
)

echo.
echo Creating environment file...
if not exist .env (
    copy env.example .env
    echo Environment file created
) else (
    echo Environment file already exists
)

echo.
echo Installing frontend dependencies...
cd ..
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the backend:
echo   cd backend
echo   npm run dev
echo.
echo To start the frontend (in a new terminal):
echo   npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
pause 