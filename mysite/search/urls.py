from django.urls import path
from . import views

app_name = 'search'

urlpatterns = [
<<<<<<< HEAD
    path('', views.index, name='index'), # /search
    path('history/', views.history, name='history') # /search/history

=======
    path('', views.index, name='index'),
>>>>>>> front_end_search_backend
]