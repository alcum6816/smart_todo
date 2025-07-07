import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ViewToggle = ({ currentView, onViewChange, taskCount }) => {
  const viewOptions = [
    { 
      value: 'list', 
      label: 'List View', 
      icon: 'List',
      description: 'Detailed task list with full information'
    },
    { 
      value: 'kanban', 
      label: 'Kanban Board', 
      icon: 'Columns',
      description: 'Visual board with task columns'
    },
    { 
      value: 'calendar', 
      label: 'Calendar View', 
      icon: 'Calendar',
      description: 'Tasks organized by due dates'
    }
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-text-primary">Tasks</h1>
        <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
          {taskCount} tasks
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Desktop View Toggle */}
        <div className="hidden md:flex bg-secondary-50 rounded-lg p-1">
          {viewOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onViewChange(option.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentView === option.value
                  ? 'bg-surface text-primary shadow-elevation-1'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
              }`}
              title={option.description}
            >
              <Icon name={option.icon} size={16} />
              <span className="hidden lg:inline">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile View Toggle */}
        <div className="md:hidden">
          <select
            value={currentView}
            onChange={(e) => onViewChange(e.target.value)}
            className="p-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {viewOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* AI Optimization Button */}
        <Button
          variant="outline"
          iconName="Brain"
          className="hidden sm:flex"
          onClick={() => {
            // Simulate AI optimization
            console.log('AI optimizing task view...');
          }}
        >
          <span className="hidden lg:inline">AI Optimize</span>
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;
