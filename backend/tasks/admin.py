from django.contrib import admin
from .models import Task, Category, ContextEntry, TaskContextRelation

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'color', 'icon', 'usage_count', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['id', 'usage_count', 'created_at', 'updated_at']

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'priority', 'status', 'category', 'due_date', 'ai_enhanced', 'created_at']
    list_filter = ['priority', 'status', 'ai_enhanced', 'category', 'created_at']
    search_fields = ['title', 'description', 'tags']
    readonly_fields = ['id', 'created_at', 'updated_at', 'completed_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'priority', 'status', 'category')
        }),
        ('Dates', {
            'fields': ('due_date', 'created_at', 'updated_at', 'completed_at')
        }),
        ('AI Enhancement', {
            'fields': ('ai_enhanced', 'ai_enhanced_description', 'ai_estimated_duration', 
                      'ai_suggested_deadline', 'priority_score', 'ai_insights'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('tags', 'estimated_duration', 'actual_duration'),
            'classes': ('collapse',)
        })
    )

@admin.register(ContextEntry)
class ContextEntryAdmin(admin.ModelAdmin):
    list_display = ['source_type', 'content_preview', 'is_processed', 'timestamp']
    list_filter = ['source_type', 'is_processed', 'timestamp']
    search_fields = ['content', 'extracted_keywords']
    readonly_fields = ['id', 'timestamp', 'processed_at']
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content Preview'

@admin.register(TaskContextRelation)
class TaskContextRelationAdmin(admin.ModelAdmin):
    list_display = ['task', 'context_entry', 'relevance_score', 'created_at']
    list_filter = ['relevance_score', 'created_at']
    readonly_fields = ['id', 'created_at']
