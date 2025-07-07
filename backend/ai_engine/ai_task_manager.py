import openai
import json
import logging
from django.conf import settings
from typing import Dict, List, Optional
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class AITaskManager:
    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None
        
    def enhance_task(self, task_data: Dict) -> Dict:
        """Enhance a task using AI"""
        if not self.client:
            logger.warning("OpenAI API key not configured")
            return task_data
            
        try:
            prompt = self._create_enhancement_prompt(task_data)
            
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a productivity assistant that helps enhance task descriptions and provides intelligent suggestions."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            enhancement = self._parse_enhancement_response(response.choices[0].message.content)
            return {**task_data, **enhancement}
            
        except Exception as e:
            logger.error(f"Error enhancing task: {str(e)}")
            return task_data
    
    def suggest_priority(self, task_data: Dict, context: Dict = None) -> str:
        """Suggest task priority based on content and context"""
        if not self.client:
            return task_data.get('priority', 'medium')
            
        try:
            prompt = self._create_priority_prompt(task_data, context)
            
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a task prioritization expert. Analyze tasks and suggest appropriate priority levels."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=100,
                temperature=0.3
            )
            
            priority_text = response.choices[0].message.content.strip().lower()
            
            # Map AI response to valid priority choices
            if 'urgent' in priority_text or 'critical' in priority_text:
                return 'urgent'
            elif 'high' in priority_text or 'important' in priority_text:
                return 'high'
            elif 'low' in priority_text or 'minor' in priority_text:
                return 'low'
            else:
                return 'medium'
                
        except Exception as e:
            logger.error(f"Error suggesting priority: {str(e)}")
            return task_data.get('priority', 'medium')
    
    def suggest_deadline(self, task_data: Dict) -> Optional[datetime]:
        """Suggest a deadline for the task"""
        if not self.client:
            return None
            
        try:
            prompt = self._create_deadline_prompt(task_data)
            
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a project management assistant. Suggest realistic deadlines for tasks based on their complexity and urgency."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=150,
                temperature=0.3
            )
            
            deadline_suggestion = response.choices[0].message.content.strip()
            return self._parse_deadline_suggestion(deadline_suggestion)
            
        except Exception as e:
            logger.error(f"Error suggesting deadline: {str(e)}")
            return None
    
    def analyze_context(self, tasks: List[Dict], user_data: Dict = None) -> Dict:
        """Analyze user's task context and provide insights"""
        if not self.client:
            return {"insights": [], "recommendations": []}
            
        try:
            prompt = self._create_context_analysis_prompt(tasks, user_data)
            
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a productivity analyst. Analyze task patterns and provide actionable insights."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=800,
                temperature=0.7
            )
            
            return self._parse_context_analysis(response.choices[0].message.content)
            
        except Exception as e:
            logger.error(f"Error analyzing context: {str(e)}")
            return {"insights": [], "recommendations": []}
    
    def _create_enhancement_prompt(self, task_data: Dict) -> str:
        return f"""
        Please enhance this task with better description and suggestions:
        
        Title: {task_data.get('title', '')}
        Description: {task_data.get('description', '')}
        Priority: {task_data.get('priority', 'medium')}
        
        Provide:
        1. Enhanced title (if needed)
        2. Improved description with actionable steps
        3. Estimated duration in minutes
        4. Suggested category
        
        Format as JSON with keys: enhanced_title, enhanced_description, estimated_duration, suggested_category
        """
    
    def _create_priority_prompt(self, task_data: Dict, context: Dict = None) -> str:
        context_info = ""
        if context:
            context_info = f"Context: {json.dumps(context, indent=2)}"
            
        return f"""
        Analyze this task and suggest priority level (urgent, high, medium, low):
        
        Title: {task_data.get('title', '')}
        Description: {task_data.get('description', '')}
        Due Date: {task_data.get('due_date', 'Not set')}
        
        {context_info}
        
        Consider urgency, importance, and impact. Respond with just the priority level.
        """
    
    def _create_deadline_prompt(self, task_data: Dict) -> str:
        return f"""
        Suggest a realistic deadline for this task:
        
        Title: {task_data.get('title', '')}
        Description: {task_data.get('description', '')}
        Priority: {task_data.get('priority', 'medium')}
        Estimated Duration: {task_data.get('estimated_duration', 'Unknown')} minutes
        
        Consider the task complexity and priority. Suggest number of days from now.
        """
    
    def _create_context_analysis_prompt(self, tasks: List[Dict], user_data: Dict = None) -> str:
        task_summary = "\n".join([
            f"- {task.get('title', '')}: {task.get('status', '')} ({task.get('priority', '')})"
            for task in tasks[:20]  # Limit to avoid token limits
        ])
        
        return f"""
        Analyze these tasks and provide productivity insights:
        
        Tasks:
        {task_summary}
        
        User Data: {json.dumps(user_data or {}, indent=2)}
        
        Provide:
        1. Key patterns you notice
        2. Productivity insights
        3. Actionable recommendations
        4. Focus areas for improvement
        
        Format as JSON with keys: patterns, insights, recommendations, focus_areas
        """
    
    def _parse_enhancement_response(self, response: str) -> Dict:
        try:
            # Try to extract JSON from response
            start = response.find('{')
            end = response.rfind('}') + 1
            if start != -1 and end != 0:
                json_str = response[start:end]
                return json.loads(json_str)
        except:
            pass
        
        # Fallback parsing
        return {
            'enhanced_description': response,
            'ai_enhanced': True
        }
    
    def _parse_deadline_suggestion(self, suggestion: str) -> Optional[datetime]:
        try:
            # Extract number of days from suggestion
            import re
            days_match = re.search(r'(\d+)\s*days?', suggestion.lower())
            if days_match:
                days = int(days_match.group(1))
                return datetime.now() + timedelta(days=days)
        except:
            pass
        return None
    
    def _parse_context_analysis(self, response: str) -> Dict:
        try:
            start = response.find('{')
            end = response.rfind('}') + 1
            if start != -1 and end != 0:
                json_str = response[start:end]
                return json.loads(json_str)
        except:
            pass
        
        return {
            "insights": [response],
            "recommendations": ["Continue monitoring task patterns"],
            "patterns": [],
            "focus_areas": []
        }
