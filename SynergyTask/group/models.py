"""This module implements class that represents the group entity."""

from django.db import models, OperationalError, transaction


class Group(models.Model):
    """Model for Group entity."""
    name = models.CharField()
    description = models.CharField(default='', blank=True)

    def __str__(self):
        """Method that returns route instance as string."""
        return f'Group with id {self.id} and name {self.name}'

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
