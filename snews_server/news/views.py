from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from news.models import User
from news.serializer import UserSerializer
import os
from io import BytesIO
from base64 import b64decode,b64encode
from PIL import Image
import base64


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
                personal_path=data['user_name'] + data['email']
                makeDirectory(personal_path)
                saveAvatar(personal_path,data['avatar_string'],data['avatar_name'])
                return JSONResponse(serializer.data, status=201)
            return JSONResponse(serializer.errors, status=400)
    
def makeDirectory(personal_path):

            path=os.path.relpath('./news/dusers/'+personal_path)
            exist=os.path.isdir(path)
            if not exist:
                os.makedirs(path,0o777)
                os.makedirs(path+'/avatar',0o777)
                os.makedirs(path+'/content',0o777)

def saveAvatar(personalPath,avatarString,avatarName):
    
    img = Image.open(BytesIO(base64.b64decode(avatarString)))    
    img.save(os.path.join('./news/dusers/'+personalPath+'/avatar',avatarName))                
    

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

@csrf_exempt
def user_account(request,user_name,password):
        """
        Retrieve, update or delete a serie.
        """
        try:                
            users = User.objects.get(user_name=user_name,password=password)
        except user.DoesNotExist:
            return HttpResponse(status=404)

        if request.method == 'GET':
            serializer = UserSerializer(users)
            return JSONResponse(serializer.data)

       
def user_avatar(request,avatar_url,avatar):
  
    avatar_path= avatar_url+'/'+avatar

    im = Image.open(avatar_path)       
    
    type = Image.MIME[im.format]
    with open(avatar_path, "rb") as imageFile:        
         img_b64 = base64.b64encode(imageFile.read()).decode('utf-8')
    #prefix = 'data:'+type+';base64,'

    img={
        'type':type,
        'data':img_b64,           
    }

    return JSONResponse(img)
    #return render(request,'display.html',{'images':[prefix+img_b64]})


            
            