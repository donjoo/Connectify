from django.urls import path
from .views import RegisterView,login
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView




urlpatterns = [
    path("register/",RegisterView.as_view(), name='register'),
    # path("login/",TokenObtainPairView.as_view(),name = 'login'),
    path("login/",login,name = 'login'),
    path("refresh/",TokenRefreshView.as_view(),name='token_refresh'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]



