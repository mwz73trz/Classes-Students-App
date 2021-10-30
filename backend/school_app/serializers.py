from rest_framework.serializers import ModelSerializer
from school_app.models import Subject, Student

class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'students']
        depth = 1

class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'