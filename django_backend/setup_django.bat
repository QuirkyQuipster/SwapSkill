@echo off
echo Setting up Django Backend for Skill Swap...

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing requirements...
pip install -r requirements.txt

echo Running migrations...
python manage.py makemigrations
python manage.py migrate

echo Creating superuser...
python manage.py createsuperuser --noinput --username admin --email admin@skillswap.com

echo Setup complete! Run 'start_django.bat' to start the server.
pause 