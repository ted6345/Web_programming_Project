from django.urls import path, include
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.index, name='index'), # /
    path('search/', include('search.urls')), # /search
]