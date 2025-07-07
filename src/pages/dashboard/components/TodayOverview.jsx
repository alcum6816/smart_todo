import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodayOverview = () => {
  const todayStats = {
    totalTasks: 12,
    completedTasks: 8,
    inProgress: 2,
    overdue: 1,
    focusTime: '4h 32m',
    productivity: 87
  };

  const upcomingTasks = [
    {
      id: 1,
      title: 'Team standup meeting',
      time: '10:00 AM',
      duration: '30 min',
      type: 'meeting',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Review budget proposal',
      time: '2:00 PM',
      duration: '45 min',
      type: 'task',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Update project documentation',
      time: '4:00 PM',
      duration: '30 min',
      type: 'task',
      priority: 'medium'
    }
  ];

  const aiRecommendations = [
    {
      id: 1,
      type: 'energy',
      message: 'Your energy is highest now - tackle complex tasks first',
      icon: 'Zap',
      color: 'accent'
    },
    {
      id: 2,
      type: 'break',
      message: 'Consider a 15-minute break after your next task',
      icon: 'Coffee',
      color: 'success'
    },
    {
      id: 3,
      type: 'deadline',
      message: 'Budget review deadline is approaching - prioritize today',
      icon: 'AlertTriangle',
      color: 'warning'
    }
  ];

  const completionPercentage = Math.round((todayStats.completedTasks / todayStats.totalTasks) * 100);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return 'Users';
      case 'task': return 'CheckSquare';
      default: return 'Circle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-muted';
    }
  };

  const getRecommendationColor = (color) => {
    const colors = {
      accent: 'bg-accent-50 text-accent border-accent-100',
      success: 'bg-success-50 text-success border-success-100',
      warning: 'bg-warning-50 text-warning border-warning-100',
      primary: 'bg-primary-50 text-primary border-primary-100'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="space-y-6">
      {/* Today's Progress */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary">Today's Progress</h2>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-muted" />
            <span className="text-sm text-text-muted">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-secondary-200"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="text-primary"
                strokeDasharray={`${completionPercentage * 3.14} 314`}
                style={{
                  transition: 'stroke-dasharray 0.5s ease-in-out'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">{completionPercentage}%</div>
                <div className="text-xs text-text-muted">Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{todayStats.completedTasks}</div>
            <div className="text-sm text-text-muted">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{todayStats.inProgress}</div>
            <div className="text-sm text-text-muted">In Progress</div>
          </div>
          <div className="text-2xl font-bold text-error text-center">
            <div>{todayStats.overdue}</div>
            <div className="text-sm text-text-muted">Overdue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{todayStats.focusTime}</div>
            <div className="text-sm text-text-muted">Focus Time</div>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">Upcoming Today</h3>
          <Button variant="ghost" size="sm" iconName="Plus">
            Add Task
          </Button>
        </div>

        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary-50 transition-colors">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Icon name={getTypeIcon(task.type)} size={18} className="text-secondary-600" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{task.title}</h4>
                <div className="flex items-center space-x-3 text-sm text-text-muted">
                  <span>{task.time}</span>
                  <span>•</span>
                  <span>{task.duration}</span>
                  <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority} priority
                  </span>
                </div>
              </div>

              <Button variant="ghost" size="sm" iconName="Play">
                Start
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">AI Recommendations</h3>
        </div>

        <div className="space-y-3">
          {aiRecommendations.map((rec) => (
            <div key={rec.id} className={`p-4 rounded-lg border ${getRecommendationColor(rec.color)}`}>
              <div className="flex items-start space-x-3">
                <Icon name={rec.icon} size={18} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{rec.message}</p>
                </div>
                <Button variant="ghost" size="xs" iconName="X">
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayOverview;
