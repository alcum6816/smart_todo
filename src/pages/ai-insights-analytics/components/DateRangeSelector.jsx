import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangeSelector = ({ onRangeChange, currentRange }) => {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const predefinedRanges = [
    { label: 'Last 7 days', value: '7d', icon: 'Calendar' },
    { label: 'Last 30 days', value: '30d', icon: 'Calendar' },
    { label: 'Last 3 months', value: '3m', icon: 'Calendar' },
    { label: 'Last 6 months', value: '6m', icon: 'Calendar' },
    { label: 'This year', value: '1y', icon: 'Calendar' },
    { label: 'Custom', value: 'custom', icon: 'CalendarDays' }
  ];

  const handleRangeSelect = (range) => {
    if (range.value === 'custom') {
      setIsCustomOpen(true);
    } else {
      setIsCustomOpen(false);
      onRangeChange(range.value);
    }
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onRangeChange('custom', { start: customStart, end: customEnd });
      setIsCustomOpen(false);
    }
  };

  const getCurrentRangeLabel = () => {
    const range = predefinedRanges.find(r => r.value === currentRange);
    return range ? range.label : 'Custom Range';
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 mb-4">
        {predefinedRanges.map((range) => (
          <Button
            key={range.value}
            variant={currentRange === range.value ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleRangeSelect(range)}
            iconName={range.icon}
            iconPosition="left"
            className="whitespace-nowrap"
          >
            {range.label}
          </Button>
        ))}
      </div>

      {isCustomOpen && (
        <div className="bg-surface border border-border rounded-xl p-4 mb-4 shadow-elevation-2">
          <h4 className="font-medium text-text-primary mb-3">Custom Date Range</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Start Date</label>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">End Date</label>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCustomOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCustomApply}
              disabled={!customStart || !customEnd}
            >
              Apply
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between bg-secondary-50 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-text-muted" />
          <span className="text-sm font-medium text-text-primary">
            Showing data for: {getCurrentRangeLabel()}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default DateRangeSelector;
