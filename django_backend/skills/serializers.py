from rest_framework import serializers
from .models import Skill, SkillRequest
from users.serializers import UserSerializer


class SkillSerializer(serializers.ModelSerializer):
    """Serializer for Skill model."""
    
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'description', 'created_at', 'updated_at']


class SkillRequestSerializer(serializers.ModelSerializer):
    """Serializer for SkillRequest model."""
    requester = UserSerializer(read_only=True)
    skill = SkillSerializer(read_only=True)
    
    class Meta:
        model = SkillRequest
        fields = ['id', 'skill', 'requester', 'created_at'] 