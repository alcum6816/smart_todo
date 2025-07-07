import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, CheckSquare, BarChart3, Calendar, Mic } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-12 w-12 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Smart Todo AI</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Intelligent task management powered by AI. Organize, prioritize, and complete your tasks with smart insights.
        </p>
      </header>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CheckSquare className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Smart Task Management</CardTitle>
            <CardDescription>Create, organize, and track tasks with AI-powered enhancements</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Automatic priority scoring</li>
              <li>• Smart categorization</li>
              <li>• Deadline suggestions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Mic className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Voice Task Input</CardTitle>
            <CardDescription>Create tasks naturally using voice commands with OpenAI integration</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Speech-to-text conversion</li>
              <li>• AI task enhancement</li>
              <li>• Smart context extraction</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>AI Analytics</CardTitle>
            <CardDescription>Get insights into your productivity patterns and habits</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Productivity scoring</li>
              <li>• Pattern recognition</li>
              <li>• Personalized recommendations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Calendar className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Multiple Views</CardTitle>
            <CardDescription>View your tasks in list, kanban, or calendar format</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• List view with filters</li>
              <li>• Kanban board</li>
              <li>• Calendar integration</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Brain className="h-8 w-8 text-indigo-600 mb-2" />
            <CardTitle>Context Analysis</CardTitle>
            <CardDescription>AI analyzes your daily context to suggest relevant tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Email integration</li>
              <li>• Meeting analysis</li>
              <li>• Smart suggestions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CheckSquare className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>Bulk Operations</CardTitle>
            <CardDescription>Efficiently manage multiple tasks with bulk actions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Bulk status updates</li>
              <li>• Category assignment</li>
              <li>• Priority changes</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to boost your productivity?</h2>
          <p className="text-gray-600 mb-6">
            Start managing your tasks intelligently with AI-powered insights and automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/tasks">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                View Tasks
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500">
        <p>&copy; 2025 Smart Todo AI. Powered by OpenAI and Supabase.</p>
      </footer>
    </div>
  )
}
