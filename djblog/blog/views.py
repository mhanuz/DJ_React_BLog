from django.db.models import query
from django.shortcuts import render
from rest_framework import serializers, viewsets, views
from rest_framework import response
from .models import Post,Profile
from .serializers import PostSerializer,UserSerializer,ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication 
from django.contrib.auth.models import User 
from rest_framework.response import Response


# Create your views here.
class PostView(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated, ] # Must have space after commma
    # authentication_classes = [TokenAuthentication, ] # Must have space after commma
    queryset = Post.objects.all().order_by('-id')
    serializer_class = PostSerializer
    
  
   

class ProfileView(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def get(self,request):
        user = request.user
        pquery=Profile.objects.get(user=user)
        serializer = ProfileSerializer(pquery)
        return Response({"message":"request is get","userdata":serializer.data})

class RegisterView(views.APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'error':False, "message":" update successfully","data":serializer.data})
        return Response({"error":True, "message":"A user with this user name already exists"})


class UserDataUpdate(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self,request):
        user=request.user # We can catch data manually
        data=request.data   

        user_obj=User.objects.get(username=user) # username built in flag
        print(user_obj,"User object")
        user_obj.first_name=data['first_name']
        user_obj.last_name=data['last_name']
        user_obj.email=data['email']
        user_obj.save()
        return Response({"message":"User has been updated"}) # passing the objec{} similar to django context object 

class ProfileUpdate(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self,request):
        try:
            user=request.user
            query=Profile.objects.get(user=user)
            serializer=ProfileSerializer(query,data=request.data, context={'request':request})
            serializer.is_valid()
            serializer.save()
            response_msg={"error":False,"message":"profile is updated"}
        except:
            response_msg={"error":True, "message":"profile is no updated"}
        return Response(response_msg)



