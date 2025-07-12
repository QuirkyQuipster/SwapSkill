from django.db import models
from users.models import User


class Skill(models.Model):
    """Skill model for categorizing and managing skills."""
    
    CATEGORY_CHOICES = [
        ('technology', 'Technology'),
        ('design', 'Design'),
        ('creative', 'Creative'),
        ('languages', 'Languages'),
        ('business', 'Business'),
        ('health', 'Health & Wellness'),
        ('sports', 'Sports & Fitness'),
        ('cooking', 'Cooking'),
        ('music', 'Music'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']


class SkillRequest(models.Model):
    """Model for tracking skill requests and popularity."""
    
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='requests')
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skill_requests')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['skill', 'requester']
        ordering = ['-created_at'] 