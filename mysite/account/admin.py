from django.contrib import admin

from .models import Account  #같은 경로의 models.py에서 Account라는 클래스를 임포트

# Register your models here.
class AccountAdmin(admin.ModelAdmin):  #admin.ModelAdmin :을 상속받게 되면, admin페이지에서 어떠한 Column을 관리할지 등에 대한 설정이 가능
    #Admin 사이트에서 볼 컬럼 설정
    list_display = ('userID', 'userPhone', 'userMail')

admin.site.register(Account, AccountAdmin) #site에 등록