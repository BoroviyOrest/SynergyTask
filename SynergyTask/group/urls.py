"""The module that provide URL configuration for group app."""

from django.urls import re_path, path, include

from .views import GroupView

urlpatterns = [
    re_path('(?P<group_id>\d+)?/?$', GroupView.as_view(), name='group'),
]
