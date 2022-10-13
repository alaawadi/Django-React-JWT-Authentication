from django.contrib import admin

# Register your models here.

from .models import Code, Note, User
admin.site.register(Note)
admin.site.register(User)
admin.site.register(Code)
