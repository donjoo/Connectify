from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id','name','creator','participants','created_at','is_private')

        