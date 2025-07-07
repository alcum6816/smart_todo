import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActionsPanel = () => {
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [quickTaskInput, setQuickTaskInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickActions = [
    {
      id: 'voice-task',
      title: 'Voice to Task',
      description: 'Speak your task naturally',
      icon: 'Mic',
      color: 'primary',
      action: () => handleVoiceInput()
    },
    {
      id: 'smart-break',
      title: 'Smart Break',
      description: 'AI-suggested break time',
      icon: 'Coffee',
      color: 'accent',
      action: () => handleSmartBreak()
    },
    {
      id: 'focus-mode',
      title: 'Focus Mode',
      description: 'Block distractions',
      icon: 'Target',
      color: 'success',
      action: () => handleFocusMode()
    },
    {
      id: 'quick-meeting',
      title: 'Schedule Meeting',
      description: 'AI-powered scheduling',
      icon: 'Calendar',
      color: 'warning',
      action: () => handleQuickMeeting()
    }
  ];

  const recentTemplates = [
    {
      id: 1,
      name: 'Daily Standup',
      tasks: ['Review yesterday\'s progress', 'Plan today\'s priorities', 'Identify blockers'],
      icon: 'Users'
    },
    {
      id: 2,
      name: 'Project Kickoff',
      tasks: ['Define project scope', 'Assign team roles', 'Set milestones'],
      icon: 'Rocket'
    },
    {
      id: 3,
      name: 'Weekly Review',
      tasks: ['Analyze completed tasks', 'Review time tracking', 'Plan next week'],
      icon: 'BarChart3'
    }
  ];

  const handleVoiceInput = () => {
    setIsVoiceRecording(!isVoiceRecording);
    if (!isVoiceRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsVoiceRecording(false);
        setQuickTaskInput('Review the quarterly budget report and prepare summary for team meeting');
      }, 3000);
    }
  };

  const handleSmartBreak = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Show break suggestion notification
      alert('AI suggests a 15-minute break. You\'ve been focused for 90 minutes!');
    }, 1500);
  };

  const handleFocusMode = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Focus mode activated! Notifications blocked for 2 hours.');
    }, 1000);
  };

  const handleQuickMeeting = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('AI found optimal meeting slots: Tomorrow 2-3 PM or Friday 10-11 AM');
    }, 2000);
  };

  const handleQuickTaskSubmit = (e) => {
    e.preventDefault();
    if (quickTaskInput.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setQuickTaskInput('');
        alert(`Task created: "${quickTaskInput}" - AI categorized as "Finance" with high priority`);
      }, 1500);
    }
  };

  const handleTemplateUse = (template) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Created ${template.tasks.length} tasks from "${template.name}" template`);
    }, 1000);
  };

  const colorClasses = {
    primary: 'bg-primary-50 text-primary border-primary-100 hover:bg-primary-100',
    accent: 'bg-accent-50 text-accent border-accent-100 hover:bg-accent-100',
    success: 'bg-success-50 text-success border-success-100 hover:bg-success-100',
    warning: 'bg-warning-50 text-warning border-warning-100 hover:bg-warning-100'
  };

  return (
    <div className="space-y-6">
      {/* Quick Task Input */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Quick Task Entry</h3>
        
        <form onSubmit={handleQuickTaskSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Type or speak your task..."
              value={quickTaskInput}
              onChange={(e) => setQuickTaskInput(e.target.value)}
              className="pr-12"
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-all duration-200 ${
                isVoiceRecording 
                  ? 'bg-error text-white animate-ai-pulse' :'text-text-muted hover:text-primary hover:bg-primary-50'
              }`}
            >
              <Icon name={isVoiceRecording ? 'Square' : 'Mic'} size={16} />
            </button>
          </div>
          
          {isVoiceRecording && (
            <div className="flex items-center space-x-2 text-sm text-error">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-error rounded-full animate-ai-thinking"></div>
                <div className="w-1 h-1 bg-error rounded-full animate-ai-thinking" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-error rounded-full animate-ai-thinking" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span>Listening...</span>
            </div>
          )}
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            disabled={!quickTaskInput.trim() || isProcessing}
            loading={isProcessing}
            iconName="Plus"
          >
            Add Task with AI
          </Button>
        </form>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              disabled={isProcessing}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${colorClasses[action.color]} ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-elevation-1'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={action.icon} size={20} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{action.title}</h4>
                  <p className="text-xs opacity-80 truncate">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Task Templates */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">AI Task Templates</h3>
        
        <div className="space-y-3">
          {recentTemplates.map((template) => (
            <div key={template.id} className="border border-border rounded-lg p-4 hover:bg-secondary-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Icon name={template.icon} size={20} className="text-secondary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary">{template.name}</h4>
                    <p className="text-sm text-text-muted mt-1">
                      {template.tasks.length} tasks • AI optimized
                    </p>
                    <div className="mt-2 space-y-1">
                      {template.tasks.slice(0, 2).map((task, index) => (
                        <p key={index} className="text-xs text-text-muted">• {task}</p>
                      ))}
                      {template.tasks.length > 2 && (
                        <p className="text-xs text-text-muted">• +{template.tasks.length - 2} more tasks</p>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateUse(template)}
                  disabled={isProcessing}
                  iconName="Plus"
                >
                  Use
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;
