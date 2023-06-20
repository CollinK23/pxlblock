from django.contrib import admin
from .models import Profile, Project, projectLike, Image

class ProjectLikeInline(admin.TabularInline):
    model = projectLike

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectLikeInline]

admin.site.register(Profile)
admin.site.register(Project, ProjectAdmin)
admin.site.register(projectLike)
admin.site.register(Image)