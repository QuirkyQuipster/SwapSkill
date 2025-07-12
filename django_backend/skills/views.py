from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Q
from users.models import User
from .models import Skill, SkillRequest
from .serializers import SkillSerializer, SkillRequestSerializer


class SkillListView(generics.ListAPIView):
    """List all skills with optional filtering."""
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Skill.objects.all()
        
        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        
        # Search by name
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset


class SkillDetailView(generics.RetrieveAPIView):
    """Get specific skill details."""
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Skill.objects.all()


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def available_skills(request):
    """Get users with their available skills."""
    users = User.objects.exclude(id=request.user.id).filter(is_available=True)
    
    # Filter by skill
    skill = request.query_params.get('skill', None)
    if skill:
        users = users.filter(
            Q(skills_offered__icontains=skill) |
            Q(skills_wanted__icontains=skill)
        )
    
    # Filter by location
    location = request.query_params.get('location', None)
    if location:
        users = users.filter(location__icontains=location)
    
    from users.serializers import UserSerializer
    serializer = UserSerializer(users, many=True)
    return Response({'users': serializer.data})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def popular_skills(request):
    """Get popular skills based on user offerings."""
    # Count skills offered by users
    skill_counts = {}
    users = User.objects.filter(is_available=True)
    
    for user in users:
        for skill in user.skills_offered:
            skill_counts[skill] = skill_counts.get(skill, 0) + 1
    
    # Convert to list and sort by count
    popular_skills = [
        {'skill': skill, 'count': count}
        for skill, count in sorted(skill_counts.items(), key=lambda x: x[1], reverse=True)
    ]
    
    return Response({'popular_skills': popular_skills[:10]})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def skill_categories(request):
    """Get skill categories with their skills."""
    categories = Skill.CATEGORY_CHOICES
    category_data = []
    
    for category_code, category_name in categories:
        skills = Skill.objects.filter(category=category_code).values_list('name', flat=True)
        category_data.append({
            'name': category_name,
            'code': category_code,
            'skills': list(skills)
        })
    
    return Response({'categories': category_data})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def request_skill(request):
    """Request a specific skill."""
    skill_name = request.data.get('skill')
    if not skill_name:
        return Response(
            {'error': 'Skill name is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Get or create skill
    skill, created = Skill.objects.get_or_create(name=skill_name)
    
    # Create skill request
    skill_request, created = SkillRequest.objects.get_or_create(
        skill=skill,
        requester=request.user
    )
    
    if not created:
        return Response(
            {'error': 'You have already requested this skill'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    serializer = SkillRequestSerializer(skill_request)
    return Response(serializer.data, status=status.HTTP_201_CREATED) 