from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse

from django.views.decorators.csrf import csrf_exempt

from .forms import HeroSearchForm

from .models import SearchHistory

CURRENT_USER = 'gilbert'  # 현재 사용자 아이디

@csrf_exempt
def index(request):
    search_data = SearchHistory.objects.all()

    if request.is_ajax():
        if request.method == 'POST':  # Post request
            print("post request from ajax")
            request_data = request.POST['search_content']

            try:
                lastest = SearchHistory.objects.all().order_by('-id')[:1]
                new_id = lastest.values_list()[0][0] + 1
            except IndexError:
                new_id = 1
            else:
                new_id = lastest.values_list()[0][0] + 1

            search_datas = SearchHistory(searcher_id = CURRENT_USER, content = request_data, id = new_id)

            search_datas.save()

            return HttpResponse("Data is saved")
            # return render(request, "search/index.html")

        elif request.method == 'GET':
            print("get request from ajax")
            search_history = SearchHistory.objects.filter(searcher_id=CURRENT_USER).order_by('-searched_at').values('content')[:5]

            return JsonResponse(list(search_history), safe=False)
    else:
        print("requst isn't from ajax")
        search_history = SearchHistory.objects.filter(searcher_id=CURRENT_USER).order_by('-searched_at')[:5]
        context = {'search_history': search_history}
        return render(request, "search/index.html", context)