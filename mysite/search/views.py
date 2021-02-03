from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from home.forms import SearchForm

from search.models import Search

def index(request):
    if request.method == 'POST':
        form = SearchForm(request.POST)

        if form.is_valid():
            searched_content = form.cleaned_data['search_content']

            lastest = Search.objects.all().order_by('-id')[:1]

            model_search = Search()
            model_search.content = searched_content
            model_search.id = lastest.values_list()[0][0] + 1
            model_search.save()

            return HttpResponseRedirect(reverse('home:search:index'))
    else:
        return render(request, "home/index.html")