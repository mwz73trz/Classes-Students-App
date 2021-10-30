from django.db import models

class Subject(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.name}"

class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=150)
    pass_fail = models.BooleanField(default=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="students")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
