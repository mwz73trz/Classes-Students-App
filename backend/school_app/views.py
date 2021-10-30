from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from school_app.serializers import SubjectSerializer, StudentSerializer
from school_app.models import Subject, Student

class SubjectViewSet(ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
