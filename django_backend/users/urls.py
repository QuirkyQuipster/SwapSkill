from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_redirect, name='home'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile_view, name='profile'),
    path('browse/', views.browse_skills, name='browse_skills'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
] 