from django.urls import path
from . import views

urlpatterns = [
   path('login/',views.login),
   path('login/register/',views.register),
   # 최종적인 url은 127~~~~:8000/login/register
]