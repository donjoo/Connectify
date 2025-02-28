from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response 
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


    def create(self, request, *args, **kwargs):
        response = super().create(request,*args,**kwargs)
        user = CustomUser.objects.get(email = request.data['email'])
        refresh = RefreshToken.for_user(user)
        return Response({
            "user":response.data,
            "refresh":str(refresh),
            "access":str(refresh.access_token),
        })

@api_view(['POST'])
def login(request):
    data = request.data
    user = authenticate(username= data['username'], password=data['password'])
    if user:
        token = RefreshToken.for_user(user)
        return Response({"access": str(token.access_token), "refresh":str(token)})
    return Response({'error':'Invalid credentials'},status=400)
