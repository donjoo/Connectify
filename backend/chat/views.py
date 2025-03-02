from .serializers import RoomSerializer
from rest_framework import viewsets, permissions
from .models import Room
from rest_framework.decorators import action

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticated]


    def perform_create(self, serializer):
        room = serializer.save(creator =self.request.user)
        room.participants.add(self.request.user)


    def get_queryset(self):
        user = self.request.user
        public_rooms = Room.objects.filter(is_private= False)
        private_rooms = Room.objects.filter(
            is_private=True,
            participants=user
        )

        created_rooms = Room.objects.filter(creator=user)

        return (public_rooms | private_rooms | created_rooms).distinct()



    @action(detail=True , methods=['post'])
    def join(self, request, pk=None):

        room = self.get_object()
        user = request.user


        if user in room.participants.all():
            return Response(
                {"detail": "You are already a participant in this room."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if room.is_private and room.creator != user:
            return Response(
                {"detail": "You cannot join this private room."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Add user to participants
        room.participants.add(user)
        return Response(self.get_serializer(room).data)


    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        """
        Endpoint to leave a room: /api/rooms/{id}/leave/
        """
        room = self.get_object()
        user = request.user
        
        # Check if user is a participant
        if user not in room.participants.all():
            return Response(
                {"detail": "You are not a participant in this room."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Creator cannot leave their own room
        if room.creator == user:
            return Response(
                {"detail": "As the creator, you cannot leave your own room. Try deleting it instead."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Remove user from participants
        room.participants.remove(user)
        return Response(self.get_serializer(room).data)
    
    @action(detail=True, methods=['get'])
    def participants(self, request, pk=None):
        """
        Endpoint to get participants of a room: /api/rooms/{id}/participants/
        """
        room = self.get_object()
        participants = room.participants.all()
        
        from users.serializers import UserSerializer
        serializer = UserSerializer(participants, many=True)
        return Response(serializer.data)