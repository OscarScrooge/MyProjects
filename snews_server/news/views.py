from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from news.models import User
from news.serializer import UserSerializer

class JSONResponse(HttpResponse):
	"""
	An HttpResponse that renders its content into JSON.
	"""
	def __init__(self, data, **kwargs):
		content = JSONRenderer().render(data)
		kwargs['content_type'] = 'application/json'
		super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def user_list(request):
		"""
		List all code serie, or create a new serie.
		"""
		if request.method == 'GET':
			users = User.objects.all()
			serializer = UserSerializer(users, many=True)
			return JSONResponse(serializer.data)

		elif request.method == 'POST':
			data = JSONParser().parse(request)
			serializer = UserSerializer(data=data)
			if serializer.is_valid():
				serializer.save()
				return JSONResponse(serializer.data, status=201)
			return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def user_detail(request, pk):
		"""
		Retrieve, update or delete a serie.
		"""
		try:
			users = User.objects.get(pk=pk)
		except user.DoesNotExist:
			return HttpResponse(status=404)

		if request.method == 'GET':
			serializer = UserSerializer(users)
			return JSONResponse(serializer.data)

		elif request.method == 'PUT':
			data = JSONParser().parse(request)
			serializer = UserSerializer(users, data=data)
			if serializer.is_valid():
				serializer.save()
				return JSONResponse(serializer.data)
			return JSONResponse(serializer.errors, status=400)

		elif request.method == 'DELETE':
			users.delete()
			return HttpResponse(status=204)
			
			