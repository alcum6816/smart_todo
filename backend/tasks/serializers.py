from rest_framework import serializers
from .models import Task, Category, ContextEntry, TaskContextRelation
from django.utils import timezone

class CategorySerializer(serializers.ModelSerializer):
    task_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'icon', 'description', 'usage_count', 'task_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'usage_count', 'created_at', 'updated_at']
    
    def get_task_count(self, obj):
        return obj.task_set.count()

class TaskSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_color = serializers.CharField(source='category.color', read_only=True)
    is_overdue = serializers.ReadOnlyField()
    days_until_due = serializers.ReadOnlyField()
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'priority', 'status', 'category', 'category_name', 'category_color',
            'due_date', 'created_at', 'updated_at', 'completed_at', 'ai_enhanced', 'ai_enhanced_description',
            'ai_estimated_duration', 'ai_suggested_deadline', 'priority_score', 'ai_insights', 'tags',
            'estimated_duration', 'actual_duration', 'is_overdue', 'days_until_due'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'completed_at', 'is_overdue', 'days_until_due']

class TaskCreateSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = Task
        fields = [
            'title', 'description', 'priority', 'status', 'category_name', 'due_date',
            'tags', 'estimated_duration', 'ai_enhanced_description', 'ai_estimated_duration'
        ]
    
    def create(self, validated_data):
        category_name = validated_data.pop('category_name', None)
        
        if category_name:
            category, created = Category.objects.get_or_create(
                name=category_name,
                defaults={'color': '#3B82F6', 'icon': 'folder'}
            )
            validated_data['category'] = category
        
        return Task.objects.create(**validated_data)

class TaskUpdateSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = Task
        fields = [
            'title', 'description', 'priority', 'status', 'category_name', 'due_date',
            'tags', 'estimated_duration', 'actual_duration', 'ai_enhanced_description',
            'ai_estimated_duration', 'ai_insights'
        ]
    
    def update(self, instance, validated_data):
        category_name = validated_data.pop('category_name', None)
        
        if category_name:
            category, created = Category.objects.get_or_create(
                name=category_name,
                defaults={'color': '#3B82F6', 'icon': 'folder'}
            )
            validated_data['category'] = category
        elif category_name == '':
            validated_data['category'] = None
        
        return super().update(instance, validated_data)

class BulkTaskUpdateSerializer(serializers.Serializer):
    task_ids = serializers.ListField(child=serializers.UUIDField())
    update_data = serializers.DictField()
    
    def validate_update_data(self, value):
        allowed_fields = ['status', 'priority', 'category', 'tags']
        for key in value.keys():
            if key not in allowed_fields:
                raise serializers.ValidationError(f"Field '{key}' is not allowed for bulk update")
        return value

class ContextEntrySerializer(serializers.ModelSerializer):
    related_tasks_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ContextEntry
        fields = [
            'id', 'content', 'source_type', 'timestamp', 'is_processed', 'processed_at',
            'extracted_keywords', 'sentiment_score', 'urgency_indicators', 'deadline_mentions',
            'processed_insights', 'source_metadata', 'related_tasks_count'
        ]
        read_only_fields = ['id', 'timestamp', 'processed_at', 'related_tasks_count']
    
    def get_related_tasks_count(self, obj):
        return obj.task_relations.count()

class TaskContextRelationSerializer(serializers.ModelSerializer):
    task_title = serializers.CharField(source='task.title', read_only=True)
    context_content = serializers.CharField(source='context_entry.content', read_only=True)
    
    class Meta:
        model = TaskContextRelation
        fields = ['id', 'task', 'task_title', 'context_entry', 'context_content', 'relevance_score', 'created_at']
        read_only_fields = ['id', 'created_at']

class TaskStatsSerializer(serializers.Serializer):
    total_tasks = serializers.IntegerField()
    completed_tasks = serializers.IntegerField()
    pending_tasks = serializers.IntegerField()
    overdue_tasks = serializers.IntegerField()
    completion_rate = serializers.FloatField()
    priority_distribution = serializers.DictField()
    category_distribution = serializers.DictField()
    recent_activity = serializers.ListField()
