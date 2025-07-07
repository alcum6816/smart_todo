from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AIInsightViewSet, ContextAnalysisViewSet, 
    ProductivityMetricsViewSet, AIProcessingLogViewSet
)

router = DefaultRouter()
router.register(r'insights', AIInsightViewSet)
router.register(r'context-analysis', ContextAnalysisViewSet)
router.register(r'productivity-metrics', ProductivityMetricsViewSet)
router.register(r'processing-logs', AIProcessingLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
