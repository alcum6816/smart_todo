import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TaskItem = ({ task, onToggleComplete, onEdit, onDelete, onDuplicate, viewMode = 'list' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const priorityColors = {
    high: 'bg-error-100 text-error-600 border-error-200',
    medium: 'bg-warning-100 text-warning-600 border-warning-200',
    low: 'bg-success-100 text-success-600 border-success-200'
  };

  const categoryColors = {
    work: 'bg-primary-100 text-primary-600',
    personal: 'bg-accent-100 text-accent-600',
    health: 'bg-success-100 text-success-600',
    learning: 'bg-secondary-100 text-secondary-600'
  };

  const formatDueDate = (date) => {
    const now = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays <= 7) return `${diffDays} days`;
    
    return dueDate.toLocaleDateString();
  };

  const getDueDateColor = (date) => {
    const now = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'text-error';
    if (diffDays <= 1) return 'text-warning';
    return 'text-text-secondary';
  };

  if (viewMode === 'kanban') {
    return (
      <div className={`bg-surface border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 ${
        task.completed ? 'opacity-60' : ''
      }`}>
        <div className="flex items-start justify-between mb-3">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-success border-success text-white' :'border-border hover:border-primary'
            }`}
          >
            {task.completed && <Icon name="Check" size={12} />}
          </button>
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 rounded hover:bg-secondary-50 transition-colors"
          >
            <Icon name="MoreVertical" size={16} className="text-text-muted" />
          </button>
        </div>

        <h3 className={`font-medium mb-2 ${task.completed ? 'line-through text-text-muted' : 'text-text-primary'}`}>
          {task.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
            {task.category}
          </span>
        </div>

        {task.dueDate && (
          <div className="flex items-center space-x-1 mb-2">
            <Icon name="Calendar" size={12} className="text-text-muted" />
            <span className={`text-xs ${getDueDateColor(task.dueDate)}`}>
              {formatDueDate(task.dueDate)}
            </span>
          </div>
        )}

        {task.aiEstimate && (
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} className="text-text-muted" />
            <span className="text-xs text-text-muted">{task.aiEstimate}</span>
          </div>
        )}

        {showActions && (
          <div className="absolute right-2 top-12 bg-surface border border-border rounded-lg shadow-elevation-3 py-1 z-10">
            <button
              onClick={() => onEdit(task)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-secondary-50 flex items-center space-x-2"
            >
              <Icon name="Edit" size={14} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDuplicate(task)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-secondary-50 flex items-center space-x-2"
            >
              <Icon name="Copy" size={14} />
              <span>Duplicate</span>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-error-50 text-error flex items-center space-x-2"
            >
              <Icon name="Trash2" size={14} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-200 ${
      task.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 mt-1 ${
            task.completed
              ? 'bg-success border-success text-white' :'border-border hover:border-primary'
          }`}
        >
          {task.completed && <Icon name="Check" size={12} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-medium mb-1 ${task.completed ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
                  {task.category}
                </span>
                
                {task.aiTags && task.aiTags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 rounded-full text-xs bg-primary-50 text-primary-600">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4 text-xs text-text-muted">
                {task.dueDate && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span className={getDueDateColor(task.dueDate)}>
                      {formatDueDate(task.dueDate)}
                    </span>
                  </div>
                )}
                
                {task.aiEstimate && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{task.aiEstimate}</span>
                  </div>
                )}

                {task.dependencies && task.dependencies.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Link" size={12} />
                    <span>{task.dependencies.length} dependencies</span>
                  </div>
                )}
              </div>

              {isExpanded && task.aiInsights && (
                <div className="mt-3 p-3 bg-primary-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Brain" size={14} className="text-primary" />
                    <span className="text-sm font-medium text-primary">AI Insights</span>
                  </div>
                  <p className="text-sm text-text-secondary">{task.aiInsights}</p>
                  
                  {task.suggestedTime && (
                    <div className="mt-2 text-xs text-text-muted">
                      <strong>Best time to work:</strong> {task.suggestedTime}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-1 ml-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded hover:bg-secondary-50 transition-colors"
              >
                <Icon 
                  name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-muted" 
                />
              </button>
              
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 rounded hover:bg-secondary-50 transition-colors relative"
              >
                <Icon name="MoreHorizontal" size={16} className="text-text-muted" />
                
                {showActions && (
                  <div className="absolute right-0 top-8 bg-surface border border-border rounded-lg shadow-elevation-3 py-1 z-10 w-32">
                    <button
                      onClick={() => onEdit(task)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-secondary-50 flex items-center space-x-2"
                    >
                      <Icon name="Edit" size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDuplicate(task)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-secondary-50 flex items-center space-x-2"
                    >
                      <Icon name="Copy" size={14} />
                      <span>Duplicate</span>
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-error-50 text-error flex items-center space-x-2"
                    >
                      <Icon name="Trash2" size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
