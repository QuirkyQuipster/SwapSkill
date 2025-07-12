from django.contrib import admin
from .models import Skill, SkillRequest


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'description')
    ordering = ('name',)


@admin.register(SkillRequest)
class SkillRequestAdmin(admin.ModelAdmin):
    list_display = ('skill', 'requester', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('skill__name', 'requester__email')
    ordering = ('-created_at',) 