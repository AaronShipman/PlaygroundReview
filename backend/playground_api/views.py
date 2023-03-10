from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .serializers import PlaygroundSerializer
from .models import Playground, Review
import requests
import json
from .serializers import PlaygroundSerializer
# from .serializers import ReviewSerializer
from rest_framework import viewsets

GOOGLE_API_KEY='AIzaSyB35KSLs9BcgUGOOugXSXSdJWdJLuKUlOs'

class PlaygroundView(APIView):

    def get(self, request, pk=None):
        if pk:  
            data = Playground.objects.get(pk=pk)
            serializer = PlaygroundSerializer(data)
        else:
            # data = Playground.objects.all()
            # serializer = PlaygroundSerializer(data, many=True)
            latitude = request.query_params.get('lat')
            longitude = request.query_params.get('lon')
            url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latitude},{longitude}&radius=2000&type=park&keyword=playground&key={GOOGLE_API_KEY}"

            payload={}
            headers = {}

            response = requests.request("GET", url, headers=headers, data=payload)

            print(response.text)

        return Response({"result": response.json()})

    def post(self, request):
        playground = request.data
        serializer = PlaygroundSerializer(data=playground)
        if serializer.is_valid(raise_exception=True):
            playground_saved = serializer.save()
        return Response({"result": f"{playground_saved.park_name} saved"})

    def put(self, request, pk):
        saved_playground = get_object_or_404(Playground.objects.all(), pk=pk)
        data = request.data
        serializer = PlaygroundSerializer(instance=saved_playground, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            saved_playground = serializer.save()
        return Response({"result": f"{saved_playground.park_name} updated"})

    def delete(self, request, pk):
        playground = get_object_or_404(Playground.objects.all(), pk=pk)
        playground.delete()
        return Response({"result": f"Playground id {pk} deleted"},status=204)
    
# class PlaygroundViewSet(viewsets.ModelViewSet):
#     queryset = Playground.objects.all()
#     serializer_class = PlaygroundSerializer

# class ReviewViewSet(viewsets.ModelViewSet):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
   
        
        

