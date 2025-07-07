// app/api/extract-tasks/route.js
import { NextResponse } from "next/server"

export async function POST(request) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY

  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
  }

  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }

    const prompt = `
      You are a task extraction assistant. Given the following transcribed text, identify and extract tasks in a structured JSON format. Each task should have the following fields: title (string, required), description (string, optional), priority (string, one of "urgent", "high", "medium", "low", optional, default "medium"), due_date (string, ISO format, optional), category (string, optional). If no tasks are identified, return an empty array. If a due date is mentioned vaguely (e.g., "tomorrow"), convert it to an ISO date relative to today (2025-07-07). If a priority is implied but not stated, infer it based on context (e.g., "urgent" for phrases like "must do now"). Return only the JSON array of tasks.

      Transcribed text: "${text}"

      Example output:
      [
        {
          "title": "Buy groceries",
          "description": "Get milk, eggs, and bread",
          "priority": "medium",
          "due_date": "2025-07-08",
          "category": "Personal"
        }
      ]
    `

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a task extraction assistant." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData }, { status: response.status })
    }

    const data = await response.json()
    const tasks = JSON.parse(data.choices[0].message.content)
    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Task extraction error:", error)
    return NextResponse.json({ error: "Failed to extract tasks" }, { status: 500 })
  }
}