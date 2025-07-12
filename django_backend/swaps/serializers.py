from rest_framework import serializers
from .models import SwapRequest, SwapRating
from users.serializers import UserSerializer


class SwapRequestSerializer(serializers.ModelSerializer):
    """Serializer for SwapRequest model."""
    requester = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    
    class Meta:
        model = SwapRequest
        fields = [
            'id', 'requester', 'recipient', 'requested_skill', 'offered_skill',
            'message', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'requester', 'created_at', 'updated_at']


class SwapRequestCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating swap requests."""
    
    class Meta:
        model = SwapRequest
        fields = ['recipient', 'requested_skill', 'offered_skill', 'message']


class SwapRequestUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating swap request status."""
    
    class Meta:
        model = SwapRequest
        fields = ['status']


class SwapRatingSerializer(serializers.ModelSerializer):
    """Serializer for SwapRating model."""
    rater = UserSerializer(read_only=True)
    rated_user = UserSerializer(read_only=True)
    
    class Meta:
        model = SwapRating
        fields = ['id', 'swap_request', 'rater', 'rated_user', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'rater', 'created_at']


class SwapRatingCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating swap ratings."""
    
    class Meta:
        model = SwapRating
        fields = ['swap_request', 'rated_user', 'rating', 'comment'] 