"""This module provides showing CustomUser model in admin panel."""
from django.contrib import admin

from .models import CustomUser

admin.site.register(CustomUser)
