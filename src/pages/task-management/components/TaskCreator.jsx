import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TaskCreator = ({ onCreateTask, onClose, isOpen }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'work',
    dueDate: '',
    dueTime: '',
    tags: []
  });
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const textareaRef = useRef(null);

  const priorityOptions = [
    { value: 'high', label: 'High Priority', color: 'text-error' },
    { value: 'medium', label: 'Medium Priority', color: 'text-warning' },
    { value: 'low', label: 'Low Priority', color: 'text-success' }
  ];

  const categoryOptions = [
    { value: 'work', label: 'Work', icon: 'Briefcase' },
    { value: 'personal', label: 'Personal', icon: 'User' },
    { value: 'health', label: 'Health', icon: 'Heart' },
    { value: 'learning', label: 'Learning', icon: 'BookOpen' }
  ];

  const handleInputChange = (field, value) => {
    setTaskData(prev => ({ ...prev, [field]: value }));
    
    // Trigger AI processing for natural language detection
    if (field === 'title' && value.length > 10) {
      processNaturalLanguage(value);
    }
  };

  const processNaturalLanguage = (text) => {
    setAiProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const suggestions = {
        detectedPriority: text.toLowerCase().includes('urgent') || text.toLowerCase().includes('asap') ? 'high' : 
                          text.toLowerCase().includes('important') ? 'medium' : null,
        detectedCategory: text.toLowerCase().includes('work') || text.toLowerCase().includes('meeting') ? 'work' :
                         text.toLowerCase().includes('exercise') || text.toLowerCase().includes('doctor') ? 'health' :
                         text.toLowerCase().includes('learn') || text.toLowerCase().includes('study') ? 'learning' : null,
        detectedDate: text.match(/tomorrow|today|next week|monday|tuesday|wednesday|thursday|friday|saturday|sunday/i)?.[0],
        suggestedTags: extractTags(text),
        estimatedDuration: estimateDuration(text)
      };
      
      setAiSuggestions(suggestions);
      setAiProcessing(false);
    }, 1500);
  };

  const extractTags = (text) => {
    const commonTags = ['meeting', 'urgent', 'review', 'call', 'email', 'presentation', 'report'];
    return commonTags.filter(tag => text.toLowerCase().includes(tag));
  };

  const estimateDuration = (text) => {
    if (text.toLowerCase().includes('quick') || text.toLowerCase().includes('brief')) return '15 min';
    if (text.toLowerCase().includes('meeting') || text.toLowerCase().includes('call')) return '30 min';
    if (text.toLowerCase().includes('review') || text.toLowerCase().includes('analyze')) return '1 hour';
    return '30 min';
  };

  const handleVoiceInput = () => {
    setIsVoiceActive(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      const voiceText = "Schedule urgent meeting with team tomorrow at 2 PM to review project status";
      setTaskData(prev => ({ ...prev, title: voiceText }));
      processNaturalLanguage(voiceText);
      setIsVoiceActive(false);
    }, 3000);
  };

  const applySuggestion = (field, value) => {
    setTaskData(prev => ({ ...prev, [field]: value }));
    setAiSuggestions(prev => ({ ...prev, [`detected${field.charAt(0).toUpperCase() + field.slice(1)}`]: null }));
  };

  const addTag = () => {
    if (tagInput.trim() && !taskData.tags.includes(tagInput.trim())) {
      setTaskData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTaskData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      category: taskData.category,
      dueDate: taskData.dueDate ? new Date(`${taskData.dueDate}${taskData.dueTime ? `T${taskData.dueTime}` : ''}`).toISOString() : null,
      tags: taskData.tags,
      completed: false,
      createdAt: new Date().toISOString(),
      aiEstimate: aiSuggestions?.estimatedDuration || '30 min',
      aiTags: aiSuggestions?.suggestedTags || [],
      aiInsights: `This task appears to be ${taskData.priority} priority and should take approximately ${aiSuggestions?.estimatedDuration || '30 min'} to complete.`
    };

    onCreateTask(newTask);
    
    // Reset form
    setTaskData({
      title: '',
      description: '',
      priority: 'medium',
      category: 'work',
      dueDate: '',
      dueTime: '',
      tags: []
    });
    setAiSuggestions(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-xl shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Create New Task</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-50 transition-colors"
          >
            <Icon name="X" size={20} className="text-text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Task Title with Voice Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Task Title *</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="What needs to be done? (Try: 'Urgent meeting tomorrow at 2 PM')"
                value={taskData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="pr-12"
                required
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-all duration-200 ${
                  isVoiceActive 
                    ? 'bg-accent text-white animate-ai-pulse' :'hover:bg-secondary-100 text-text-muted'
                }`}
              >
                <Icon name="Mic" size={16} />
              </button>
            </div>
            
            {aiProcessing && (
              <div className="flex items-center space-x-2 text-sm text-primary">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-ai-thinking"></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-ai-thinking" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-ai-thinking" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span>AI is analyzing your task...</span>
              </div>
            )}
          </div>

          {/* AI Suggestions */}
          {aiSuggestions && (
            <div className="bg-primary-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Brain" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">AI Suggestions</span>
              </div>
              
              {aiSuggestions.detectedPriority && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Detected priority: {aiSuggestions.detectedPriority}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => applySuggestion('priority', aiSuggestions.detectedPriority)}
                  >
                    Apply
                  </Button>
                </div>
              )}
              
              {aiSuggestions.detectedCategory && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Detected category: {aiSuggestions.detectedCategory}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => applySuggestion('category', aiSuggestions.detectedCategory)}
                  >
                    Apply
                  </Button>
                </div>
              )}
              
              {aiSuggestions.estimatedDuration && (
                <div className="text-sm text-text-secondary">
                  Estimated duration: {aiSuggestions.estimatedDuration}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Description</label>
            <textarea
              ref={textareaRef}
              placeholder="Add more details about this task..."
              value={taskData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Priority</label>
              <select
                value={taskData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Category</label>
              <select
                value={taskData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Due Date</label>
              <Input
                type="date"
                value={taskData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Due Time</label>
              <Input
                type="time"
                value={taskData.dueTime}
                onChange={(e) => handleInputChange('dueTime', e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {taskData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-primary-700"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                iconName="Plus"
              >
                Add
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              iconName="Plus"
            >
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreator;
