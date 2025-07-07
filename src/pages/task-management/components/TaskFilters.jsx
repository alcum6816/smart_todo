import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TaskFilters = ({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'health', label: 'Health' },
    { value: 'learning', label: 'Learning' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'created', label: 'Created Date' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'aiRecommended', label: 'AI Recommended' }
  ];

  const aiSuggestedFilters = [
    { label: 'Due Today', icon: 'Calendar', filter: { dueDate: 'today' } },
    { label: 'High Priority', icon: 'AlertTriangle', filter: { priority: 'high' } },
    { label: 'Quick Tasks', icon: 'Zap', filter: { duration: 'quick' } },
    { label: 'Focus Time', icon: 'Target', filter: { focusMode: true } }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onFiltersChange({ ...filters, search: value });
  };

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsVoiceActive(false);
      const voiceQuery = "Show me high priority work tasks";
      setSearchQuery(voiceQuery);
      onFiltersChange({ ...filters, search: voiceQuery });
    }, 2000);
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleAiFilterApply = (aiFilter) => {
    onFiltersChange({ ...filters, ...aiFilter.filter });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priority && filters.priority !== 'all') count++;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.status && filters.status !== 'all') count++;
    if (filters.search) count++;
    return count;
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
          iconName={isOpen ? "X" : "Filter"}
        >
          Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`bg-surface border border-border rounded-lg p-4 space-y-4 ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Search Tasks</label>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search or ask AI..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-12"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
            />
            <button
              onClick={handleVoiceSearch}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-all duration-200 ${
                isVoiceActive 
                  ? 'bg-accent text-white animate-ai-pulse' :'hover:bg-secondary-100 text-text-muted'
              }`}
            >
              <Icon name="Mic" size={16} />
            </button>
          </div>
        </div>

        {/* AI Suggested Filters */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary flex items-center space-x-2">
            <Icon name="Brain" size={16} className="text-primary" />
            <span>AI Suggestions</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {aiSuggestedFilters.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleAiFilterApply(suggestion)}
                className="flex items-center space-x-2 p-2 rounded-lg border border-border hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 text-sm"
              >
                <Icon name={suggestion.icon} size={14} className="text-primary" />
                <span>{suggestion.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Priority</label>
          <select
            value={filters.priority || 'all'}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Category</label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Status</label>
          <select
            value={filters.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Sort By</label>
          <select
            value={filters.sortBy || 'dueDate'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full p-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Due Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="text-sm"
            />
            <Input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="text-sm"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full"
            iconName="X"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </>
  );
};

export default TaskFilters;
