from django.conf.urls import url
from news import views
from news import view_news
from news import view_comments

urlpatterns = [
    url(r'^user/$', views.user_list),
    url(r'^user/(?P<pk>[0-9]+)/$', views.user_detail),     
    url(r'^avatar/(?P<avatar_url>[\SA-Za-z0-9]+)/(?P<avatar>[\SA-Za-z0-9]+)/$', views.user_avatar),
    url(r'^user/account/(?P<user_name>[\SA-Za-z0-9]+)/(?P<password>[\SA-Za-z0-9]+)/$', views.user_account),     


    url(r'^new/$', view_news.new_list),
    url(r'^new/list/$', view_news.new_whit_pics),
    url(r'^new/(?P<pk>[0-9]+)/$', view_news.new_detail),


    url(r'^comment/$', view_comments.comment_list),
    url(r'^comment/(?P<pk>[0-9]+)/$', view_comments.comment_detail),
    url(r'^comment/by/new/id/(?P<id_new>[0-9]+)/$', view_comments.comments_byNewId),


]
