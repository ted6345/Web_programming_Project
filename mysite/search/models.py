from django.db import models

class Search(models.Model):
    id = models.IntegerField(primary_key=True)
    content = models.CharField(max_length=100)
    # date = models.DateTimeField()

    def __str__(self):
        return self.content