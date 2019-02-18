"""This module implements class that represents the group entity."""

from django.db import models, OperationalError, transaction


class Group(models.Model):
    """Model for Group entity."""
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=256, default='', blank=True)

    def __str__(self):
        """Method that returns group instance as string."""
        return f'Group {self.id} with name {self.name}'

    def to_dict(self):
        """Method that returns dict with object's attributes."""
        return {
            'group_id': self.id,
            'name': self.name,
            'description': self.description
        }

    @classmethod
    def create(cls, name, description=None):
        """Method for object creation."""
        group = cls()
        group.description = description if description is not None else ''

        try:
            group.name = name
            group.save()
            return group
        except (ValueError, OperationalError):
            return None

    def update(self, name, description):
        """Update object parameters."""
        with transaction.atomic():
            if name:
                self.name = name

            if description:
                self.description = description

            try:
                self.save()
            except (ValueError, OperationalError):
                return False

        return True

    @classmethod
    def delete_by_id(cls, group_id):
        """Delete group object, found by id."""
        try:
            group = cls.objects.get(id=group_id)
            group.delete()
            return True
        except (ValueError, cls.DoesNotExist, OperationalError):
            return False

    @classmethod
    def get_by_id(cls, group_id):
        """Returns group instance by group_id."""
        try:
            return cls.objects.get(id=group_id)
        except (ValueError, cls.DoesNotExist, OperationalError):
            return None

    @classmethod
    def get_all_groups(cls):
        """Return all groups"""
        try:
            return cls.objects.all()
        except (cls.DoesNotExist, OperationalError):
            return []
