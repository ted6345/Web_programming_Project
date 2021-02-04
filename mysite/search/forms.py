from django import forms
from .models import SearchHistory

class SearchForm(forms.ModelForm):
    class Meta:
        model = SearchHistory
        fields = ('content',)