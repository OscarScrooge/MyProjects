from django.conf.urls import url
from news import views


urlpatterns = [
    url(r'^user/$', views.user_list),
    url(r'^user/(?P<pk>[0-9]+)/$', views.user_detail),
]
