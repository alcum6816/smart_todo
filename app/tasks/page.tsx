"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Brain, Calendar, Clock, AlertTriangle, CheckSquare, Edit, Mic } from "lucide-react"
import { api } from "@/lib/api"
import type { Task, Category, TaskFilters, TaskCreateData } from "@/types"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [filters, setFilters] = useState<TaskFilters>({ status: "all", priority: "all", category: "all" })
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState("medium")
  const [newTaskCategory, setNewTaskCategory] = useState<string | null>(null)
  const [newTaskDueDate, setNewTaskDueDate] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout
    if (searchTerm) {
      debounceTimer = setTimeout(() => {
        loadTasks()
      }, 500) // Debounce for 500ms
    } else {
      loadTasks()
    }
    loadCategories()

    return () => clearTimeout(debounceTimer) // Cleanup
  }, [filters, searchTerm])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const params: Record<string, string> = {}
      if (filters.status && filters.status !== "all") params.status = filters.status
      if (filters.priority && filters.priority !== "all") params.priority = filters.priority
      if (filters.category && filters.category !== "all") params.category = filters.category
      if (searchTerm.trim()) params.search = searchTerm.trim()

      const response = await api.getTasks(params)
      setTasks(response.results)
    } catch (error) {
      console.error("Failed to load tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const categoriesData = await api.getCategories()
      setCategories(Array.isArray(categoriesData) ? categoriesData : [])
    } catch (error) {
      console.error("Failed to load categories:", error)
    }
  }

  const handleSearch = () => {
    loadTasks()
  }

  const handleTaskToggle = async (taskId: string) => {
    try {
      const updatedTask = await api.toggleTaskStatus(taskId)
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)))
    } catch (error) {
      console.error("Failed to toggle task:", error)
    }
  }

  const handleTaskSelect = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId])
    } else {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId))
    }
  }

  const handleBulkUpdate = async (updateData: any) => {
    if (selectedTasks.length === 0) return

    try {
      await api.bulkUpdateTasks({
        task_ids: selectedTasks,
        update_data: updateData,
      })
      setSelectedTasks([])
      loadTasks()
    } catch (error) {
      console.error("Failed to bulk update tasks:", error)
    }
  }

  const handleEnhanceTask = async (taskId: string) => {
    try {
      await api.enhanceTask(taskId)
      loadTasks()
    } catch (error) {
      console.error("Failed to enhance task:", error)
    }
  }

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) {
      alert("Task title is required")
      return
    }

    try {
      await api.createTask({
        title: newTaskTitle,
        description: newTaskDescription,
        priority: newTaskPriority,
        category: newTaskCategory === "none" ? undefined : newTaskCategory,
        due_date: newTaskDueDate || undefined,
      })
      setShowCreateModal(false)
      setNewTaskTitle("")
      setNewTaskDescription("")
      setNewTaskPriority("medium")
      setNewTaskCategory(null)
      setNewTaskDueDate("")
      loadTasks()
    } catch (err) {
      console.error("Failed to create task", err)
      alert("Failed to create task")
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setAudioBlob(audioBlob)
        try {
          const transcribedText = await api.transcribeAudio(audioBlob)
          const extractedTasks = await api.extractTasks(transcribedText)
          for (const task of extractedTasks) {
            await api.createTask(task)
          }
          loadTasks()
        } catch (error) {
          console.error("Failed to process audio:", error)
          alert("Failed to process audio")
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Failed to start recording:", error)
      alert("Failed to access microphone")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500 bg-red-50"
      case "high":
        return "border-l-orange-500 bg-orange-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive"
      case "high":
        return "secondary"
      case "medium":
        return "outline"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage and organize your tasks efficiently</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
          <Button onClick={isRecording ? stopRecording : startRecording} variant={isRecording ? "destructive" : "outline"}>
            <Mic className="h-4 w-4 mr-2" />
            {isRecording ? "Stop Recording" : "Record Task"}
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleSearch}>
              <Filter className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{selectedTasks.length} task(s) selected</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkUpdate({ status: "completed" })}>
                  Mark Complete
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkUpdate({ priority: "high" })}>
                  Set High Priority
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedTasks([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first task</p>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card
              key={task.id}
              className={`border-l-4 ${getPriorityColor(task.priority)} ${task.status === "completed" ? "opacity-60" : ""}`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={(checked) => handleTaskSelect(task.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-medium ${task.status === "completed" ? "line-through" : ""}`}>
                          {task.title}
                        </h3>
                        {task.ai_enhanced && (
                          <Badge variant="outline" className="text-blue-600">
                            <Brain className="h-3 w-3 mr-1" />
                            AI Enhanced
                          </Badge>
                        )}
                        {task.is_overdue && (
                          <Badge variant="destructive">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                      {task.description && <p className="text-gray-600 text-sm mb-2">{task.description}</p>}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {task.due_date && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(task.due_date)}
                          </div>
                        )}
                        {task.estimated_duration && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {task.estimated_duration} min
                          </div>
                        )}
                        {task.category_name && (
                          <Badge
                            variant="secondary"
                            style={{ backgroundColor: task.category_color + "20", color: task.category_color }}
                          >
                            {task.category_name}
                          </Badge>
                        )}
                      </div>
                      {task.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                    <div className="flex items-center gap-1">
                      {!task.ai_enhanced && (
                        <Button size="sm" variant="outline" onClick={() => handleEnhanceTask(task.id)}>
                          <Brain className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleTaskToggle(task.id)}>
                        <CheckSquare className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <Input
                placeholder="Description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
              <Input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
              />
              <Select value={newTaskPriority} onValueChange={setNewTaskPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newTaskCategory ?? "none"}
                onValueChange={(val) => setNewTaskCategory(val === "none" ? null : val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end mt-6 gap-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}