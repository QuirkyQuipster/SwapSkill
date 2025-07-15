from django.contrib import admin
from .models import SwapRequest, SwapRating


admin.site.register(SwapRequest)


@admin.register(SwapRating)
class SwapRatingAdmin(admin.ModelAdmin):
    list_display = ('rater', 'rated_user', 'rating', 'swap_request', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('rater__email', 'rated_user__email')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',) 