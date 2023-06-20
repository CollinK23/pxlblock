
from django.urls import path
from . import views
from .views import SignupView, GetCSRFToken, LoginView, LogoutView, CheckAuthenticatedView, GetUsersView, ProjectList

from rest_framework_simplejwt.views import (
    TokenRefreshView,

)


urlpatterns = [
    # path('', views.getRoutes, name="routes"),
    path('discover/', views.ProjectList.as_view(), name="discover"),
    path('home/', views.getFollowedProjects, name="home"),
    path('hire/', views.getProfiles, name="hire"),
    path('profile/<str:username>',  views.getProfileAndProjects, name="profile"),
    path('profile/<str:username>/<int:pk>', views.getProject),

    # path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('<str:username>/follow', views.userFollow),
    path('register', SignupView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('users', GetUsersView.as_view()),
    path('images/', views.getImages, name="images")
    

]