from django.db import models
from django.utils import timezone
import uuid 

class Playground(models.Model):
    park_name = models.CharField(max_length=50)
    # address = models.CharField(max_length=100)
    rating = models.IntegerField(default=0)
    # description = models.TextField()
    # created_at = models.DateTimeField(default=timezone.now)
    place_id = models.TextField(default=uuid.uuid4())

    def __str__(self):
        return self.park_name
    
class Review(models.Model):
    playground = models.ForeignKey(Playground,on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(default=0)
    author = models.CharField(max_length=50)
    description = models.TextField()
    # created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.description
