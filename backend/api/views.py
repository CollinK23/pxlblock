from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .models import Project, Profile, Image
from .serializers import ProjectSerializer, ProfileSerializer, userSerializers, ImageSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib import auth
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


User = get_user_model()
# Create your views here.


# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         {
#             'Endpoint': '/',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns an array of projects'
#         },
#         {
#             'Endpoint': '/discover',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns an array of projects'
#         },
#         {
#             'Endpoint': '/hire',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns an array of profiles'
#         },
#         {
#             'Endpoint': '/jobs',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns an array of Jobs'
#         },
#         {
#             'Endpoint': '/jobs/id',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns a single job'
#         },
#         {
#             'Endpoint': '/id',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns a single user'
#         },
#     ]

#     return Response(routes)


#returns list of all projects
class ProjectList(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    
#returns list of projects that user follows
@api_view(['Get'])
def getFollowedProjects(request):
    following = request.user.profile.follows.all()
    projects = Project.objects.filter(user__profile__in=following)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

#returns all profiles
@api_view(['GET'])
def getProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

#returns specified profile and all of its projects
@api_view(['GET'])
def getProfileAndProjects(request, username):
    profile = Profile.objects.get(username=username)
    projects = profile.work.all()
    serializer = ProfileSerializer(profile)
    serializer2 = ProjectSerializer(projects, many=True)
    data = {
        'profiles': serializer.data,
        'projects': serializer2.data
    }
    return Response(data)

#returns specified project
@api_view(['GET'])
def getProject(request, username, pk):
    profile = Profile.objects.get(username=username)
    project = profile.work.get(id=pk)
    images = project.images.all()
    serializer = ProfileSerializer(profile)
    serializer2 = ImageSerializer(images, many=True)
    data = {
        'profile': serializer.data,
        'project': serializer2.data
    }
    return Response(data)

#gets all images
@api_view(['GET'])
def getImages(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)

#follows specified user
@api_view(['POST'])
def userFollow(request, username, *args, **kwargs):
    currentUser = request.user
    toFollowUser = User.objects.filter(username=username)
    other = toFollowUser.first()
    profile = other.profile
    data = {}
    try:
        data = request.data
    except:
        Response({"error": "profile does not exist"})
    action = data.get("action")
    if action == "follow":
        currentUser.profile.follows.add(profile)
    elif action == "unfollow":
        currentUser.profile.follows.remove(profile)
    else:
        pass
    return Response({"count": currentUser.profile.follows.count()})

#check if current user is authenticated
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                try:
                    profile = user.profile
                    username = profile.username
                    user_image = profile.userImage.url if profile.userImage else None
                    user_id = profile.id
                    
                    return Response({'isAuthenticated': 'Success', 'username': username, 'userImage': user_image, 'userId': user_id})
                except Profile.DoesNotExist:
                    return Response({'error': 'User profile not found'})
            else:
                return Response({'isAuthenticated':'Error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})

#creates a new user
@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        
        username = data['username']
        email = data['email']
        password = data['password']
        re_password = data['re_password']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password) < 6:
                        return Response ({'error': 'Password must be at least 6 characters'})
                    else:
                        user = User.objects.create_user(username=username, email=email, password=password)

                        user = User.objects.get(id=user.id)

                        Profile.objects.create(user = user, first_name='', last_name='', phone='', city='')
                        return Response({ 'success': 'User created successfully'})
            else:
                return Response({'error': 'Passwords do not match'})
        except:
                return Response({'error': 'Something went wrong when registering account'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})
    
#logs user in
@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated', 'username': username})
            else:
                return Response({ 'error': 'Error Authenticating'})
        except:
            return Response({'error': 'Something went wrong when logging in'})

#logs user out
class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Logged Out'})
        except:
            return Response({'error': 'Something went wrong when logging out'})

#gets list of all users    
class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        users = User.objects.all()

        users = userSerializers(users, many=True)
        return Response(users.data)
