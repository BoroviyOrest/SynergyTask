"""This module provides showing Group model in admin panel."""
from django.contrib import admin

from .models import Group

admin.site.register(Group)
