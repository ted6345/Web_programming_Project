from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from .forms import SearchForm
from .models import SearchHistory

CURRENT_USER = 'gilbert'  # 현재 사용자 아이디

def index(request):
    if request.method == 'POST': # Post request
        form = SearchForm(request.POST, request.FILES)
        print(form)
        if form.is_valid():
            post = form.save(commit=False)

            post.content = form.data['search_content']

            post.searcher_id = CURRENT_USER

            try:
                lastest = SearchHistory.objects.all().order_by('-id')[:1]
                post.id = lastest.values_list()[0][0] + 1
            except IndexError:
                post.id = 1
            else:
                post.id = lastest.values_list()[0][0] + 1

            post.save()

            return HttpResponseRedirect(reverse('home:search:index'))
        else:
            print("form is not valid")
            return render(request, "search/index.html")

    else: # Get request, ...
        return render(request, "search/index.html")

def history(request):
    search_history = SearchHistory.objects.filter(searcher_id=CURRENT_USER).order_by('-searched_at')[:5]

    context= {'search_history' : search_history}

    return render(request, "search/history.html", context)