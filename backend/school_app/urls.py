from django.urls import path, include
from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from school_app.views import SubjectViewSet, StudentViewSet

router = DefaultRouter()
router.register("subjects", SubjectViewSet, basename="subject")
router.register("students", StudentViewSet, basename="student")

urlpatterns = [
    path("", include(router.urls)),
]