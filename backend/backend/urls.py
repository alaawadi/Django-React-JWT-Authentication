from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('', include('pages.urls')),
    path('oauth/', include('social_django.urls', namespace='social')),
]
