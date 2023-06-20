from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Project, Profile, Image

class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProfileSerializer(ModelSerializer):
    followers = serializers.SerializerMethodField()

    def get_followers(self, obj):
        followers = obj.followers.all()
        return [follower.id for follower in followers]

    class Meta:
        model = Profile
        fields = '__all__'

class userSerializers(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'