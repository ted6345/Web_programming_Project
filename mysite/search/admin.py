from django.contrib import admin

<<<<<<< HEAD
from .models import SearchHistory

admin.site.register(SearchHistory)
=======
from .models import SearchHistory, ImageHistory


admin.site.register(SearchHistory)
admin.site.register(ImageHistory)
>>>>>>> front_end_search_backend
