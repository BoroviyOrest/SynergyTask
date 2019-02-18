"""This module implements class that represents the custom user entity."""

from django.db import models, IntegrityError, OperationalError, transaction

from group.models import Group


class CustomUser(models.Model):
    """Model for CustomUser entity."""
    nickname = models.CharField(max_length=20)
    created = models.DateTimeField(auto_now_add=True)
    group = models.ForeignKey(Group, on_delete=models.PROTECT, null=True, related_name='groups')

    def __str__(self):
        """Method that returns custom_user instance as string."""
        return f'User {self.id} with {self.nickname}'

    def to_dict(self):
        """Method that returns dict with object's attributes."""
        return {
            'user_id': self.id,
            'nickname': self.nickname,
            'group_id': self.group_id
        }

    @classmethod
    def create(cls, nickname, group=None):
        """Method for object creation."""
        user = cls()

        try:
            user.nickname = nickname
            user.group = group
            user.save()
            return user
        except (ValueError, IntegrityError, OperationalError):
            return None

    def update(self, nickname, group):
        """Update object parameters."""
        with transaction.atomic():
            if nickname:
                self.nickname = nickname

            if group:
                self.group = group

            try:
                self.save()
            except (ValueError, IntegrityError, OperationalError):
                return False

        return True

    @classmethod
    def delete_by_id(cls, user_id):
        """Delete user object, found by id."""
        try:
            user = cls.objects.get(id=user_id)
            user.delete()
            return True
        except (ValueError, cls.DoesNotExist, OperationalError):
            return False

    @classmethod
    def get_by_id(cls, user_id):
        """Returns custom user instance by user_id."""
        try:
            return cls.objects.get(id=user_id)
        except (ValueError, cls.DoesNotExist, OperationalError):
            return None

    @classmethod
    def get_all_users(cls):
        """Return all users"""
        try:
            return cls.objects.all()
        except OperationalError:
            return []
