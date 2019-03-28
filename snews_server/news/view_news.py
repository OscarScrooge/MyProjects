from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from news.models import News
from news.serializer import NewsSerializer
from PIL import Image
from io import BytesIO
import base64
import re
import os


class JSONResponse(HttpResponse):
	"""
	An HttpResponse that renders its content into JSON.
	"""
	def __init__(self, data, **kwargs):
		content = JSONRenderer().render(data)
		kwargs['content_type'] = 'application/json'
		super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def new_list(request):
		"""
		List all code serie, or create a new serie.
		"""
		if request.method == 'GET':
			news = News.objects.all()
			serializer = NewsSerializer(news, many=True)
			return JSONResponse(serializer.data)

		elif request.method == 'POST':			
			data = JSONParser().parse(request)			
			serializer = NewsSerializer(data=data)			
			if serializer.is_valid():			   
			   serializer.save()
			   saveImage(data['pictureData'],data['photos_url'],data['media_photos'])                
			   return JSONResponse(serializer.data, status=201)
			return JSONResponse(serializer.errors, status=400)  


def saveImage(image_string,url,fileName):
    
    img = Image.open(BytesIO(base64.b64decode(image_string)))    
    img.save(os.path.join(url,fileName))



@csrf_exempt
def new_detail(request, pk):
		"""
		Retrieve, update or delete a serie.
		"""
		try:
			news = News.objects.get(pk=pk)
		except user.DoesNotExist:
			return HttpResponse(status=404)

		if request.method == 'GET':
			serializer = NewsSerializer(news)
			return JSONResponse(serializer.data)

		elif request.method == 'PUT':
			data = JSONParser().parse(request)
			serializer = NewsSerializer(news, data=data)
			if serializer.is_valid():
				serializer.save()
				return JSONResponse(serializer.data)
			return JSONResponse(serializer.errors, status=400)

		elif request.method == 'DELETE':
			news.delete()
			return HttpResponse(status=204)
			
			