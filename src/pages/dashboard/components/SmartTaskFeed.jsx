import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartTaskFeed = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review quarterly budget report",
      description: "Analyze Q4 financial performance and prepare recommendations",
      priority: "high",
      aiSuggestion: "Best completed in morning when focus is highest",
      estimatedTime: "45 min",
      category: "Finance",
      dueDate: "Today, 2:00 PM",
      aiTags: ["urgent", "analytical"],
      completed: false,
      aiConfidence: 92
    },
    {
      id: 2,
      title: "Schedule team standup meetings",
      description: "Coordinate with team members for next week\'s schedule",
      priority: "medium",
      aiSuggestion: "Can be batched with other communication tasks",
      estimatedTime: "15 min",
      category: "Management",
      dueDate: "Tomorrow",
      aiTags: ["communication", "routine"],
      completed: false,
      aiConfidence: 87
    },
    {
      id: 3,
      title: "Update project documentation",
      description: "Document recent changes and update technical specifications",
      priority: "medium",
      aiSuggestion: "Perfect for afternoon low-energy periods",
      estimatedTime: "30 min",
      category: "Documentation",
      dueDate: "This week",
      aiTags: ["documentation", "maintenance"],
      completed: false,
      aiConfidence: 78
    },
    {
      id: 4,
      title: "Research competitor analysis",
      description: "Analyze market trends and competitor strategies for Q1 planning",
      priority: "low",
      aiSuggestion: "Break into smaller research sessions",
      estimatedTime: "2 hours",
      category: "Research",
      dueDate: "Next week",
      aiTags: ["research", "strategic"],
      completed: false,
      aiConfidence: 85
    }
  ]);

  const priorityColors = {
    high: 'bg-error-50 text-error border-error-200',
    medium: 'bg-warning-50 text-warning border-warning-200',
    low: 'bg-success-50 text-success border-success-200'
  };

  const priorityIcons = {
    high: 'AlertTriangle',
    medium: 'Clock',
    low: 'CheckCircle2'
  };

  const handleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleQuickAction = (taskId, action) => {
    console.log(`Quick action: ${action} for task ${taskId}`);
    // Implement quick actions like snooze, delegate, etc.
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-text-primary">Smart Task Feed</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={16} className="text-primary" />
          <span className="text-sm text-text-muted">AI Optimized</span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-surface border border-border rounded-xl p-4 transition-all duration-200 hover:shadow-elevation-2 ${
              task.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Task Completion Checkbox */}
              <button
                onClick={() => handleTaskComplete(task.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  task.completed
                    ? 'bg-success border-success' :'border-border hover:border-primary'
                }`}
              >
                {task.completed && <Icon name="Check" size={12} color="white" />}
              </button>

              {/* Task Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-text-muted">{task.description}</p>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium border ${priorityColors[task.priority]}`}>
                    <div className="flex items-center space-x-1">
                      <Icon name={priorityIcons[task.priority]} size={12} />
                      <span className="capitalize">{task.priority}</span>
                    </div>
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="bg-primary-50 border border-primary-100 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-primary font-medium">AI Suggestion</p>
                      <p className="text-sm text-text-secondary mt-1">{task.aiSuggestion}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-text-muted">
                        <span>Confidence: {task.aiConfidence}%</span>
                        <span>Est. Time: {task.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task Metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Tag" size={14} />
                      <span>{task.category}</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Clock"
                      onClick={() => handleQuickAction(task.id, 'snooze')}
                    >
                      Snooze
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Users"
                      onClick={() => handleQuickAction(task.id, 'delegate')}
                    >
                      Delegate
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="MoreHorizontal"
                      onClick={() => handleQuickAction(task.id, 'more')}
                    />
                  </div>
                </div>

                {/* AI Tags */}
                <div className="flex items-center space-x-2">
                  {task.aiTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-4">
        <Button variant="outline" iconName="ChevronDown">
          Load More Tasks
        </Button>
      </div>
    </div>
  );
};

export default SmartTaskFeed;
