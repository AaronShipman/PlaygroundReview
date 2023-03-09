from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
# from playground_api.views import PlaygroundViewSet,ReviewViewSet

# router = routers.DefaultRouter()
# router.register(r'playgrounds', PlaygroundViewSet)
# router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('playground_api/', include('playground_api.urls')),
    # path('accounts/', include("accounts.urls")),
]
# urlpatterns = [
#   path('', include(router.urls)),
# ]
