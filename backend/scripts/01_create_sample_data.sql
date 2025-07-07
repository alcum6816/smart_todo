-- Sample Categories
INSERT INTO tasks_category (id, name, color, icon, description, usage_count, created_at, updated_at) VALUES
(gen_random_uuid(), 'Work', '#3B82F6', 'briefcase', 'Work-related tasks and projects', 15, NOW(), NOW()),
(gen_random_uuid(), 'Personal', '#10B981', 'user', 'Personal tasks and activities', 8, NOW(), NOW()),
(gen_random_uuid(), 'Health', '#EF4444', 'heart', 'Health and fitness related tasks', 5, NOW(), NOW()),
(gen_random_uuid(), 'Learning', '#8B5CF6', 'book', 'Educational and learning tasks', 12, NOW(), NOW()),
(gen_random_uuid(), 'Finance', '#F59E0B', 'dollar-sign', 'Financial and money-related tasks', 3, NOW(), NOW());

-- Sample Tasks
WITH categories AS (
    SELECT id, name FROM tasks_category WHERE name IN ('Work', 'Personal', 'Health', 'Learning', 'Finance')
)
INSERT INTO tasks_task (
    id, title, description, priority, status, due_date, created_at, updated_at,
    ai_enhanced, ai_enhanced_description, ai_estimated_duration, priority_score,
    tags, estimated_duration, category_id
) VALUES
-- Work Tasks
(gen_random_uuid(), 'Complete Q4 Report', 'Finish the quarterly business report with all metrics and analysis', 'high', 'in_progress', NOW() + INTERVAL '3 days', NOW() - INTERVAL '2 days', NOW(), true, 'Break down into sections: executive summary, financial metrics, market analysis, and recommendations. Allocate 2 hours for data gathering, 3 hours for analysis, and 1 hour for formatting.', '6 hours', 0.85, '["report", "quarterly", "business"]', 360, (SELECT id FROM categories WHERE name = 'Work')),

(gen_random_uuid(), 'Team Meeting Preparation', 'Prepare agenda and materials for weekly team meeting', 'medium', 'pending', NOW() + INTERVAL '1 day', NOW() - INTERVAL '1 day', NOW(), true, 'Create agenda with: project updates, blockers discussion, next week priorities. Prepare status slides and gather team input beforehand.', '1.5 hours', 0.65, '["meeting", "team", "agenda"]', 90, (SELECT id FROM categories WHERE name = 'Work')),

(gen_random_uuid(), 'Code Review - Authentication Module', 'Review pull request for new authentication system', 'high', 'pending', NOW() + INTERVAL '2 days', NOW(), NOW(), false, '', '', 0.80, '["code-review", "authentication", "security"]', 120, (SELECT id FROM categories WHERE name = 'Work')),

-- Personal Tasks
(gen_random_uuid(), 'Plan Weekend Trip', 'Research and book accommodation for weekend getaway', 'low', 'pending', NOW() + INTERVAL '5 days', NOW() - INTERVAL '1 day', NOW(), true, 'Research destinations within 3-hour drive, compare hotel prices, check weather forecast, and make reservations. Consider activities and restaurant options.', '2 hours', 0.35, '["travel", "weekend", "planning"]', 120, (SELECT id FROM categories WHERE name = 'Personal')),

(gen_random_uuid(), 'Grocery Shopping', 'Buy groceries for the week including meal prep ingredients', 'medium', 'pending', NOW() + INTERVAL '1 day', NOW(), NOW(), false, '', '', 0.55, '["groceries", "meal-prep", "weekly"]', 60, (SELECT id FROM categories WHERE name = 'Personal')),

-- Health Tasks
(gen_random_uuid(), 'Doctor Appointment', 'Annual checkup with primary care physician', 'medium', 'pending', NOW() + INTERVAL '7 days', NOW() - INTERVAL '3 days', NOW(), false, '', '', 0.60, '["health", "checkup", "doctor"]', 90, (SELECT id FROM categories WHERE name = 'Health')),

(gen_random_uuid(), 'Gym Workout - Leg Day', 'Complete leg workout routine at the gym', 'low', 'completed', NOW() - INTERVAL '1 day', NOW() - INTERVAL '2 days', NOW(), true, 'Focus on compound movements: squats, deadlifts, lunges. Include 10-minute warm-up and 5-minute cool-down stretching.', '1 hour', 0.40, '["gym", "workout", "legs"]', 60, (SELECT id FROM categories WHERE name = 'Health')),

-- Learning Tasks
(gen_random_uuid(), 'Complete React Course Module 5', 'Finish advanced hooks section and complete exercises', 'medium', 'in_progress', NOW() + INTERVAL '4 days', NOW() - INTERVAL '2 days', NOW(), true, 'Cover useContext, useReducer, and custom hooks. Complete 3 coding exercises and build a mini-project using the learned concepts.', '3 hours', 0.70, '["react", "programming", "course"]', 180, (SELECT id FROM categories WHERE name = 'Learning')),

(gen_random_uuid(), 'Read "Atomic Habits" Chapter 3-5', 'Continue reading productivity book', 'low', 'pending', NOW() + INTERVAL '6 days', NOW(), NOW(), false, '', '', 0.30, '["reading", "productivity", "habits"]', 45, (SELECT id FROM categories WHERE name = 'Learning')),

-- Finance Tasks
(gen_random_uuid(), 'Review Monthly Budget', 'Analyze spending patterns and adjust budget categories', 'high', 'pending', NOW() + INTERVAL '2 days', NOW(), NOW(), true, 'Export bank statements, categorize expenses, compare with budget targets, identify areas for improvement, and update budget spreadsheet.', '2 hours', 0.75, '["budget", "finance", "monthly"]', 120, (SELECT id FROM categories WHERE name = 'Finance')),

(gen_random_uuid(), 'File Tax Documents', 'Organize and file Q3 tax-related documents', 'medium', 'completed', NOW() - INTERVAL '5 days', NOW() - INTERVAL '7 days', NOW(), false, '', '', 0.50, '["taxes", "documents", "filing"]', 30, (SELECT id FROM categories WHERE name = 'Finance'));

-- Sample Context Entries
INSERT INTO tasks_contextentry (
    id, content, source_type, timestamp, is_processed, processed_at,
    extracted_keywords, sentiment_score, urgency_indicators, deadline_mentions,
    processed_insights, source_metadata
) VALUES
(gen_random_uuid(), 'Meeting with client tomorrow at 2 PM to discuss project requirements and timeline', 'calendar', NOW() - INTERVAL '1 hour', true, NOW() - INTERVAL '30 minutes', '["meeting", "client", "project", "requirements"]', 0.1, '["tomorrow", "2 PM"]', '["tomorrow at 2 PM"]', '{"priority": "high", "category": "work", "estimated_duration": "1 hour"}', '{"calendar_id": "cal_123", "attendees": ["client@company.com"]}'),

(gen_random_uuid(), 'Remember to pick up dry cleaning before 6 PM today', 'notes', NOW() - INTERVAL '2 hours', true, NOW() - INTERVAL '1 hour', '["dry cleaning", "pickup"]', 0.0, '["before 6 PM", "today"]', '["before 6 PM today"]', '{"priority": "medium", "category": "personal", "estimated_duration": "20 minutes"}', '{"note_app": "apple_notes", "location": "home"}'),

(gen_random_uuid(), 'Email from boss: Please prepare the quarterly report by Friday', 'email', NOW() - INTERVAL '3 hours', true, NOW() - INTERVAL '2 hours', '["quarterly report", "boss", "Friday"]', -0.2, '["by Friday"]', '["by Friday"]', '{"priority": "high", "category": "work", "estimated_duration": "4 hours"}', '{"sender": "boss@company.com", "subject": "Q4 Report Deadline"}'),

(gen_random_uuid(), 'Voice note: Schedule dentist appointment for next month', 'voice', NOW() - INTERVAL '4 hours', false, NULL, '[]', 0.0, '["next month"]', '["next month"]', '{}', '{"duration": "15 seconds", "transcription_confidence": 0.95}'),

(gen_random_uuid(), 'Chat message: Can you review the authentication module PR when you have time?', 'chat', NOW() - INTERVAL '5 hours', true, NOW() - INTERVAL '4 hours', '["review", "authentication", "module", "PR"]', 0.1, '["when you have time"]', '[]', '{"priority": "medium", "category": "work", "estimated_duration": "2 hours"}', '{"platform": "slack", "channel": "dev-team", "sender": "john.doe"}');

-- Sample AI Insights
INSERT INTO ai_engine_aiinsight (
    id, insight_type, title, description, data, confidence_score, is_active, created_at, expires_at
) VALUES
(gen_random_uuid(), 'productivity', 'High Morning Productivity', 'You tend to complete more tasks between 9-11 AM. Consider scheduling important work during this time.', '{"peak_hours": [9, 10, 11], "completion_rate": 0.85, "task_types": ["work", "learning"]}', 0.87, true, NOW() - INTERVAL '1 day', NOW() + INTERVAL '7 days'),

(gen_random_uuid(), 'pattern', 'Overdue Task Pattern', 'Tasks with estimated duration over 2 hours tend to become overdue. Consider breaking them into smaller subtasks.', '{"overdue_threshold": 120, "success_rate_small_tasks": 0.92, "success_rate_large_tasks": 0.64}', 0.79, true, NOW() - INTERVAL '2 days', NOW() + INTERVAL '14 days'),

(gen_random_uuid(), 'recommendation', 'Category Organization', 'Consider creating a "Urgent" category for high-priority tasks that need immediate attention.', '{"current_categories": 5, "high_priority_tasks": 8, "suggested_workflow": "urgent_category"}', 0.72, true, NOW() - INTERVAL '3 days', NOW() + INTERVAL '30 days'),

(gen_random_uuid(), 'optimization', 'Batch Similar Tasks', 'You have multiple tasks related to code review. Consider batching them together for better focus.', '{"similar_tasks": ["code review", "testing", "documentation"], "efficiency_gain": 0.25}', 0.81, true, NOW() - INTERVAL '1 day', NOW() + INTERVAL '7 days');

-- Sample Context Analysis
INSERT INTO ai_engine_contextanalysis (
    id, analysis_date, context_summary, key_themes, urgency_indicators,
    suggested_actions, productivity_score, focus_areas
) VALUES
(gen_random_uuid(), NOW() - INTERVAL '1 day', 'Recent context shows a focus on work-related tasks with several upcoming deadlines. High engagement with learning activities and some personal task management needs.', '["work deadlines", "learning progress", "personal organization"]', '["quarterly report due Friday", "client meeting tomorrow", "dry cleaning pickup today"]', '["prioritize quarterly report", "prepare for client meeting", "batch personal errands"]', 78.5, '["work productivity", "deadline management", "learning consistency"]'),

(gen_random_uuid(), NOW() - INTERVAL '3 days', 'Context indicates balanced approach between professional and personal development with good health awareness.', '["work-life balance", "skill development", "health consciousness"]', '["doctor appointment scheduled", "course deadline approaching"]', '["maintain current balance", "allocate focused time for learning", "prepare health questions"]', 82.3, '["time management", "skill building", "health maintenance"]');

-- Sample Productivity Metrics
INSERT INTO ai_engine_productivitymetrics (
    id, date, tasks_completed, tasks_created, average_completion_time,
    productivity_score, focus_time, distraction_events, peak_productivity_hour
) VALUES
(gen_random_uuid(), CURRENT_DATE - INTERVAL '1 day', 5, 7, 1.5, 78.5, 6.5, 3, 10),
(gen_random_uuid(), CURRENT_DATE - INTERVAL '2 days', 3, 4, 2.1, 82.3, 5.2, 2, 9),
(gen_random_uuid(), CURRENT_DATE - INTERVAL '3 days', 6, 8, 1.8, 75.0, 7.1, 4, 11),
(gen_random_uuid(), CURRENT_DATE - INTERVAL '4 days', 4, 6, 1.9, 71.2, 4.8, 5, 10),
(gen_random_uuid(), CURRENT_DATE - INTERVAL '5 days', 7, 9, 1.4, 85.7, 8.2, 1, 9),
(gen_random_uuid(), CURRENT_DATE - INTERVAL '6 days', 2, 5, 2.5, 65.4, 3.5, 6, 14),
(gen_random_uuid(), CURRENT_DATE - INTERVAL '7 days', 5, 6, 1.7, 79.8, 6.8, 2, 10);

-- Sample AI Processing Logs
INSERT INTO ai_engine_aiprocessinglog (
    id, operation_type, input_data, output_data, processing_time, success, error_message, timestamp
) VALUES
(gen_random_uuid(), 'task_enhancement', '{"task_id": "task_123", "task_title": "Complete Q4 Report"}', '{"enhanced_description": "Break down into sections...", "estimated_duration": "6 hours"}', 2.3, true, '', NOW() - INTERVAL '2 hours'),

(gen_random_uuid(), 'context_analysis', '{"task_count": 15, "context_count": 8}', '{"patterns": ["work focus", "deadline pressure"], "recommendations": ["time blocking", "priority matrix"]}', 4.7, true, '', NOW() - INTERVAL '1 day'),

(gen_random_uuid(), 'productivity_analysis', '{"date_range": "7 days", "task_count": 42}', '{"productivity_score": 78.5, "insights": ["morning productivity peak"]}', 1.8, true, '', NOW() - INTERVAL '3 hours'),

(gen_random_uuid(), 'voice_processing', '{"audio_duration": "15 seconds"}', '{"transcription": "Schedule dentist appointment", "confidence": 0.95}', 0.8, true, '', NOW() - INTERVAL '4 hours'),

(gen_random_uuid(), 'pattern_recognition', '{"analysis_type": "task_completion"}', '{}', 0.0, false, 'OpenAI API rate limit exceeded', NOW() - INTERVAL '6 hours');
