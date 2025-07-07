import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductivityScore = ({ score, trend, breakdown }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success-50';
    if (score >= 60) return 'bg-warning-50';
    return 'bg-error-50';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-text-muted';
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Productivity Score</h3>
        <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={16} />
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBackground(score)} mb-4`}>
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
        </div>
        <p className="text-text-secondary">Overall productivity score based on AI analysis</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Score Breakdown</h4>
        {breakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                item.score >= 80 ? 'bg-success-50 text-success' :
                item.score >= 60 ? 'bg-warning-50 text-warning': 'bg-error-50 text-error'
              }`}>
                <Icon name={item.icon} size={16} />
              </div>
              <span className="text-sm text-text-primary">{item.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-secondary-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    item.score >= 80 ? 'bg-success' :
                    item.score >= 60 ? 'bg-warning': 'bg-error'
                  }`}
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-text-primary w-8">{item.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductivityScore;
