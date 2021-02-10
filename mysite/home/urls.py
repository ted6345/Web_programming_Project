from django.urls import path, include
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.index, name='index'), # /
    path('', include('account.urls')),
    path('search/', include('search.urls')), # /search
]