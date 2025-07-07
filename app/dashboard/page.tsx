"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckSquare, Clock, AlertTriangle, TrendingUp, Brain, Calendar, Target } from "lucide-react"
import { api } from "@/lib/api"
import type { Task, TaskStats, ProductivityInsights } from "@/types"
import Link from "next/link"
import { BarChart3 } from "lucide-react" // Import BarChart3

export default function DashboardPage() {
  const [stats, setStats] = useState<TaskStats | null>(null)
  const [todayTasks, setTodayTasks] = useState<Task[]>([])
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([])
  const [insights, setInsights] = useState<ProductivityInsights | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      const [statsData, todayData, upcomingData, overdueData, insightsData] = await Promise.all([
        api.getTaskStats(),
        api.getTodayTasks(),
        api.getUpcomingTasks(),
        api.getOverdueTasks(),
        api.getProductivityInsights().catch(() => null),
      ])

      setStats(statsData)
      setTodayTasks(todayData)
      setUpcomingTasks(upcomingData)
      setOverdueTasks(overdueData)
      setInsights(insightsData)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your productivity overview.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/tasks">
            <Button>View All Tasks</Button>
          </Link>
          <Link href="/analytics">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_tasks || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.pending_tasks || 0} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completed_tasks || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.completion_rate || 0}% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.overdue_tasks || 0}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights?.insights?.productivity_score || 0}%</div>
            <Progress value={insights?.insights?.productivity_score || 0} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Today's Tasks
            </CardTitle>
            <CardDescription>Tasks due today or created today</CardDescription>
          </CardHeader>
          <CardContent>
            {todayTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No tasks for today</p>
            ) : (
              <div className="space-y-3">
                {todayTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600 truncate">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                      {task.ai_enhanced && (
                        <Badge variant="outline" className="text-blue-600">
                          <Brain className="h-3 w-3 mr-1" />
                          AI
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                {todayTasks.length > 5 && (
                  <div className="text-center pt-2">
                    <Link href="/tasks">
                      <Button variant="outline" size="sm">
                        View all {todayTasks.length} tasks
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              AI Insights
            </CardTitle>
            <CardDescription>Personalized productivity insights</CardDescription>
          </CardHeader>
          <CardContent>
            {insights?.insights ? (
              <div className="space-y-4">
                {insights.insights.recommendations?.slice(0, 3).map((rec, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">{rec}</p>
                  </div>
                ))}

                {insights.insights.strengths?.length > 0 && (
                  <div>
                    <h5 className="font-medium text-green-700 mb-2">Strengths</h5>
                    <ul className="text-sm text-green-600 space-y-1">
                      {insights.insights.strengths.slice(0, 2).map((strength, index) => (
                        <li key={index}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link href="/analytics">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Full Analysis
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <Brain className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">AI insights will appear here</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={loadDashboardData}>
                  Generate Insights
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Overdue and Upcoming Tasks */}
      {(overdueTasks.length > 0 || upcomingTasks.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Overdue Tasks */}
          {overdueTasks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Overdue Tasks
                </CardTitle>
                <CardDescription>Tasks that need immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {overdueTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-red-800">{task.title}</h4>
                        <p className="text-sm text-red-600">
                          Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No date"}
                        </p>
                      </div>
                      <Badge variant="destructive">{task.priority}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Tasks */}
          {upcomingTasks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Upcoming Tasks
                </CardTitle>
                <CardDescription>Tasks due in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-600">
                          Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No date"}
                        </p>
                      </div>
                      <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
