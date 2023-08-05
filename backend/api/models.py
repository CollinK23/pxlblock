from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from multiselectfield import MultiSelectField
from django.core.validators import MaxValueValidator

# Create your models here.

SKILL_CHOICES = [
        ("All Creative Fields", "All Creative Fields"),
        ("3D Art", "3D Art"),
        ("Architecture", "Architecture"),
        ("Art Direction", "Art Direction"),
        ("Branding", "Branding"),
        ("Fashion", "Fashion"),
        ("Graphic Design", "Graphic Design"),
        ("Illustration", "Illustration"),
        ("Industrial Design", "Industrial Design"),
        ("Interaction Design", "Interaction Design"),
        ("Motion Graphics", "Motion Graphics"),
        ("Photography", "Photography"),
        ("UI/UX", "UI/UX"),
        ("Web Design", "Web Design"),
    ]

class projectLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey("Project", on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

class Project(models.Model):
    user = models.ForeignKey(User, related_name="user_projects", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    projectImage = models.ImageField(upload_to="images/", default='')
    username = models.CharField(max_length=50, blank=True)
    likes = models.ManyToManyField(User, related_name='project_likes', blank=True, through='projectLike')
    name = models.CharField(max_length=50, blank=True)
    images = models.ManyToManyField('Image', related_name='projects', blank=True)
    
    def save(self, *args, **kwargs):
        if not self.name:
            self.name = self.user.username
        if not self.username:
            self.username = self.user.username
        super().save(*args, **kwargs)

class Image(models.Model):
    project = models.ForeignKey(Project, related_name='project_images', on_delete=models.CASCADE, default=1)
    image = models.ImageField(upload_to='images/', null=True)
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, default='', blank=True)
    username = models.CharField(max_length=50, blank=True)
    skills = MultiSelectField(choices=SKILL_CHOICES, max_choices=5, validators=[MaxValueValidator(5)], blank=True)
    follows = models.ManyToManyField("self", related_name="followers", symmetrical=False, blank=True)
    userImage = models.ImageField(null=True, blank=True, upload_to="images/")
    work = models.ManyToManyField(Project, related_name="profiles", blank=True)
    followers_count = models.PositiveIntegerField(default=0)
    following_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.username
    
    def save(self, *args, **kwargs):
        if not self.name:
            self.name = self.user.username
        if not self.username:
            self.username = self.user.username
        super().save(*args, **kwargs)

def update_follow_counts(sender, instance, **kwargs):
    instance.followers_count = instance.followers.count() - 1
    instance.following_count = instance.follows.count() - 1

    
def create_profile(sender ,instance, created, **kwargs):
    if created:
        user_profile = Profile(user=instance)
        user_profile.save()
        user_profile.follows.set([instance.profile.id])
        user_profile.save()
        update_follow_counts(sender=None, instance=user_profile)

post_save.connect(create_profile, sender=User)