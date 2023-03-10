from django.urls import path
from . import views

urlpatterns = [
    path('', views.PlaygroundView.as_view(), name='playground_list'),
    path('<int:pk>', views.PlaygroundView.as_view(), name='playground-detail'),
]