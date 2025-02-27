from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response 

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


    def create(self, request, *args, **kwargs):
        respone = super().create(request,*args,**kwargs)
        user = CustomUser.objects.get(email = request.data['email'])
        refresh = RefreshToken.for_user(user)
        return Response({
            "user":response.data,
            "refresh":str(refresh),
            "access":str(refresh.access_token),
        })
