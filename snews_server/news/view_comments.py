from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from news.models import Comments
from news.serializer import CommentsSerializer


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def comment_list(request):
        """
        List all code serie, or create a new serie.
        """
        if request.method == 'GET':
            comments = Comments.objects.all()
            serializer = CommentsSerializer(comments, many=True)
            return JSONResponse(serializer.data)

        elif request.method == 'POST':            
            data = JSONParser().parse(request)            
            serializer = CommentsSerializer(data=data)            
            if serializer.is_valid():               
               serializer.save()                
               return JSONResponse(serializer.data, status=201)
            return JSONResponse(serializer.errors, status=400)  

@csrf_exempt
def comment_detail(request, pk):
        """
        Retrieve, update or delete a serie.
        """
        try:
            comments = Comments.objects.get(pk=pk)
        except user.DoesNotExist:
            return HttpResponse(status=404)

        if request.method == 'GET':
            serializer = CommentsSerializer(comments)
            return JSONResponse(serializer.data)

        elif request.method == 'PUT':
            data = JSONParser().parse(request)
            serializer = CommentsSerializer(comments, data=data)
            if serializer.is_valid():
                serializer.save()
                return JSONResponse(serializer.data)
            return JSONResponse(serializer.errors, status=400)

        elif request.method == 'DELETE':
            comments.delete()
            return HttpResponse(status=204)

@csrf_exempt
def comments_byNewId(request,id_new):


        try:        	
            comments = Comments.objects.filter(id_new=id_new)
        except comments.DoesNotExist:
            return HttpResponse(status=404)

        if request.method == 'GET':
            serializer = CommentsSerializer(comments,many=True)
            return JSONResponse(serializer.data)            