from django.shortcuts import render

from search.models import SearchHistory

CURRENT_USER = 'gilbert'  # 현재 사용자 아이디

def index(request):
    search_history = SearchHistory.objects.filter(searcher_id=CURRENT_USER).order_by('-searched_at')[:5]

    context = {'search_history': search_history}

    return render(request, "home/index.html", context)
