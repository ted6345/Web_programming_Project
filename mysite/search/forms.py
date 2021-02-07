from django import forms
from .models import SearchHistory

class HeroSearchForm(forms.ModelForm):
    class Meta:
        model = SearchHistory
        fields = ('content',)

# class NavSearchForm(forms.ModelForm):
#     class Meta:
#         model = SearchHistory
#         fields = ('content',)