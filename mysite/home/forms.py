from django import forms

class SearchForm(forms.Form):
    search_content = forms.CharField(max_length=100)