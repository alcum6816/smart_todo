import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Clock, Target, Brain, Calendar, CheckSquare } from "lucide-react"

// Mock analytics data
const mockAnalytics = {
  productivity_metrics: {
    completion_rate: 68,
    avg_task_duration: "2.5 hours",
    tasks_completed_this_week: 12,
    tasks_completed_last_week: 8,
    productivity_trend: "up",
  },
  priority_distribution: {
    urgent: 3,
    high: 8,
    medium: 15,
    low: 6,
  },
  category_performance: [
    { name: "Work", completed: 18, total: 25, completion_rate: 72 },
    { name: "Personal", completed: 8, total: 12, completion_rate: 67 },
    { name: "Health", completed: 4, total: 5, completion_rate: 80 },
    { name: "Learning", completed: 2, total: 6, completion_rate: 33 },
  ],
  ai_insights: {
    most_productive_time: "9:00 AM - 11:00 AM",
    avg_priority_accuracy: 87,
    context_relevance_score: 0.74,
    ai_suggestions_followed: 23,
    ai_suggestions_total: 31,
  },
  weekly_progress: [
    { day: "Mon", completed: 3, created: 4 },
    { day: "Tue", completed: 2, created: 3 },
    { day: "Wed", completed: 4, created: 2 },
    { day: "Thu", completed: 1, created: 5 },
    { day: "Fri", completed: 2, created: 1 },
    { day: "Sat", completed: 0, created: 2 },
    { day: "Sun", completed: 1, created: 1 },
  ],
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: {
  title: string
  value: string | number
  subtitle: string
  icon: any
  trend?: "up" | "down" | "neutral"
}) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${getTrendColor()}`}>
          {trend === "up" && "↗ "}
          {trend === "down" && "↘ "}
          {subtitle}
        </p>
      </CardContent>
    </Card>
  )
}

function PriorityDistributionChart({ data }: { data: any }) {
  const total = Object.values(data).reduce((sum: number, count: any) => sum + count, 0)

  const priorityColors = {
    urgent: "bg-red-500",
    high: "bg-orange-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Priority Distribution
        </CardTitle>
        <CardDescription>Breakdown of tasks by priority level</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(data).map(([priority, count]: [string, any]) => (
          <div key={priority} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="capitalize font-medium">{priority}</span>
              <span>
                {count} tasks ({Math.round((count / total) * 100)}%)
              </span>
            </div>
            <Progress value={(count / total) * 100} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function CategoryPerformanceChart({ data }: { data: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Category Performance
        </CardTitle>
        <CardDescription>Completion rates by task category</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{category.name}</span>
              <div className="text-sm text-muted-foreground">
                {category.completed}/{category.total} tasks
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={category.completion_rate} className="flex-1 h-2" />
              <span className="text-sm font-medium w-12">{category.completion_rate}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function AIInsightsCard({ insights }: { insights: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Performance Insights
        </CardTitle>
        <CardDescription>How AI is helping optimize your productivity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{insights.avg_priority_accuracy}%</div>
            <div className="text-xs text-muted-foreground">Priority Accuracy</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{Math.round(insights.context_relevance_score * 100)}%</div>
            <div className="text-xs text-muted-foreground">Context Relevance</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>AI Suggestions Followed</span>
            <span className="font-medium">
              {insights.ai_suggestions_followed}/{insights.ai_suggestions_total}
            </span>
          </div>
          <Progress value={(insights.ai_suggestions_followed / insights.ai_suggestions_total) * 100} className="h-2" />
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">Most Productive Time:</span>
            <Badge variant="outline">{insights.most_productive_time}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WeeklyProgressChart({ data }: { data: any[] }) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.completed, d.created)))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Weekly Progress
        </CardTitle>
        <CardDescription>Tasks created vs completed this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((day) => (
            <div key={day.day} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium w-12">{day.day}</span>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Created: {day.created}</span>
                  <span>Completed: {day.completed}</span>
                </div>
              </div>
              <div className="flex gap-1 h-2">
                <div className="bg-blue-500 rounded-sm" style={{ width: `${(day.created / maxValue) * 100}%` }} />
                <div className="bg-green-500 rounded-sm" style={{ width: `${(day.completed / maxValue) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm" />
            <span>Created</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <span>Completed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  const data = mockAnalytics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
        <p className="text-muted-foreground">Track your productivity and AI-powered task management performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Completion Rate"
          value={`${data.productivity_metrics.completion_rate}%`}
          subtitle="vs last week"
          icon={CheckSquare}
          trend="up"
        />
        <MetricCard
          title="Avg Task Duration"
          value={data.productivity_metrics.avg_task_duration}
          subtitle="per task"
          icon={Clock}
          trend="neutral"
        />
        <MetricCard
          title="Tasks This Week"
          value={data.productivity_metrics.tasks_completed_this_week}
          subtitle={`+${data.productivity_metrics.tasks_completed_this_week - data.productivity_metrics.tasks_completed_last_week} from last week`}
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="AI Accuracy"
          value={`${data.ai_insights.avg_priority_accuracy}%`}
          subtitle="priority predictions"
          icon={Brain}
          trend="up"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriorityDistributionChart data={data.priority_distribution} />
        <CategoryPerformanceChart data={data.category_performance} />
        <AIInsightsCard insights={data.ai_insights} />
        <WeeklyProgressChart data={data.weekly_progress} />
      </div>

      {/* Insights Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>Personalized recommendations based on your productivity patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-green-600">✓ What's Working Well</h4>
              <ul className="space-y-2 text-sm">
                <li>• Your completion rate has improved by 15% this week</li>
                <li>• Health category has the highest completion rate (80%)</li>
                <li>• You're most productive between 9-11 AM</li>
                <li>• AI priority suggestions are 87% accurate</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-orange-600">⚠ Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li>• Learning category has low completion rate (33%)</li>
                <li>• Consider breaking down large tasks into smaller ones</li>
                <li>• You have 3 urgent tasks that need immediate attention</li>
                <li>• Try scheduling important tasks during your peak hours</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
