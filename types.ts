// types.ts
export interface Task {
  id: string
  title: string
  description?: string
  status: string
  priority: string
  due_date?: string
  estimated_duration?: number
  category_name?: string
  category_color?: string
  ai_enhanced?: boolean
  is_overdue?: boolean
  tags?: string[]
}

export interface Category {
  id: string
  name: string
  color?: string
  icon?: string
  description?: string
}

export interface TaskFilters {
  status: string
  priority: string
  category: string
  search?: string
}

export interface TaskCreateData {
  title: string
  description?: string
  priority: string
  category?: string
  due_date?: string
}

export interface TaskUpdateData {
  title?: string
  description?: string
  status?: string
  priority?: string
  due_date?: string
  category?: string
}

export interface BulkTaskUpdate {
  task_ids: string[]
  update_data: {
    status?: string
    priority?: string
  }
}

export interface ContextEntry {
  id: string
  source_type: string
  is_processed: boolean
  data: any
}

export interface ContextCreateData {
  source_type: string
  data: any
}

export interface ContextAnalysis {
  id: string
  results: any
}

export interface AIInsight {
  id: string
  insight_type: string
  is_active: boolean
  data: any
}

export interface ProductivityMetrics {
  id: string
  metric_type: string
  value: number
  timestamp: string
}

export interface ProductivityInsights {
  insights: string[]
}

export interface APIResponse<T = any> {
  results: T
  count?: number
  message?: string
  updated_count?: number
  enhanced_data?: any
}

export interface ApiError {
  message: string
  status: number
  data?: any
}

export interface WhisperResponse {
  text: string
}

export interface ExtractedTask {
  title: string
  description?: string
  priority?: string
  due_date?: string
  category?: string
}