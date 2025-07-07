from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, CategoryViewSet, ContextEntryViewSet, TaskContextRelationViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'contexts', ContextEntryViewSet)
router.register(r'task-context-relations', TaskContextRelationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
