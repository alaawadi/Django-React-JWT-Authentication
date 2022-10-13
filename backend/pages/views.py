import imp
from urllib import response
from django.shortcuts import render

from rest_framework import mixins
from rest_framework import generics
from rest_framework.decorators import api_view
from base.models import Note
from base.api.serializers import NoteSerializer
from rest_framework.response import Response
from base.models import User

from base.api.permissions import IsOwnerorReadOnly
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class create_list(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)






@api_view(['GET'])
def detail(request, pk):

    object = Note.objects.get(id=pk)
    serilizer = NoteSerializer(object, many=False)
    return Response(serilizer.data)




# @permission_classes([IsOwnerorReadOnly])
@api_view(['PUT'])
def update(request,pk):
    object = Note.objects.get(id=pk)
    serilizer = NoteSerializer(object, data=request.data)

    if serilizer.is_valid():
        serilizer.save()

    return Response(serilizer.data)






@api_view(['DELETE'])
def delete(request, pk):
    object = Note.objects.get(id=pk)
    object.delete()

    return Response('Items delete successfully!')




from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = Note.object.all()
    # nots = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['GET','POST'])
def Notes(request):
    
    if(request.method == 'GET'):
        user = request.user
        obj = Note.object.all()
        serializer = NoteSerializer(obj, many=True)
        return Response(serializer.data)

    if(request.method == 'POST'):
        data = request.data
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Data has been created Successfully'})
        return Response({'msg':serializer.errors})




from django.shortcuts import render
from django.core.mail import send_mail

# def index(request):
#     send_mail(
#         'hi alaa',
#         'hi alaa, this message from django...'
#         'alaawadi1998@gmail.com',
#         ['alaawadi98@gmail.com'],
#         fail_silently=False
#     )
#     return render(request, 'backend/pages/mail.html')






def index(request):
  from_email = 'alaawadi98@gmail.com'
  subject  =  'Clippy here', 
  message = 'Hi! I am clippy! You resserected me somehow so thanks!',
  recipient_list =  ['alaawadi1998@gmail.com',  ]
  send_mail(subject, message,  recipient_list=recipient_list,from_email=from_email)

from django.conf import settings
from django.http import HttpResponse, JsonResponse
import random
from base.models import Code
def contact(emaill):
    user = User.objects.get(email=emaill)
    otp = Code.objects.get(user=user)
    email = 'datatec@gmail.com'
    message = 'Your activate code is: ' + str(otp.code)
    subject = 'Data Tec'
    send_mail(
        email,
        message,
        subject,
        [emaill],
        
    )
    
    
    # return HttpResponse({'msg':'send message successfuly!'})





import codecs
import csv

from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage

from rest_framework import serializers, viewsets
from rest_framework.decorators import action


fs = FileSystemStorage(location='tmp/')

# Viewset
class NoteViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Product.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    @action(detail=False, methods=['POST'])
    def upload_data(self, request):
        """Upload data from CSV"""
        file = request.FILES["file"]

        content = file.read()  # these are bytes
        file_content = ContentFile(content)
        file_name = fs.save(
            "_tmp.csv", file_content
        )
        tmp_file = fs.path(file_name)

        csv_file = open(tmp_file, errors="ignore")
        reader = csv.reader(csv_file)
        next(reader)
        
        obj_list = []
        for id_, row in enumerate(reader):
            (
                user,
                body
            ) = row
            obj_list.append(
                Note(
                    user=user,
                    body=body
                )
            )

        Note.objects.bulk_create(obj_list)

        return Response("Successfully upload the data")

    @action(detail=False, methods=['POST'])
    def upload_data_with_validation(self, request):
        """Upload data from CSV, with validation."""
        file = request.FILES.get("file")

        reader = csv.DictReader(codecs.iterdecode(file, "utf-8"), delimiter=",")
        data = list(reader)

        serializer = self.serializer_class(data=data, many=True)
        serializer.is_valid(raise_exception=True)

        obj_list = []
        for row in serializer.data:
            obj_list.append(
                Note(
                    user=row["user"],
                    category=row["body"]
                )
            )

        Note.objects.bulk_create(obj_list)

        return Response("Successfully upload the data")