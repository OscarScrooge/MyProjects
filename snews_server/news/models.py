# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Comments(models.Model):
    id_who_comment = models.ForeignKey('User', models.DO_NOTHING, db_column='id_who_comment')
    comment = models.CharField(max_length=255)
    media_photo = models.CharField(max_length=255, blank=True, null=True)
    media_video = models.CharField(max_length=255, blank=True, null=True)
    on_create = models.DateTimeField(auto_now_add=True, null=True)
    on_update = models.DateTimeField(auto_now=True, null=True)
    id_new = models.ForeignKey('News', models.DO_NOTHING, db_column='id_new')

    class Meta:
        managed = False
        db_table = 'comments'


class News(models.Model):
    new = models.CharField(max_length=255)
    media_photos = models.CharField(max_length=1000, blank=True, null=True)
    media_videos = models.CharField(max_length=255, blank=True, null=True)
    id_user = models.ForeignKey('User', models.DO_NOTHING, db_column='id_user')
    on_create = models.DateTimeField(auto_now_add=True, null=True)
    on_update = models.DateTimeField(auto_now=True, null=True)
    photos_url = models.CharField(max_length=255, blank=True, null=True)
    videos_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'news'


class User(models.Model):
    user_name = models.CharField(unique=True, max_length=255)
    email = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    avatar = models.CharField(max_length=255, blank=True, null=True)
    on_create = models.DateTimeField(auto_now_add=True, null=True)
    on_update = models.DateTimeField(auto_now=True, null=True)
    avatar_url = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'user'
