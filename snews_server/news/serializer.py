from rest_framework import serializers
from news.models import User,Comments,News


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','user_name','avatar','avatar_url','email')

class NewsSerializer(serializers.ModelSerializer):
	class Meta:
		model = News
		fields = '__all__'

class CommentsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comments
		fields = '__all__'