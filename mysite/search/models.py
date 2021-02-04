from django.db import models

class SearchHistory(models.Model):
    id = models.IntegerField(primary_key=True)
    content = models.CharField(max_length=100)
    searched_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        template = '{0.id}, {0.content}, {0.searched_at}'
        return template.format(self)