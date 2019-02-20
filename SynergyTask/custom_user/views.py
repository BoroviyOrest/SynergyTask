"""This module provides base logic for CRUD operations for custom user model."""
import json

from django.http import JsonResponse, HttpResponse
from django.views.generic import View

from group.models import Group
from .models import CustomUser


class CustomUserView(View):
    """Class-based view for custom user model."""

    def get(self, request, user_id):
        """Method for HTTP GET request. Returns JSON with all users"""
        users = CustomUser.get_all_users()
        data = [user.to_dict() for user in users]

        return JsonResponse(data, status=200, safe=False)

    def post(self, request, user_id):
        """Method for HTTP POST request. Returns 200 when user was created or 400 when was not"""
        data = json.loads(request.body)
        if not data:
            return HttpResponse('Empty body', status=400)

        group = Group.get_by_id(group_id=data.get('group_id'))
        user_info = {
            'nickname': data.get('nickname'),
            'group': group
        }

        user = CustomUser.create(**user_info)
        if not user:
            return HttpResponse('Failed to create user', status=400)

        return JsonResponse(user.to_dict(), status=200)

    def put(self, request, user_id=None):
        """Method for HTTP PUT request. Returns 200 when user was updated or 400 when was not"""
        data = json.loads(request.body)
        if not data:
            return HttpResponse('Empty body', status=400)

        if not user_id:
            return HttpResponse('User_id was not received', status=400)

        user = CustomUser.get_by_id(user_id=user_id)
        if not user:
            return HttpResponse('User was not found', status=400)

        group = Group.get_by_id(group_id=data.get('group_id'))
        user_info = {
            'nickname': data.get('nickname'),
            'group': group
        }

        updated = user.update(**user_info)
        if not updated:
            return HttpResponse('Failed to update user', status=400)

        return HttpResponse('User was updated', status=200)

    def delete(self, request, user_id=None):
        """Method for HTTP DELETE request. Returns 200 when user was deleted or 400 when was not"""
        if not user_id:
            return HttpResponse('User_id was not received', status=400)

        deleted = CustomUser.delete_by_id(user_id=user_id)
        if not deleted:
            return HttpResponse('User was not deleted', status=400)

        return HttpResponse('User was deleted', status=200)
