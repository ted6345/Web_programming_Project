from django import forms
from .models import SearchHistory, ImageHistory

class HeroSearchForm(forms.ModelForm):
    class Meta:
        model = SearchHistory
        fields = ('content',)

class NavSearchForm(forms.ModelForm):
    class Meta:
        model = ImageHistory
        fields = ('image',)