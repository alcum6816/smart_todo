// lib/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const apiError = {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData,
        }
        throw apiError
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // HTTP Methods
  async get(endpoint, params, signal) {
    let url = endpoint
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    return this.request(url, { method: "GET", signal })
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" })
  }

  // Task endpoints
  async getTasks(filters) {
    return this.get("/tasks/tasks/", filters)
  }

  async getTask(id) {
    return this.get(`/tasks/tasks/${id}/`)
  }

  async createTask(taskData) {
    return this.post("/tasks/tasks/", taskData)
  }

  async updateTask(id, taskData) {
    return this.patch(`/tasks/tasks/${id}/`, taskData)
  }

  async deleteTask(id) {
    return this.delete(`/tasks/tasks/${id}/`)
  }

  async toggleTaskStatus(id) {
    return this.post(`/tasks/tasks/${id}/toggle_status/`)
  }

  async bulkUpdateTasks(data) {
    return this.post("/tasks/tasks/bulk_update/", data)
  }

  async getTaskStats() {
    return this.get("/tasks/tasks/stats/")
  }

  async getTodayTasks() {
    return this.get("/tasks/tasks/today/")
  }

  async getUpcomingTasks() {
    return this.get("/tasks/tasks/upcoming/")
  }

  async getOverdueTasks() {
    return this.get("/tasks/tasks/overdue/")
  }

  // Category endpoints
  async getCategories() {
    return this.get("/tasks/categories/")
  }

  async createCategory(categoryData) {
    return this.post("/tasks/categories/", categoryData)
  }

  async updateCategory(id, categoryData) {
    return this.patch(`/tasks/categories/${id}/`, categoryData)
  }

  async deleteCategory(id) {
    return this.delete(`/tasks/categories/${id}/`)
  }

  async getPopularCategories() {
    return this.get("/tasks/categories/popular/")
  }

  // Context endpoints
  async getContextEntries(filters) {
    return this.get("/tasks/contexts/", filters)
  }

  async createContextEntry(contextData) {
    return this.post("/tasks/contexts/", contextData)
  }

  async analyzeContext(id) {
    return this.post(`/tasks/contexts/${id}/analyze/`)
  }

  // AI endpoints
  async enhanceTask(taskId) {
    return this.post("/ai/insights/enhance_task/", { task_id: taskId })
  }

  async analyzeContextAI() {
    return this.post("/ai/insights/analyze_context/")
  }

  async getProductivityInsights() {
    return this.get("/ai/insights/productivity_insights/")
  }

  async getAIInsights(filters) {
    return this.get("/ai/insights/", filters)
  }

  async getContextAnalyses() {
    return this.get("/ai/context-analysis/")
  }

  async getProductivityMetrics() {
    return this.get("/ai/productivity-metrics/")
  }

  async getAIProcessingLogs(filters) {
    return this.get("/ai/processing-logs/", filters)
  }

  // Voice-to-Text and Task Extraction
  async transcribeAudio(audioBlob) {
    const formData = new FormData()
    formData.append("file", audioBlob, "audio.wav")
    return fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => data.text)
  }

  async extractTasks(transcribedText) {
    return fetch("/api/extract-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: transcribedText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => data.tasks)
  }
}

// Create and export API client instance
const api = new APIClient(API_BASE_URL)
export { api }

// Health check function
export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL.replace("/api", "")}/health/`, {
      headers: { "Content-Type": "application/json" },
    })
    return response.ok
  } catch {
    return false
  }
}