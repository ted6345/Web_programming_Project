from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse

from django.views.decorators.csrf import csrf_exempt

from .models import SearchHistory

@csrf_exempt
def index(request):
    CURRENT_USER = request.session.get('account')

    search_data = SearchHistory.objects.all()

    if request.is_ajax():
        if request.method == 'POST':  # Post request
            print("post request from ajax")

            if request.POST.get('search_content',''):
                print("save post")
                request_data = request.POST.get('search_content','')

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
            elif request.POST.get('erase','') == 'ok':
                print("delete post")
                search_datas = SearchHistory.objects.filter(searcher_id = CURRENT_USER)
                search_datas.delete()

                search_history = SearchHistory.objects.filter(searcher_id=CURRENT_USER).order_by('-searched_at').values('content')[:5]
                return JsonResponse(list(search_history), safe=False)

        elif request.method == 'GET':
            print("get request from ajax")
            search_history = SearchHistory.objects.filter(searcher_id=CURRENT_USER).order_by('-searched_at').values('content')[:5]

            return JsonResponse(list(search_history), safe=False)
    else:
        search_history = SearchHistory.objects.filter(searcher_id=CURRENT_USER).order_by('-searched_at')[:5]
        context = {'search_history': search_history}
        return render(request, "home/index.html", context)