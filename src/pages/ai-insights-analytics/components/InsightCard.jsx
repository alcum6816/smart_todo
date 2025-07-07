import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightCard = ({ insight, onImplement }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImplemented, setIsImplemented] = useState(false);

  const getInsightIcon = (type) => {
    const icons = {
      optimization: 'Zap',
      habit: 'Target',
      workload: 'BarChart3',
      focus: 'Eye',
      scheduling: 'Calendar',
      efficiency: 'TrendingUp'
    };
    return icons[type] || 'Lightbulb';
  };

  const getInsightColor = (type) => {
    const colors = {
      optimization: 'accent',
      habit: 'success',
      workload: 'warning',
      focus: 'primary',
      scheduling: 'secondary',
      efficiency: 'accent'
    };
    return colors[type] || 'primary';
  };

  const handleImplement = () => {
    setIsImplemented(true);
    if (onImplement) {
      onImplement(insight);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            getInsightColor(insight.type) === 'primary' ? 'bg-primary-50 text-primary' :
            getInsightColor(insight.type) === 'success' ? 'bg-success-50 text-success' :
            getInsightColor(insight.type) === 'warning' ? 'bg-warning-50 text-warning' :
            getInsightColor(insight.type) === 'accent'? 'bg-accent-50 text-accent' : 'bg-secondary-50 text-secondary'
          }`}>
            <Icon name={getInsightIcon(insight.type)} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{insight.title}</h3>
            <p className="text-sm text-text-secondary">{insight.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            insight.impact === 'high' ? 'bg-success-100 text-success' :
            insight.impact === 'medium'? 'bg-warning-100 text-warning' : 'bg-secondary-100 text-secondary'
          }`}>
            {insight.impact} impact
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-md hover:bg-secondary-50 transition-colors"
          >
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="text-text-muted" 
            />
          </button>
        </div>
      </div>

      <p className="text-text-primary mb-4">{insight.description}</p>

      {isExpanded && (
        <div className="space-y-4 border-t border-border pt-4">
          <div>
            <h4 className="font-medium text-text-primary mb-2">Detailed Analysis</h4>
            <p className="text-sm text-text-secondary">{insight.analysis}</p>
          </div>
          
          {insight.recommendations && (
            <div>
              <h4 className="font-medium text-text-primary mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {insight.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="ArrowRight" size={14} className="mt-0.5 text-text-muted" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {insight.metrics && (
            <div>
              <h4 className="font-medium text-text-primary mb-2">Expected Improvement</h4>
              <div className="grid grid-cols-2 gap-4">
                {insight.metrics.map((metric, index) => (
                  <div key={index} className="bg-secondary-50 rounded-lg p-3">
                    <p className="text-sm text-text-secondary">{metric.label}</p>
                    <p className="font-semibold text-text-primary">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-text-muted">
          <Icon name="Clock" size={14} />
          <span>Generated {insight.generatedAt}</span>
        </div>
        
        {!isImplemented ? (
          <Button
            variant="primary"
            size="sm"
            onClick={handleImplement}
            iconName="Check"
            iconPosition="left"
          >
            Implement
          </Button>
        ) : (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Implemented</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
