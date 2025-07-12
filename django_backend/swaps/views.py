from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q
from .models import SwapRequest, SwapRating
from .serializers import (
    SwapRequestSerializer, SwapRequestCreateSerializer, SwapRequestUpdateSerializer,
    SwapRatingSerializer, SwapRatingCreateSerializer
)


class SwapRequestListView(generics.ListCreateAPIView):
    """List and create swap requests."""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return SwapRequestCreateSerializer
        return SwapRequestSerializer
    
    def get_queryset(self):
        user = self.request.user
        return SwapRequest.objects.filter(
            Q(requester=user) | Q(recipient=user)
        )
    
    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)


class SwapRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, and delete specific swap request."""
    serializer_class = SwapRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return SwapRequest.objects.filter(
            Q(requester=user) | Q(recipient=user)
        )
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return SwapRequestUpdateSerializer
        return SwapRequestSerializer


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_swap_requests(request):
    """Get current user's swap requests."""
    user = request.user
    
    # Get requests sent by user
    sent_requests = SwapRequest.objects.filter(requester=user)
    sent_serializer = SwapRequestSerializer(sent_requests, many=True)
    
    # Get requests received by user
    received_requests = SwapRequest.objects.filter(recipient=user)
    received_serializer = SwapRequestSerializer(received_requests, many=True)
    
    return Response({
        'sent_requests': sent_serializer.data,
        'received_requests': received_serializer.data
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def accept_swap_request(request, pk):
    """Accept a swap request."""
    try:
        swap_request = SwapRequest.objects.get(
            id=pk, 
            recipient=request.user, 
            status='pending'
        )
        swap_request.status = 'accepted'
        swap_request.save()
        return Response({'message': 'Swap request accepted'})
    except SwapRequest.DoesNotExist:
        return Response(
            {'error': 'Swap request not found or cannot be accepted'}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def reject_swap_request(request, pk):
    """Reject a swap request."""
    try:
        swap_request = SwapRequest.objects.get(
            id=pk, 
            recipient=request.user, 
            status='pending'
        )
        swap_request.status = 'rejected'
        swap_request.save()
        return Response({'message': 'Swap request rejected'})
    except SwapRequest.DoesNotExist:
        return Response(
            {'error': 'Swap request not found or cannot be rejected'}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def complete_swap_request(request, pk):
    """Mark a swap request as completed."""
    try:
        swap_request = SwapRequest.objects.get(
            id=pk, 
            status='accepted',
            requester=request.user
        )
        swap_request.status = 'completed'
        swap_request.save()
        return Response({'message': 'Swap request marked as completed'})
    except SwapRequest.DoesNotExist:
        return Response(
            {'error': 'Swap request not found or cannot be completed'}, 
            status=status.HTTP_404_NOT_FOUND
        )


class SwapRatingListView(generics.ListCreateAPIView):
    """List and create swap ratings."""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return SwapRatingCreateSerializer
        return SwapRatingSerializer
    
    def get_queryset(self):
        return SwapRating.objects.filter(rater=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(rater=self.request.user)


class SwapRatingDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, and delete specific swap rating."""
    serializer_class = SwapRatingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return SwapRating.objects.filter(rater=self.request.user) 