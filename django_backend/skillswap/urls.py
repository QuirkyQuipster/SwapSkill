"""
URL configuration for skillswap project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('api/auth/', include('users.urls')),
    path('api/users/', include('users.urls')),
    path('api/skills/', include('skills.urls')),
    path('swaps/', include('swaps.urls')),
    path('api/health/', include('users.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 