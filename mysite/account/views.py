from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
from .models import Account


# Create your views here.
def register(request):  # 회원가입 페이지를 보여주기 위한 함수
    if request.method == "GET":
        return render(request, 'register.html')

    elif request.method == "POST":
        userID = request.POST.get('userID', None)  # 딕셔너리형태
        userPW = request.POST.get('userPW', None)
        re_password = request.POST.get('re_password', None)
        userMail = request.POST.get('userMail', None)
        userPhone = request.POST.get('userPhone', None)
        res_data = {}

        if not (userID and userPW and re_password and userMail and userPhone):
            res_data['error'] = "All values must be entered."
            return render(request, 'register.html', res_data)
        if userPW != re_password:
            # return HttpResponse('비밀번호가 다릅니다.')
            res_data['error'] = 'Confirm password does not match.'
            return render(request, 'register.html', res_data)
        else:
            account = Account(userID=userID, userPW=make_password(userPW), userMail=userMail, userPhone=userPhone)
            account.save()
            return redirect('/login/')
        # register를 요청받으면 register.html 로 응답. return render(request, 'register.html')
        # res_data: html 파일에서 {{error}}와 맵핑되어 처리. 즉, if문에서 걸리면 뒤의 문자열이 출력


def login(request):
    response_data = {}

    if request.method == "GET":
        return render(request, 'login.html')

    elif request.method == "POST":
        if '_login' in request.POST:
            login_userID = request.POST.get('userID', None)
            login_userPW = request.POST.get('userPW', None)

            # 아이디와 PW 중 어느 하나라도 입력되지 않은 경우
            if not (login_userID and login_userPW):
                response_data['error'] = "All values must be entered."

            else:
                account = Account.objects.get(userID=login_userID)
                # db에서 꺼내는 명령. Post로 받아온 userID로 , db의 userID을 꺼내온다.
                if check_password(login_userPW, account.userPW):
                    request.session['account'] = account.userID
                    # 세션도 딕셔너리 변수 사용과 똑같이 사용하면 된다.
                    # 세션 account라는 key에 방금 로그인한 id를 저장한것.
                    return redirect('/')  # 로그인 된 홈 화면 이동
                else:
                    response_data['error'] = "Invalid username or password."
            return render(request, 'login.html', response_data)

        elif '_register' in request.POST:
            return redirect('/login/register/')
