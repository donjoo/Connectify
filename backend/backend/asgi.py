from channels.routing import ProtocolTypeRouter , URLRouter
from channels.auth import AuthMiddlewareStack
from backend.routing import websocket_urlpatterns



application = ProtocolTypeRouter(
    {
        "http":get_agi_application(),
        "websocket":AuthMiddlewareStack(URLRouter(websocket_urlpatterns)),
    }
)