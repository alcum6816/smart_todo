"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Brain,
  MessageSquare,
  Mail,
  FileText,
  Calendar,
  Loader2,
  Lightbulb,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

// Mock data for context entries
const mockContextEntries = [
  {
    id: "1",
    content:
      "Meeting with client tomorrow at 2 PM to discuss project timeline. They mentioned the deadline is critical for their Q1 launch.",
    source_type: "notes",
    timestamp: "2024-01-07T14:30:00Z",
    processed_insights: {
      key_themes: ["meeting", "deadline", "Q1 launch"],
      urgency_indicators: ["critical", "deadline"],
      sentiment_score: 0.2,
    },
    extracted_keywords: ["meeting", "client", "deadline", "Q1", "launch"],
    is_processed: true,
  },
  {
    id: "2",
    content:
      "Sarah from marketing: 'Can you review the campaign materials by Friday? We need to get approval before the weekend.'",
    source_type: "whatsapp",
    timestamp: "2024-01-07T11:15:00Z",
    processed_insights: {
      key_themes: ["campaign", "review", "approval"],
      urgency_indicators: ["by Friday", "before weekend"],
      sentiment_score: 0.1,
    },
    extracted_keywords: ["Sarah", "marketing", "campaign", "Friday", "approval"],
    is_processed: true,
  },
  {
    id: "3",
    content:
      "Reminder: Doctor appointment next Tuesday at 10 AM. Don't forget to bring insurance card and previous test results.",
    source_type: "notes",
    timestamp: "2024-01-06T16:45:00Z",
    processed_insights: {
      key_themes: ["appointment", "doctor", "reminder"],
      urgency_indicators: ["don't forget"],
      sentiment_score: 0.0,
    },
    extracted_keywords: ["doctor", "appointment", "Tuesday", "insurance", "test results"],
    is_processed: true,
  },
]

interface ContextEntry {
  id: string
  content: string
  source_type: string
  timestamp: string
  processed_insights?: any
  extracted_keywords: string[]
  is_processed: boolean
}

function ContextEntryCard({ entry }: { entry: ContextEntry }) {
  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "notes":
        return <FileText className="h-4 w-4" />
      case "calendar":
        return <Calendar className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getSourceColor = (sourceType: string) => {
    switch (sourceType) {
      case "whatsapp":
        return "bg-green-100 text-green-800"
      case "email":
        return "bg-blue-100 text-blue-800"
      case "notes":
        return "bg-yellow-100 text-yellow-800"
      case "calendar":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSentimentColor = (score: number) => {
    if (score > 0.1) return "text-green-600"
    if (score < -0.1) return "text-red-600"
    return "text-yellow-600"
  }

  const getSentimentLabel = (score: number) => {
    if (score > 0.1) return "Positive"
    if (score < -0.1) return "Negative"
    return "Neutral"
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getSourceColor(entry.source_type)}>
              {getSourceIcon(entry.source_type)}
              <span className="ml-1 capitalize">{entry.source_type}</span>
            </Badge>
            {entry.is_processed && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Processed
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{new Date(entry.timestamp).toLocaleString()}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{entry.content}</p>

        {entry.is_processed && entry.processed_insights && (
          <div className="space-y-3 pt-3 border-t">
            {/* Keywords */}
            {entry.extracted_keywords.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {entry.extracted_keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Urgency Indicators */}
            {entry.processed_insights.urgency_indicators?.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Urgency Indicators</h4>
                <div className="flex flex-wrap gap-1">
                  {entry.processed_insights.urgency_indicators.map((indicator: string, index: number) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {indicator}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Sentiment */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Sentiment Analysis</span>
              <span className={`font-medium ${getSentimentColor(entry.processed_insights.sentiment_score || 0)}`}>
                {getSentimentLabel(entry.processed_insights.sentiment_score || 0)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ContextForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  const [formData, setFormData] = useState({
    content: "",
    source_type: "notes",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.content.trim()) {
      onSubmit(formData)
      setFormData({ content: "", source_type: "notes" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Add Context Entry
        </CardTitle>
        <CardDescription>Add daily context from messages, emails, or notes for AI analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="source_type">Source Type</Label>
            <Select
              value={formData.source_type}
              onValueChange={(value) => setFormData({ ...formData, source_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </div>
                </SelectItem>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </SelectItem>
                <SelectItem value="notes">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notes
                  </div>
                </SelectItem>
                <SelectItem value="calendar">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Calendar
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Paste your WhatsApp messages, email content, or notes here..."
              rows={4}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading || !formData.content.trim()}>
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isLoading ? "Processing with AI..." : "Add & Analyze"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function AIInsightsPanel({ entries }: { entries: ContextEntry[] }) {
  const processedEntries = entries.filter((entry) => entry.is_processed)

  // Calculate insights
  const allKeywords = processedEntries.flatMap((entry) => entry.extracted_keywords)
  const keywordCounts = allKeywords.reduce(
    (acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topKeywords = Object.entries(keywordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([keyword]) => keyword)

  const avgSentiment =
    processedEntries.reduce((sum, entry) => sum + (entry.processed_insights?.sentiment_score || 0), 0) /
    Math.max(processedEntries.length, 1)

  const urgentItems = processedEntries.flatMap((entry) => entry.processed_insights?.urgency_indicators || []).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Context Insights
        </CardTitle>
        <CardDescription>Analysis of your recent context entries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{processedEntries.length}</div>
            <div className="text-xs text-muted-foreground">Processed Entries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{urgentItems}</div>
            <div className="text-xs text-muted-foreground">Urgent Items</div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${avgSentiment > 0 ? "text-green-500" : avgSentiment < 0 ? "text-red-500" : "text-yellow-500"}`}
            >
              {avgSentiment > 0 ? "+" : ""}
              {avgSentiment.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">Avg Sentiment</div>
          </div>
        </div>

        {/* Top Keywords */}
        {topKeywords.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {topKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {keyword}
                  <span className="ml-1 text-xs text-muted-foreground">{keywordCounts[keyword]}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        <div>
          <h4 className="font-medium mb-3">AI Recommendations</h4>
          <ul className="space-y-2 text-sm">
            {urgentItems > 0 && (
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                You have {urgentItems} urgent items that may need immediate attention
              </li>
            )}
            {avgSentiment < -0.2 && (
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                Your recent context shows negative sentiment - consider stress management
              </li>
            )}
            {topKeywords.includes("meeting") && (
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                Multiple meetings detected - consider time blocking for focused work
              </li>
            )}
            <li className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              Based on your context, consider creating tasks for recurring themes
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ContextPage() {
  const [contextEntries, setContextEntries] = useState<ContextEntry[]>(mockContextEntries)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddContext = async (formData: any) => {
    setIsLoading(true)
    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const newEntry: ContextEntry = {
        id: Date.now().toString(),
        content: formData.content,
        source_type: formData.source_type,
        timestamp: new Date().toISOString(),
        extracted_keywords: ["sample", "keywords"], // Mock AI extraction
        processed_insights: {
          key_themes: ["sample", "theme"],
          urgency_indicators: formData.content.toLowerCase().includes("urgent") ? ["urgent"] : [],
          sentiment_score: Math.random() * 2 - 1, // Mock sentiment
        },
        is_processed: true,
      }

      setContextEntries((prev) => [newEntry, ...prev])

      toast({
        title: "Context added successfully",
        description: "AI analysis completed with insights extracted.",
      })
    } catch (error) {
      toast({
        title: "Error adding context",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Context Input</h1>
        <p className="text-muted-foreground">Add daily context for AI-powered task suggestions and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Context Form */}
        <div className="lg:col-span-2 space-y-6">
          <ContextForm onSubmit={handleAddContext} isLoading={isLoading} />

          {/* Context Entries */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Context Entries</h2>
            {contextEntries.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No context entries yet</h3>
                  <p className="text-muted-foreground">
                    Add your first context entry to get AI-powered insights and task suggestions.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {contextEntries.map((entry) => (
                  <ContextEntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Insights Panel */}
        <div>
          <AIInsightsPanel entries={contextEntries} />
        </div>
      </div>
    </div>
  )
}
