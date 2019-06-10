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

@csrf_exempt
def new_whit_pics(request):
		"""
		List all code serie, or create a new serie.
		"""
		if request.method == 'GET':
			news = News.objects.all()
			serializer = NewsSerializer(news, many=True)
			i=0
			for obj in serializer.data:
			    serializer.data[i]['media_photos']=get_pic(serializer.data[i]['photos_url'],serializer.data[i]['media_photos'])
			    i+=1			    

			return JSONResponse(serializer.data)
				 		

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
			

"""def get_new_pic(request,pic_url,pic_name):
  
    pic_path= pic_url+pic_name

    im = Image.open(pic_path)       
    
    type = Image.MIME[im.format]
    with open(pic_path, "rb") as imageFile:        
         img_b64 = base64.b64encode(imageFile.read()).decode('utf-8')
    #prefix = 'data:'+type+';base64,'

    img={
        'type':type,
        'data':img_b64,           
    }

    return img_b64
    #return JSONResponse(img)"""

def get_pic(pic_url,pic_name):
  
    pic_path= pic_url+pic_name

    im = Image.open(pic_path)       
    
    type = Image.MIME[im.format]
    with open(pic_path, "rb") as imageFile:        
         img_b64 = base64.b64encode(imageFile.read()).decode('utf-8')

    

    return 'data:'+type+';base64,'+img_b64
