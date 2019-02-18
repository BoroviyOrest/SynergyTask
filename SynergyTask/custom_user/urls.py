"""The module that provide URL configuration for custom_user app."""

from django.urls import re_path, path, include

from .views import CustomUserView

urlpatterns = [
    re_path('(?P<user_id>\d+)?/?$', CustomUserView.as_view(), name='user'),
]
