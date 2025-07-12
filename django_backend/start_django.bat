@echo off
echo Starting Django Backend...

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Starting Django development server...
python manage.py runserver 0.0.0.0:8000

pause 