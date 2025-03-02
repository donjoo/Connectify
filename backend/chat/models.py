from django.db import models
from users.models import CustomUser



class Room(models.Model):
    name = models.CharField(max_length=255,unique=True)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_rooms')
    participants = models.ManyToManyField(CustomUser, related_name='joined_rooms',blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_private = models.BooleanField(default=False)



    def __str__(self):
        return self.name






