"""
URL configuration for smart_todo_backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'healthy', 'service': 'Smart Todo AI Backend'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health_check, name='health_check'),
    path('api/tasks/', include('tasks.urls')),
    path('api/ai/', include('ai_engine.urls')),
]
