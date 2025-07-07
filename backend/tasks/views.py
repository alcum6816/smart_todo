from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Count, Q, Avg
from datetime import timedelta
import logging

from .models import Task, Category, ContextEntry, TaskContextRelation
from .serializers import (
    TaskSerializer, TaskCreateSerializer, TaskUpdateSerializer,
    CategorySerializer, ContextEntrySerializer, TaskContextRelationSerializer,
    TaskStatsSerializer, BulkTaskUpdateSerializer
)

logger = logging.getLogger(__name__)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'category', 'ai_enhanced']
    search_fields = ['title', 'description', 'tags']
    ordering_fields = ['created_at', 'updated_at', 'due_date', 'priority_score']
    ordering = ['-priority_score', '-created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return TaskCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return TaskUpdateSerializer
        return TaskSerializer

    def perform_create(self, serializer):
        task = serializer.save()
        logger.info(f"Created task: {task.title}")

    def perform_update(self, serializer):
        task = serializer.save()
        logger.info(f"Updated task: {task.title}")

    @action(detail=True, methods=['post'])
    def toggle_status(self, request, pk=None):
        """Toggle task status between pending and completed"""
        task = self.get_object()
        
        if task.status == 'completed':
            task.status = 'pending'
            task.completed_at = None
        else:
            task.status = 'completed'
            task.completed_at = timezone.now()
        
        task.save()
        
        serializer = self.get_serializer(task)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def bulk_update(self, request):
        """Bulk update multiple tasks"""
        serializer = BulkTaskUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        task_ids = serializer.validated_data['task_ids']
        update_data = serializer.validated_data['update_data']
        
        # Handle category update
        if 'category' in update_data:
            category_name = update_data['category']
            if category_name:
                category, created = Category.objects.get_or_create(
                    name=category_name,
                    defaults={'color': '#3B82F6', 'icon': 'folder'}
                )
                update_data['category'] = category
            else:
                update_data['category'] = None
        
        # Update tasks
        updated_count = Task.objects.filter(id__in=task_ids).update(**update_data)
        
        return Response({
            'message': f'Updated {updated_count} tasks',
            'updated_count': updated_count
        })

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get task statistics"""
        total_tasks = Task.objects.count()
        completed_tasks = Task.objects.filter(status='completed').count()
        pending_tasks = Task.objects.filter(status='pending').count()
        overdue_tasks = Task.objects.filter(
            due_date__lt=timezone.now(),
            status__in=['pending', 'in_progress']
        ).count()
        
        completion_rate = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
        
        # Priority distribution
        priority_distribution = dict(
            Task.objects.values('priority').annotate(count=Count('priority')).values_list('priority', 'count')
        )
        
        # Category distribution
        category_distribution = dict(
            Task.objects.filter(category__isnull=False)
            .values('category__name').annotate(count=Count('category'))
            .values_list('category__name', 'count')
        )
        
        # Recent activity (last 7 days)
        week_ago = timezone.now() - timedelta(days=7)
        recent_activity = []
        for i in range(7):
            date = week_ago + timedelta(days=i)
            day_tasks = Task.objects.filter(created_at__date=date.date()).count()
            recent_activity.append({
                'date': date.date().isoformat(),
                'tasks_created': day_tasks
            })
        
        stats_data = {
            'total_tasks': total_tasks,
            'completed_tasks': completed_tasks,
            'pending_tasks': pending_tasks,
            'overdue_tasks': overdue_tasks,
            'completion_rate': round(completion_rate, 1),
            'priority_distribution': priority_distribution,
            'category_distribution': category_distribution,
            'recent_activity': recent_activity
        }
        
        serializer = TaskStatsSerializer(stats_data)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get today's tasks"""
        today = timezone.now().date()
        tasks = Task.objects.filter(
            Q(due_date__date=today) | Q(created_at__date=today)
        ).order_by('-priority_score')
        
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming tasks (next 7 days)"""
        today = timezone.now()
        week_later = today + timedelta(days=7)
        
        tasks = Task.objects.filter(
            due_date__range=[today, week_later],
            status__in=['pending', 'in_progress']
        ).order_by('due_date')
        
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def overdue(self, request):
        """Get overdue tasks"""
        tasks = Task.objects.filter(
            due_date__lt=timezone.now(),
            status__in=['pending', 'in_progress']
        ).order_by('due_date')
        
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'usage_count', 'created_at']
    ordering = ['-usage_count', 'name']

    @action(detail=False, methods=['get'])
    def popular(self, request):
        """Get most popular categories"""
        categories = Category.objects.filter(usage_count__gt=0).order_by('-usage_count')[:10]
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)

class ContextEntryViewSet(viewsets.ModelViewSet):
    queryset = ContextEntry.objects.all()
    serializer_class = ContextEntrySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['source_type', 'is_processed']
    search_fields = ['content', 'extracted_keywords']
    ordering_fields = ['timestamp', 'processed_at']
    ordering = ['-timestamp']

    @action(detail=True, methods=['post'])
    def analyze(self, request, pk=None):
        """Trigger AI analysis for a context entry"""
        context_entry = self.get_object()
        
        # This would trigger AI analysis
        # For now, just mark as processed
        context_entry.mark_processed()
        
        serializer = self.get_serializer(context_entry)
        return Response(serializer.data)

class TaskContextRelationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TaskContextRelation.objects.all()
    serializer_class = TaskContextRelationSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['task', 'context_entry']
    ordering = ['-relevance_score', '-created_at']
