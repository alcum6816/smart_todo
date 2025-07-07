import openai from '../utils/openaiClient';

/**
 * Generates AI insights for productivity analytics
 * @param {Object} userData - User productivity data
 * @returns {Promise<Array>} Array of AI-generated insights
 */
export async function generateProductivityInsights(userData) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a productivity AI assistant. Analyze the user's productivity data and provide actionable insights. Format your response as a JSON array of insights with the following structure:
          [{
            "id": number,
            "type": "optimization|habit|workload|focus|scheduling|efficiency",
            "title": "string",
            "category": "string",
            "description": "string",
            "analysis": "string",
            "recommendations": ["string"],
            "metrics": [{"label": "string", "value": "string"}],
            "impact": "high|medium|low",
            "generatedAt": "string"
          }]`
        },
        {
          role: 'user',
          content: `Analyze my productivity data: ${JSON.stringify(userData)}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'productivity_insights',
          schema: {
            type: 'object',
            properties: {
              insights: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    type: { type: 'string' },
                    title: { type: 'string' },
                    category: { type: 'string' },
                    description: { type: 'string' },
                    analysis: { type: 'string' },
                    recommendations: { type: 'array', items: { type: 'string' } },
                    metrics: { 
                      type: 'array', 
                      items: {
                        type: 'object',
                        properties: {
                          label: { type: 'string' },
                          value: { type: 'string' }
                        }
                      }
                    },
                    impact: { type: 'string' },
                    generatedAt: { type: 'string' }
                  },
                  required: ['id', 'type', 'title', 'category', 'description', 'analysis', 'recommendations', 'metrics', 'impact', 'generatedAt']
                }
              }
            },
            required: ['insights'],
            additionalProperties: false
          }
        }
      },
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.insights;
  } catch (error) {
    console.error('Error generating productivity insights:', error);
    throw error;
  }
}

/**
 * Generates productivity patterns analysis
 * @param {Object} userData - User productivity data
 * @returns {Promise<Array>} Array of productivity patterns
 */
export async function generateProductivityPatterns(userData) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a productivity AI assistant. Analyze the user's data and identify productivity patterns. Format your response as a JSON array with the following structure:
          [{
            "id": number,
            "title": "string",
            "insight": "string",
            "recommendation": "string",
            "confidence": number,
            "icon": "string"
          }]`
        },
        {
          role: 'user',
          content: `Analyze my productivity patterns: ${JSON.stringify(userData)}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'productivity_patterns',
          schema: {
            type: 'object',
            properties: {
              patterns: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    insight: { type: 'string' },
                    recommendation: { type: 'string' },
                    confidence: { type: 'number' },
                    icon: { type: 'string' }
                  },
                  required: ['id', 'title', 'insight', 'recommendation', 'confidence', 'icon']
                }
              }
            },
            required: ['patterns'],
            additionalProperties: false
          }
        }
      },
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.patterns;
  } catch (error) {
    console.error('Error generating productivity patterns:', error);
    throw error;
  }
}

/**
 * Generates AI recommendations for productivity improvement
 * @param {Object} userData - User productivity data
 * @returns {Promise<Array>} Array of AI recommendations
 */
export async function generateRecommendations(userData) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a productivity AI assistant. Generate actionable recommendations based on the user's data. Format your response as a JSON array with the following structure:
          [{
            "id": number,
            "type": "workflow|scheduling|automation|focus|habit",
            "title": "string",
            "description": "string",
            "impact": "High|Medium|Low",
            "effort": "Low|Medium|High",
            "icon": "string"
          }]`
        },
        {
          role: 'user',
          content: `Generate recommendations for: ${JSON.stringify(userData)}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'recommendations',
          schema: {
            type: 'object',
            properties: {
              recommendations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    type: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    impact: { type: 'string' },
                    effort: { type: 'string' },
                    icon: { type: 'string' }
                  },
                  required: ['id', 'type', 'title', 'description', 'impact', 'effort', 'icon']
                }
              }
            },
            required: ['recommendations'],
            additionalProperties: false
          }
        }
      },
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}

/**
 * Processes voice input and extracts task details using OpenAI
 * @param {string} voiceText - Transcribed voice input
 * @returns {Promise<Object>} Extracted task details
 */
export async function processVoiceTask(voiceText) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a task management AI assistant. Extract task details from voice input and return structured data. Format your response as JSON with the following structure:
          {
            "title": "string",
            "description": "string",
            "priority": "high|medium|low",
            "category": "work|personal|health|learning|other",
            "dueDate": "ISO string or null",
            "aiEstimate": "string (e.g., '30 min')",
            "aiTags": ["string"],
            "aiInsights": "string"
          }`
        },
        {
          role: 'user',
          content: `Extract task details from: "${voiceText}"`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'task_details',
          schema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              priority: { type: 'string' },
              category: { type: 'string' },
              dueDate: { type: ['string', 'null'] },
              aiEstimate: { type: 'string' },
              aiTags: { type: 'array', items: { type: 'string' } },
              aiInsights: { type: 'string' }
            },
            required: ['title', 'description', 'priority', 'category', 'dueDate', 'aiEstimate', 'aiTags', 'aiInsights'],
            additionalProperties: false
          }
        }
      },
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content);
    return {
      id: Date.now(),
      ...result,
      completed: false,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error processing voice task:', error);
    throw error;
  }
}

/**
 * Transcribes audio using OpenAI Whisper
 * @param {File} audioFile - Audio file to transcribe
 * @returns {Promise<string>} Transcribed text
 */
export async function transcribeAudio(audioFile) {
  try {
    const response = await openai.audio.transcriptions.create({
      model: 'whisper-1',
      file: audioFile,
    });

    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
}

/**
 * Generates AI summary for productivity analytics
 * @param {Object} analyticsData - Analytics data
 * @returns {Promise<string>} AI-generated summary
 */
export async function generateProductivitySummary(analyticsData) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a productivity AI assistant. Generate a comprehensive summary of the user\'s productivity data. Keep it concise but insightful, highlighting key patterns and recommendations.'
        },
        {
          role: 'user',
          content: `Generate a productivity summary for: ${JSON.stringify(analyticsData)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating productivity summary:', error);
    throw error;
  }
}
