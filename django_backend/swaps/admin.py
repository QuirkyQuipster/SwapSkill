from django.contrib import admin
from .models import SwapRequest, SwapRating


@admin.register(SwapRequest)
class SwapRequestAdmin(admin.ModelAdmin):
    list_display = ('requester', 'recipient', 'requested_skill', 'offered_skill', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('requester__email', 'recipient__email', 'requested_skill', 'offered_skill')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(SwapRating)
class SwapRatingAdmin(admin.ModelAdmin):
    list_display = ('rater', 'rated_user', 'rating', 'swap_request', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('rater__email', 'rated_user__email')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',) 