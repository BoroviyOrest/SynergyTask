"""This module provides base logic for CRUD operations for group model."""
import json

from django.http import JsonResponse, HttpResponse
from django.views.generic import View

from .models import Group


class GroupView(View):
    """Class-based view for group model."""

    def get(self, request, group_id):
        """Method for HTTP GET request. Returns JSON with all groups"""
        groups = Group.get_all_groups()
        data = [group.to_dict() for group in groups]

        return JsonResponse(data, status=200, safe=False)

    def post(self, request, group_id):
        """Method for HTTP POST request. Returns 200 when group was created or 400 when was not"""
        data = json.loads(request.body)
        if not data:
            return HttpResponse('Empty body', status=400)

        group_info = {
            'name': data.get('name'),
            'description': data.get('description')
        }

        group = Group.create(**group_info)
        if not group:
            return HttpResponse('Failed to create group', status=400)

        return JsonResponse(group.to_dict(), status=200)

    def put(self, request, group_id=None):
        """Method for HTTP PUT request. Returns 200 when group was updated or 400 when was not"""
        data = json.loads(request.body)
        if not data:
            return HttpResponse('Empty body', status=400)

        if not group_id:
            return HttpResponse('Group_id was not received', status=400)

        group = Group.get_by_id(group_id=group_id)
        if not group:
            return HttpResponse('Group was not found', status=400)

        group_info = {
            'name': data.get('name'),
            'description': data.get('description')
        }

        updated = group.update(**group_info)
        if not updated:
            return HttpResponse('Failed to update group', status=400)

        return HttpResponse('Group was updated', status=200)

    def delete(self, request, group_id=None):
        """Method for HTTP DELETE request. Returns 200 when group was deleted or 400 when was not"""
        if not group_id:
            return HttpResponse('Group_id was not received', status=400)

        deleted = Group.delete_by_id(group_id=group_id)
        if not deleted:
            return HttpResponse('Group was not deleted', status=400)

        return HttpResponse('Group was deleted', status=200)
