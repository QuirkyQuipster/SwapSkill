from django.urls import path
from . import views

urlpatterns = [
    # Swap requests
    path('', views.SwapRequestListView.as_view(), name='swap-list'),
    path('<int:pk>/', views.SwapRequestDetailView.as_view(), name='swap-detail'),
    path('my-requests/', views.my_swap_requests, name='my-swap-requests'),
    path('<int:pk>/accept/', views.accept_swap_request, name='accept-swap'),
    path('<int:pk>/reject/', views.reject_swap_request, name='reject-swap'),
    path('<int:pk>/complete/', views.complete_swap_request, name='complete-swap'),
    
    # Swap ratings
    path('ratings/', views.SwapRatingListView.as_view(), name='rating-list'),
    path('ratings/<int:pk>/', views.SwapRatingDetailView.as_view(), name='rating-detail'),
] 