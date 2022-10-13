from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('notes/', views.getNotes),
    path('notes1/', views.getNotes1),
    path('codes/', views.getCodes),
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signupapi/',views.RegisterAPI.as_view()),
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),

    path('login/', views.LoginView.as_view()),
    path('user/', views.UserView.as_view()),
    path('logoutt/', views.LogoutView.as_view()),
]
