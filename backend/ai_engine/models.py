from django.db import models
from django.utils import timezone
import uuid

class AIInsight(models.Model):
    INSIGHT_TYPES = [
        ('productivity', 'Productivity Analysis'),
        ('pattern', 'Pattern Recognition'),
        ('recommendation', 'Recommendation'),
        ('prediction', 'Prediction'),
        ('optimization', 'Optimization'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    insight_type = models.CharField(max_length=20, choices=INSIGHT_TYPES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    data = models.JSONField(default=dict)
    confidence_score = models.FloatField(default=0.0)  # 0-1 scale
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.insight_type}: {self.title}"
    
    @property
    def is_expired(self):
        if self.expires_at:
            return timezone.now() > self.expires_at
        return False

class ContextAnalysis(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    analysis_date = models.DateTimeField(auto_now_add=True)
    context_summary = models.TextField()
    key_themes = models.JSONField(default=list)
    urgency_indicators = models.JSONField(default=list)
    suggested_actions = models.JSONField(default=list)
    productivity_score = models.FloatField(default=0.0)  # 0-100 scale
    focus_areas = models.JSONField(default=list)
    
    class Meta:
        ordering = ['-analysis_date']
        verbose_name_plural = "Context Analyses"
    
    def __str__(self):
        return f"Context Analysis - {self.analysis_date.strftime('%Y-%m-%d %H:%M')}"

class ProductivityMetrics(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField()
    tasks_completed = models.IntegerField(default=0)
    tasks_created = models.IntegerField(default=0)
    average_completion_time = models.FloatField(default=0.0)  # in hours
    productivity_score = models.FloatField(default=0.0)  # 0-100 scale
    focus_time = models.FloatField(default=0.0)  # in hours
    distraction_events = models.IntegerField(default=0)
    peak_productivity_hour = models.IntegerField(null=True, blank=True)  # 0-23
    
    class Meta:
        ordering = ['-date']
        unique_together = ['date']
    
    def __str__(self):
        return f"Productivity Metrics - {self.date}"

class AIProcessingLog(models.Model):
    OPERATION_TYPES = [
        ('task_enhancement', 'Task Enhancement'),
        ('context_analysis', 'Context Analysis'),
        ('productivity_analysis', 'Productivity Analysis'),
        ('pattern_recognition', 'Pattern Recognition'),
        ('voice_processing', 'Voice Processing'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    operation_type = models.CharField(max_length=30, choices=OPERATION_TYPES)
    input_data = models.JSONField(default=dict)
    output_data = models.JSONField(default=dict)
    processing_time = models.FloatField(default=0.0)  # in seconds
    success = models.BooleanField(default=True)
    error_message = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        status = "Success" if self.success else "Failed"
        return f"{self.operation_type} - {status} - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
