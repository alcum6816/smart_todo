import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedTasks, onBulkAction, onClearSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAiSuggestionsOpen, setIsAiSuggestionsOpen] = useState(false);

  const bulkActions = [
    { 
      id: 'complete', 
      label: 'Mark as Complete', 
      icon: 'Check', 
      color: 'text-success',
      action: () => onBulkAction('complete', selectedTasks)
    },
    { 
      id: 'incomplete', 
      label: 'Mark as Incomplete', 
      icon: 'X', 
      color: 'text-warning',
      action: () => onBulkAction('incomplete', selectedTasks)
    },
    { 
      id: 'high-priority', 
      label: 'Set High Priority', 
      icon: 'AlertTriangle', 
      color: 'text-error',
      action: () => onBulkAction('priority', selectedTasks, 'high')
    },
    { 
      id: 'medium-priority', 
      label: 'Set Medium Priority', 
      icon: 'AlertCircle', 
      color: 'text-warning',
      action: () => onBulkAction('priority', selectedTasks, 'medium')
    },
    { 
      id: 'low-priority', 
      label: 'Set Low Priority', 
      icon: 'Info', 
      color: 'text-success',
      action: () => onBulkAction('priority', selectedTasks, 'low')
    },
    { 
      id: 'duplicate', 
      label: 'Duplicate Tasks', 
      icon: 'Copy', 
      color: 'text-primary',
      action: () => onBulkAction('duplicate', selectedTasks)
    },
    { 
      id: 'delete', 
      label: 'Delete Tasks', 
      icon: 'Trash2', 
      color: 'text-error',
      action: () => onBulkAction('delete', selectedTasks)
    }
  ];

  const aiSuggestions = [
    {
      id: 'optimize-schedule',
      label: 'Optimize Schedule',
      description: 'AI will reorganize tasks based on priority and deadlines',
      icon: 'Brain',
      action: () => onBulkAction('ai-optimize', selectedTasks)
    },
    {
      id: 'group-similar',
      label: 'Group Similar Tasks',
      description: 'Automatically group related tasks together',
      icon: 'Layers',
      action: () => onBulkAction('ai-group', selectedTasks)
    },
    {
      id: 'suggest-deadlines',
      label: 'Suggest Deadlines',
      description: 'AI will recommend optimal due dates',
      icon: 'Calendar',
      action: () => onBulkAction('ai-deadlines', selectedTasks)
    },
    {
      id: 'break-down',
      label: 'Break Down Complex Tasks',
      description: 'Split large tasks into smaller, manageable subtasks',
      icon: 'GitBranch',
      action: () => onBulkAction('ai-breakdown', selectedTasks)
    }
  ];

  if (selectedTasks.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-surface border border-border rounded-xl shadow-elevation-3 p-4">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">{selectedTasks.length}</span>
            </div>
            <span className="text-sm text-text-primary font-medium">
              {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('complete', selectedTasks)}
              iconName="Check"
            >
              Complete
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('delete', selectedTasks)}
              iconName="Trash2"
            >
              Delete
            </Button>

            {/* More Actions Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                iconName="MoreHorizontal"
              >
                More
              </Button>

              {isDropdownOpen && (
                <div className="absolute bottom-12 right-0 bg-surface border border-border rounded-lg shadow-elevation-3 py-2 w-48 z-50">
                  {bulkActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        action.action();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-secondary-50 transition-colors flex items-center space-x-2"
                    >
                      <Icon name={action.icon} size={14} className={action.color} />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Suggestions */}
            <div className="relative">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAiSuggestionsOpen(!isAiSuggestionsOpen)}
                iconName="Brain"
              >
                AI Actions
              </Button>

              {isAiSuggestionsOpen && (
                <div className="absolute bottom-12 right-0 bg-surface border border-border rounded-lg shadow-elevation-3 py-2 w-72 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <Icon name="Brain" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-text-primary">AI Suggestions</span>
                    </div>
                  </div>
                  
                  {aiSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => {
                        suggestion.action();
                        setIsAiSuggestionsOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-secondary-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <Icon name={suggestion.icon} size={16} className="text-primary mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-text-primary">
                            {suggestion.label}
                          </div>
                          <div className="text-xs text-text-muted mt-1">
                            {suggestion.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Selection */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;
