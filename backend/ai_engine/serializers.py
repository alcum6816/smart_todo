from rest_framework import serializers
from .models import AIInsight, ContextAnalysis, ProductivityMetrics, AIProcessingLog

class AIInsightSerializer(serializers.ModelSerializer):
    is_expired = serializers.ReadOnlyField()
    
    class Meta:
        model = AIInsight
        fields = [
            'id', 'insight_type', 'title', 'description', 'data', 'confidence_score',
            'is_active', 'created_at', 'expires_at', 'is_expired'
        ]
        read_only_fields = ['id', 'created_at', 'is_expired']

class ContextAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContextAnalysis
        fields = [
            'id', 'analysis_date', 'context_summary', 'key_themes', 'urgency_indicators',
            'suggested_actions', 'productivity_score', 'focus_areas'
        ]
        read_only_fields = ['id', 'analysis_date']

class ProductivityMetricsSerializer(serializers.ModelSerializer):
    efficiency_ratio = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductivityMetrics
        fields = [
            'id', 'date', 'tasks_completed', 'tasks_created', 'average_completion_time',
            'productivity_score', 'focus_time', 'distraction_events', 'peak_productivity_hour',
            'efficiency_ratio'
        ]
        read_only_fields = ['id']
    
    def get_efficiency_ratio(self, obj):
        if obj.tasks_created > 0:
            return round(obj.tasks_completed / obj.tasks_created, 2)
        return 0.0

class AIProcessingLogSerializer(serializers.ModelSerializer):
    operation_display = serializers.CharField(source='get_operation_type_display', read_only=True)
    
    class Meta:
        model = AIProcessingLog
        fields = [
            'id', 'operation_type', 'operation_display', 'input_data', 'output_data',
            'processing_time', 'success', 'error_message', 'timestamp'
        ]
        read_only_fields = ['id', 'timestamp', 'operation_display']
