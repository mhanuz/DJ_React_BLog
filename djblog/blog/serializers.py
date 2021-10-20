from django.db import models
from django.db.models import fields
from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from .models import Post,Profile
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password','first_name','last_name','email']
        extra_kwargs={'password':{'write_only':True,'required':True}}

    def create(self, validated_data): # used for override user serializer, to add an extra details 
        user=User.objects.create_user(**validated_data) # we created user instance for create Token and Profile for created or new user  
        Token.objects.create(user=user) # Token for this user instance 
        Profile.objects.create(user=user) # Profile for this user instance
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= Profile
        fields ='__all__'
        read_only_fields=['user']

    def validate(self, attrs):
        attrs['user']=self.context['request'].user
        return attrs

    def to_representation(self, instance):
        response= super().to_representation(instance)
        response['user']=UserSerializer(instance.user).data
        return response

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields='__all__'
        read_only_fields=['user']
        depth = 1
    
    def to_representation(self, instance): # override profileserializer into postserializer
        response= super().to_representation(instance)
        response['user']= ProfileSerializer(instance.user.profile).data
        return response
        
    # In frontend form we have three field title, description, image but Post model has another field user that is one to one field with User model
    # This validator will catch the current username and put it into user
    def validate(self,obj):
        obj['user']=self.context['request'].user
        return obj


