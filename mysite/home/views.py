from django.shortcuts import render, redirect

from search.models import SearchHistory

def index(request):
    CURRENT_USER = request.session.get('account')

    search_history = SearchHistory.objects.filter(searcher_id=CURRENT_USER).order_by('-searched_at')[:5]

    context = {'search_history': search_history}

    # 로그인 버튼 설정
    if request.method == "GET":
        if CURRENT_USER:
            context = {'log_sign': "logout", 'search_history': search_history}
            return render(request, 'home/index.html', context)
        else:
            context = {'log_sign': "login", 'search_history': search_history}
            return render(request, 'home/index.html', context)
    elif request.method == "POST":
        if '_login' in request.POST:
            return redirect('/login/')
        elif '_logout' in request.POST:
            request.session.pop('account')
            return render(request, 'home/index.html')