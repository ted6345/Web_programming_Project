from django.contrib import admin

from .models import SearchHistory, ImageHistory


admin.site.register(SearchHistory)
admin.site.register(ImageHistory)