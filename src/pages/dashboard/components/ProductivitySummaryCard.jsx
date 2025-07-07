import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductivitySummaryCard = ({ title, value, subtitle, icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary border-primary-100',
    success: 'bg-success-50 text-success border-success-100',
    warning: 'bg-warning-50 text-warning border-warning-100',
    accent: 'bg-accent-50 text-accent border-accent-100'
  };

  const trendIcon = trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus';
  const trendColor = trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-text-muted';

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 ${trendColor}`}>
            <Icon name={trendIcon} size={16} />
            <span className="text-sm font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-heading font-bold text-text-primary">{value}</h3>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        {subtitle && (
          <p className="text-xs text-text-muted">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default ProductivitySummaryCard;
