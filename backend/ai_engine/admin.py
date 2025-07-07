from django.contrib import admin
from .models import AIInsight, ContextAnalysis, ProductivityMetrics, AIProcessingLog

@admin.register(AIInsight)
class AIInsightAdmin(admin.ModelAdmin):
    list_display = ['title', 'insight_type', 'confidence_score', 'is_active', 'created_at', 'is_expired']
    list_filter = ['insight_type', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['id', 'created_at', 'is_expired']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('insight_type', 'title', 'description', 'confidence_score')
        }),
        ('Status', {
            'fields': ('is_active', 'expires_at')
        }),
        ('Data', {
            'fields': ('data',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('id', 'created_at', 'is_expired'),
            'classes': ('collapse',)
        })
    )

@admin.register(ContextAnalysis)
class ContextAnalysisAdmin(admin.ModelAdmin):
    list_display = ['analysis_date', 'productivity_score', 'context_summary_preview']
    list_filter = ['analysis_date', 'productivity_score']
    readonly_fields = ['id', 'analysis_date']
    
    def context_summary_preview(self, obj):
        return obj.context_summary[:100] + '...' if len(obj.context_summary) > 100 else obj.context_summary
    context_summary_preview.short_description = 'Summary Preview'

@admin.register(ProductivityMetrics)
class ProductivityMetricsAdmin(admin.ModelAdmin):
    list_display = ['date', 'productivity_score', 'tasks_completed', 'tasks_created', 'focus_time']
    list_filter = ['date', 'productivity_score']
    readonly_fields = ['id']
    date_hierarchy = 'date'

@admin.register(AIProcessingLog)
class AIProcessingLogAdmin(admin.ModelAdmin):
    list_display = ['operation_type', 'success', 'processing_time', 'timestamp']
    list_filter = ['operation_type', 'success', 'timestamp']
    readonly_fields = ['id', 'timestamp']
    
    fieldsets = (
        ('Operation Info', {
            'fields': ('operation_type', 'success', 'processing_time', 'timestamp')
        }),
        ('Data', {
            'fields': ('input_data', 'output_data'),
            'classes': ('collapse',)
        }),
        ('Error Info', {
            'fields': ('error_message',),
            'classes': ('collapse',)
        })
    )
