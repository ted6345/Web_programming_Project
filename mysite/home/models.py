from django.db import models

class Member(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)

class Search(models.Model):
    content = models.CharField(max_length=100)
    date = models.DateTimeField()
