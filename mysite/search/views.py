from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from .forms import SearchForm
from .models import SearchHistory

def index(request):
    if request.method == 'POST':
        form = SearchForm(request.POST)

        if form.is_valid():
            searched_content = form.cleaned_data['search_content']
            model_search = SearchHistory()
            model_search.content = searched_content

            try:
                lastest = SearchHistory.objects.all().order_by('-id')[:1]
                model_search.id = lastest.values_list()[0][0] + 1
            except IndexError:
                model_search.id = 1
            else:
                model_search.id = lastest.values_list()[0][0] + 1

            model_search.save()
            return HttpResponseRedirect(reverse('home:search:index'))
    else:
        lastest = SearchHistory.objects.all().order_by('-id')[:1]
        return render(request, "search/index.html")