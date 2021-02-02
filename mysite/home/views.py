from django.shortcuts import render

def index(request): # request는 필수 인자
    return render(request, 'home/index.html')