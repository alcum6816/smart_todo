export interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in_progress" | "completed" | "cancelled"
  category?: Category
  category_name?: string
  category_color?: string
  due_date?: string
  created_at: string
  updated_at: string
  completed_at?: string
  ai_enhanced: boolean
  ai_enhanced_description?: string
  ai_estimated_duration?: string
  ai_suggested_deadline?: string
  priority_score: number
  ai_insights?: Record<string, any>
  tags: string[]
  estimated_duration?: number
  actual_duration?: number
  is_overdue: boolean
  days_until_due?: number
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  description?: string
  usage_count: number
  created_at: string
  updated_at: string
}

export interface ContextEntry {
  id: string
  content: string
  source_type: "email" | "calendar" | "notes" | "meeting" | "chat" | "document" | "voice" | "manual"
  timestamp: string
  is_processed: boolean
  processed_at?: string
  extracted_keywords: string[]
  sentiment_score: number
  urgency_indicators: string[]
  deadline_mentions: string[]
  processed_insights: Record<string, any>
  source_metadata: Record<string, any>
}

export interface AIInsight {
  id: string
  task?: string
  task_title?: string
  insight_type: "productivity" | "priority" | "scheduling" | "context" | "recommendation" | "pattern"
  content: string
  confidence_score: number
  metadata: Record<string, any>
  created_at: string
  is_active: boolean
}

export interface ContextAnalysis {
  id: string
  analysis_date: string
  context_data: Record<string, any>
  productivity_score: number
  focus_areas: string[]
  recommendations: string[]
  patterns_identified: string[]
  created_at: string
}

export interface ProductivityMetrics {
  id: string
  date: string
  tasks_created: number
  tasks_completed: number
  completion_rate: number
  average_completion_time: number
  productivity_score: number
  focus_time: number
  interruptions: number
  created_at: string
}

export interface TaskStats {
  total_tasks: number
  completed_tasks: number
  pending_tasks: number
  overdue_tasks: number
  completion_rate: number
  priority_distribution: Record<string, number>
  category_distribution: Record<string, number>
  recent_activity: Array<{
    date: string
    tasks_created: number
  }>
}

export interface TaskFilters {
  status?: string
  priority?: string
  category?: string
  search?: string
  due?: string
}

export interface BulkTaskUpdate {
  task_ids: string[]
  update_data: {
    status?: string
    priority?: string
    category?: string
    tags?: string[]
  }
}

export interface ProductivityInsights {
  success: boolean
  insights?: {
    productivity_score: number
    strengths: string[]
    areas_for_improvement: string[]
    recommendations: string[]
    patterns: string[]
    focus_suggestions: string
  }
  metrics?: {
    total_tasks: number
    completed_tasks: number
    completion_rate: number
    overdue_tasks: number
  }
}

export interface TaskSuggestion {
  title: string
  description: string
  priority: string
  category: string
  estimated_duration: string
  reasoning: string
  urgency_score: number
}

export interface AIStats {
  success: boolean
  stats?: {
    total_operations: number
    successful_operations: number
    success_rate: number
    avg_processing_time: number
    operation_breakdown: Record<
      string,
      {
        total: number
        successful: number
        success_rate: number
      }
    >
  }
}

export interface APIResponse<T = any> {
  data: T
  status: number
  statusText: string
}

export interface TaskCreateData {
  title: string
  description?: string
  priority?: string
  category_name?: string
  due_date?: string
  tags?: string[]
  estimated_duration?: number
}

export interface TaskUpdateData {
  title?: string
  description?: string
  priority?: string
  status?: string
  category?: string
  due_date?: string
  tags?: string[]
  estimated_duration?: number
  actual_duration?: number
}

export interface ContextCreateData {
  content: string
  source_type?: string
  source_metadata?: Record<string, any>
}
