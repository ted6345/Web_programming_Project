from django.db import models

class SearchHistory(models.Model):
    id = models.IntegerField(primary_key=True)
    content = models.CharField(max_length=100, blank=True, null=True)
    searcher_id = models.CharField(max_length=20)
    searched_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        template = '{0.id}, {0.content}, {0.searcher_id}, {0.searched_at}'
<<<<<<< HEAD
=======
        return template.format(self)

class ImageHistory(models.Model):
    id = models.IntegerField(primary_key=True)
    image = models.CharField(max_length=1000)
    clicker_id = models.CharField(max_length=20)
    clicked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        template = '{0.id}, {0.clicked_image}, {0.clicker_id}, {0.clicked_at}'
>>>>>>> front_end_search_backend
        return template.format(self)