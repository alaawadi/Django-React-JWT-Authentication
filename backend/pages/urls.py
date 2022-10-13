from django.urls import path
# from . import views
from .views import create_list, detail, update, delete, Notes, index, contact, getNotes,NoteViewSet




urlpatterns = [
    path('create_list/', create_list.as_view()),
    path('detail/<pk>', detail),
    path('update/<pk>', update),
    path('delete/<pk>', delete),
    path('csv/',NoteViewSet.as_view('POST')),
    path('notes/', getNotes),
    path('index/',index),
    path('contact/',contact)


    
]
