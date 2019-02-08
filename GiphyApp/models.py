from django.db import models
from django.contrib.auth.models import User


class SavedGifs(models.Model):
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User)
    category = models.CharField(max_length=100, default="", null=True)
    gif_path = models.CharField(max_length=100, default="", null=True)
    gif_url = models.CharField(max_length=100, default="", null=True)
