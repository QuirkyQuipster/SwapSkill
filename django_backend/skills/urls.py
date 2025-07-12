from django.urls import path
from . import views

urlpatterns = [
    # Skills
    path('', views.SkillListView.as_view(), name='skill-list'),
    path('<int:pk>/', views.SkillDetailView.as_view(), name='skill-detail'),
    
    # Skill-related endpoints
    path('available/', views.available_skills, name='available-skills'),
    path('popular/', views.popular_skills, name='popular-skills'),
    path('categories/', views.skill_categories, name='skill-categories'),
    path('request/', views.request_skill, name='request-skill'),
] 