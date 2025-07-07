from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    color = models.CharField(max_length=7, default='#3B82F6')  # Hex color
    icon = models.CharField(max_length=50, default='folder')
    description = models.TextField(blank=True)
    usage_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['-usage_count', 'name']

    def __str__(self):
        return self.name

    def increment_usage(self):
        self.usage_count += 1
        self.save()

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Dates
    due_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # AI Enhancement fields
    ai_enhanced = models.BooleanField(default=False)
    ai_enhanced_description = models.TextField(blank=True)
    ai_estimated_duration = models.CharField(max_length=50, blank=True)  # e.g., "2-3 hours"
    ai_suggested_deadline = models.DateTimeField(null=True, blank=True)
    priority_score = models.FloatField(default=0.5)  # 0-1 scale for AI priority
    ai_insights = models.JSONField(default=dict, blank=True)
    
    # Metadata
    tags = models.JSONField(default=list, blank=True)
    estimated_duration = models.IntegerField(null=True, blank=True)  # in minutes
    actual_duration = models.IntegerField(null=True, blank=True)  # in minutes
    
    class Meta:
        ordering = ['-priority_score', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Auto-set completed_at when status changes to completed
        if self.status == 'completed' and not self.completed_at:
            self.completed_at = timezone.now()
        elif self.status != 'completed':
            self.completed_at = None
        
        # Increment category usage
        if self.category:
            self.category.increment_usage()
        
        super().save(*args, **kwargs)

    @property
    def is_overdue(self):
        if self.due_date and self.status != 'completed':
            return timezone.now() > self.due_date
        return False

    @property
    def days_until_due(self):
        if self.due_date:
            delta = self.due_date - timezone.now()
            return delta.days
        return None

    def update_priority_score(self, score):
        """Update AI-calculated priority score"""
        self.priority_score = max(0.0, min(1.0, score))
        self.save()

    def add_ai_insight(self, insight_type, data):
        """Add AI insight to the task"""
        if not self.ai_insights:
            self.ai_insights = {}
        
        self.ai_insights[insight_type] = {
            'data': data,
            'timestamp': timezone.now().isoformat()
        }
        self.save()

class ContextEntry(models.Model):
    SOURCE_TYPES = [
        ('email', 'Email'),
        ('calendar', 'Calendar'),
        ('notes', 'Notes'),
        ('meeting', 'Meeting'),
        ('chat', 'Chat/Message'),
        ('document', 'Document'),
        ('voice', 'Voice Input'),
        ('manual', 'Manual Entry'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField()
    source_type = models.CharField(max_length=20, choices=SOURCE_TYPES, default='manual')
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # AI Processing fields
    is_processed = models.BooleanField(default=False)
    processed_at = models.DateTimeField(null=True, blank=True)
    extracted_keywords = models.JSONField(default=list, blank=True)
    sentiment_score = models.FloatField(default=0.0)  # -1 to 1
    urgency_indicators = models.JSONField(default=list, blank=True)
    deadline_mentions = models.JSONField(default=list, blank=True)
    processed_insights = models.JSONField(default=dict, blank=True)
    
    # Metadata
    source_metadata = models.JSONField(default=dict, blank=True)  # Additional source info
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name_plural = "Context Entries"

    def __str__(self):
        return f"{self.source_type}: {self.content[:50]}..."

    def mark_processed(self):
        """Mark context entry as processed by AI"""
        self.is_processed = True
        self.processed_at = timezone.now()
        self.save()

class TaskContextRelation(models.Model):
    """Links tasks to relevant context entries"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='context_relations')
    context_entry = models.ForeignKey(ContextEntry, on_delete=models.CASCADE, related_name='task_relations')
    relevance_score = models.FloatField(default=0.0)  # 0-1 scale
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['task', 'context_entry']
        ordering = ['-relevance_score']

    def __str__(self):
        return f"{self.task.title} <-> {self.context_entry.source_type}"
