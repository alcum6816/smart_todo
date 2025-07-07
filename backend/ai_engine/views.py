from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
import logging
from django.db import models

from .models import AIInsight, ContextAnalysis, ProductivityMetrics, AIProcessingLog
from .serializers import (
    AIInsightSerializer, ContextAnalysisSerializer, 
    ProductivityMetricsSerializer, AIProcessingLogSerializer
)
from .ai_task_manager import AITaskManager
from tasks.models import Task, ContextEntry

logger = logging.getLogger(__name__)

class AIInsightViewSet(viewsets.ModelViewSet):
    queryset = AIInsight.objects.filter(is_active=True)
    serializer_class = AIInsightSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        insight_type = self.request.query_params.get('insight_type')
        if insight_type:
            queryset = queryset.filter(insight_type=insight_type)
        return queryset
    
    @action(detail=False, methods=['post'])
    def enhance_task(self, request):
        """Enhance a task using AI"""
        task_id = request.data.get('task_id')
        if not task_id:
            return Response({'error': 'task_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            task = Task.objects.get(id=task_id)
            ai_manager = AITaskManager()
            
            # Log the operation start
            log_entry = AIProcessingLog.objects.create(
                operation_type='task_enhancement',
                input_data={'task_id': str(task_id), 'task_title': task.title}
            )
            
            start_time = timezone.now()
            
            # Enhance the task
            task_data = {
                'title': task.title,
                'description': task.description,
                'priority': task.priority,
                'due_date': task.due_date.isoformat() if task.due_date else None
            }
            
            enhanced_data = ai_manager.enhance_task(task_data)
            
            # Update the task with AI enhancements
            if 'enhanced_description' in enhanced_data:
                task.ai_enhanced_description = enhanced_data['enhanced_description']
            if 'estimated_duration' in enhanced_data:
                task.ai_estimated_duration = enhanced_data['estimated_duration']
            if 'suggested_category' in enhanced_data:
                task.ai_insights['suggested_category'] = enhanced_data['suggested_category']
            
            task.ai_enhanced = True
            task.save()
            
            # Calculate processing time
            processing_time = (timezone.now() - start_time).total_seconds()
            
            # Update log entry
            log_entry.output_data = enhanced_data
            log_entry.processing_time = processing_time
            log_entry.success = True
            log_entry.save()
            
            return Response({
                'message': 'Task enhanced successfully',
                'enhanced_data': enhanced_data
            })
            
        except Task.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error enhancing task: {str(e)}")
            
            # Log the error
            if 'log_entry' in locals():
                log_entry.success = False
                log_entry.error_message = str(e)
                log_entry.save()
            
            return Response({'error': 'Failed to enhance task'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['post'])
    def analyze_context(self, request):
        """Analyze user context and generate insights"""
        try:
            ai_manager = AITaskManager()
            
            # Get recent tasks and context entries
            recent_tasks = Task.objects.filter(
                created_at__gte=timezone.now() - timedelta(days=7)
            ).values('title', 'description', 'priority', 'status')[:20]
            
            recent_contexts = ContextEntry.objects.filter(
                timestamp__gte=timezone.now() - timedelta(days=7)
            ).values('content', 'source_type', 'extracted_keywords')[:10]
            
            # Prepare data for AI analysis
            analysis_data = {
                'tasks': list(recent_tasks),
                'contexts': list(recent_contexts),
                'analysis_date': timezone.now().isoformat()
            }
            
            # Log the operation
            log_entry = AIProcessingLog.objects.create(
                operation_type='context_analysis',
                input_data={'task_count': len(recent_tasks), 'context_count': len(recent_contexts)}
            )
            
            start_time = timezone.now()
            
            # Perform AI analysis
            context_analysis = ai_manager.analyze_context(list(recent_tasks))
            
            # Create ContextAnalysis record
            analysis_record = ContextAnalysis.objects.create(
                context_summary=context_analysis.get('summary', 'No summary available'),
                key_themes=context_analysis.get('patterns', []),
                urgency_indicators=context_analysis.get('focus_areas', []),
                suggested_actions=context_analysis.get('recommendations', []),
                productivity_score=75.0,  # Default score, could be calculated
                focus_areas=context_analysis.get('focus_areas', [])
            )
            
            # Calculate processing time
            processing_time = (timezone.now() - start_time).total_seconds()
            
            # Update log entry
            log_entry.output_data = context_analysis
            log_entry.processing_time = processing_time
            log_entry.success = True
            log_entry.save()
            
            serializer = ContextAnalysisSerializer(analysis_record)
            return Response(serializer.data)
            
        except Exception as e:
            logger.error(f"Error analyzing context: {str(e)}")
            
            if 'log_entry' in locals():
                log_entry.success = False
                log_entry.error_message = str(e)
                log_entry.save()
            
            return Response({'error': 'Failed to analyze context'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['get'])
    def productivity_insights(self, request):
        """Get productivity insights"""
        try:
            # Get recent productivity data
            week_ago = timezone.now() - timedelta(days=7)
            
            total_tasks = Task.objects.filter(created_at__gte=week_ago).count()
            completed_tasks = Task.objects.filter(
                created_at__gte=week_ago,
                status='completed'
            ).count()
            
            completion_rate = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
            
            # Generate insights based on data
            insights = []
            
            if completion_rate > 80:
                insights.append({
                    'type': 'productivity',
                    'title': 'High Productivity Week',
                    'description': f'You completed {completion_rate:.1f}% of your tasks this week!',
                    'confidence_score': 0.9
                })
            elif completion_rate < 50:
                insights.append({
                    'type': 'recommendation',
                    'title': 'Focus Improvement Needed',
                    'description': 'Consider breaking down large tasks into smaller, manageable pieces.',
                    'confidence_score': 0.8
                })
            
            # Add pattern recognition insights
            high_priority_tasks = Task.objects.filter(
                created_at__gte=week_ago,
                priority__in=['high', 'urgent']
            ).count()
            
            if high_priority_tasks > total_tasks * 0.6:
                insights.append({
                    'type': 'pattern',
                    'title': 'High Priority Pattern',
                    'description': 'You tend to create many high-priority tasks. Consider prioritizing more strategically.',
                    'confidence_score': 0.7
                })
            
            return Response({
                'insights': insights,
                'metrics': {
                    'total_tasks': total_tasks,
                    'completed_tasks': completed_tasks,
                    'completion_rate': completion_rate,
                    'high_priority_tasks': high_priority_tasks
                }
            })
            
        except Exception as e:
            logger.error(f"Error getting productivity insights: {str(e)}")
            return Response({'error': 'Failed to get insights'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ContextAnalysisViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContextAnalysis.objects.all()
    serializer_class = ContextAnalysisSerializer

class ProductivityMetricsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductivityMetrics.objects.all()
    serializer_class = ProductivityMetricsSerializer
    
    @action(detail=False, methods=['get'])
    def weekly_summary(self, request):
        """Get weekly productivity summary"""
        week_ago = timezone.now().date() - timedelta(days=7)
        metrics = self.queryset.filter(date__gte=week_ago)
        
        if not metrics.exists():
            return Response({'message': 'No data available for the past week'})
        
        avg_productivity = metrics.aggregate(
            avg_score=models.Avg('productivity_score')
        )['avg_score'] or 0
        
        total_completed = sum(m.tasks_completed for m in metrics)
        total_created = sum(m.tasks_created for m in metrics)
        
        return Response({
            'average_productivity_score': round(avg_productivity, 1),
            'total_tasks_completed': total_completed,
            'total_tasks_created': total_created,
            'completion_ratio': round(total_completed / total_created * 100, 1) if total_created > 0 else 0
        })

class AIProcessingLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AIProcessingLog.objects.all()
    serializer_class = AIProcessingLogSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        operation_type = self.request.query_params.get('operation_type')
        success = self.request.query_params.get('success')
        
        if operation_type:
            queryset = queryset.filter(operation_type=operation_type)
        if success is not None:
            queryset = queryset.filter(success=success.lower() == 'true')
        
        return queryset
