"""This module implements class that represents the custom user entity."""

from django.db import models, IntegrityError, OperationalError, transaction

from group.models import Group


class CustomUser(models.Model):
    """Model for CustomUser entity."""
    nickname = models.CharField()
    created = models.DateTimeField(auto_now_add=True)
    group = models.ForeignKey(Group, on_delete=models.PROTECT)

    def __str__(self):
        """Method that returns route instance as string."""
        return f'User with id {self.id} and nickname {self.nickname}'

    def to_dict(self):
        """Method that returns dict with object's attributes."""
        return {
            'user_id': self.id,
            'nickname': self.nickname,
            'group_id': self.group.id
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
