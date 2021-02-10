from django.db import models

# Create your models here.
class Account(models.Model): #장고에서 제공하는 models.Model를 상속
    userID = models.CharField(max_length=64,verbose_name = 'ID')
    userPW = models.CharField(max_length=64, verbose_name='PW')
    userPhone = models.IntegerField(verbose_name='Phone')
    userMail = models.CharField(max_length=64, verbose_name='Email')
    #저장되는 시점의 시간을 자동으로 삽입
    registered_dttm = models.DateTimeField(auto_now_add=True, verbose_name='등록시간')
    # verbose_name : 나중에 admin(관리자)페이지에서 보여지는 이름

    def __str__(self):  # 이 함수 추가
        return self.userID  # User object 대신 나타낼 문자

    class Meta:  # 메타 클래스를 이용하여 테이블명 지정
        db_table = 'test_user'