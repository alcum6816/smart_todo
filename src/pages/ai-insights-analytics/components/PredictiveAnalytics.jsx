import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictiveAnalytics = ({ predictions, recommendations }) => {
  const [selectedPrediction, setSelectedPrediction] = useState('workload');

  const predictionTypes = {
    workload: {
      title: 'Workload Forecast',
      icon: 'BarChart3',
      color: '#2563EB',
      data: predictions.workload
    },
    deadlines: {
      title: 'Deadline Pressure',
      icon: 'Clock',
      color: '#EF4444',
      data: predictions.deadlines
    },
    productivity: {
      title: 'Productivity Trend',
      icon: 'TrendingUp',
      color: '#10B981',
      data: predictions.productivity
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isActual = payload[0].payload.type === 'actual';
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-sm text-text-secondary">
            {isActual ? 'Actual' : 'Predicted'}: <span className="font-medium" style={{ color: payload[0].color }}>{payload[0].value}</span>
          </p>
          {!isActual && (
            <p className="text-xs text-text-muted mt-1">AI Prediction</p>
          )}
        </div>
      );
    }
    return null;
  };

  const currentPrediction = predictionTypes[selectedPrediction];

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Predictive Analytics</h3>
        <div className="flex items-center space-x-2 text-accent">
          <Icon name="Brain" size={16} />
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </div>

      {/* Prediction Type Selector */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {Object.entries(predictionTypes).map(([key, type]) => (
          <Button
            key={key}
            variant={selectedPrediction === key ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedPrediction(key)}
            iconName={type.icon}
            iconPosition="left"
            className="whitespace-nowrap"
          >
            {type.title}
          </Button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentPrediction.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x="Today" stroke="#64748B" strokeDasharray="2 2" />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={currentPrediction.color}
              strokeWidth={2}
              dot={(props) => {
                const { payload } = props;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill={payload.type === 'actual' ? currentPrediction.color : 'transparent'}
                    stroke={currentPrediction.color}
                    strokeWidth={2}
                    strokeDasharray={payload.type === 'predicted' ? '4 4' : '0'}
                  />
                );
              }}
              strokeDasharray={(entry) => entry?.type === 'predicted' ? '4 4' : '0'}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">AI Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations[selectedPrediction]?.map((rec, index) => (
            <div key={index} className="bg-accent-50 border border-accent-100 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={rec.icon} size={16} className="text-accent" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary mb-1">{rec.title}</h5>
                  <p className="text-sm text-text-secondary mb-2">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-accent font-medium">{rec.impact}</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="text-accent hover:bg-accent-100"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
