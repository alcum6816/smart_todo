import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const FocusTimeAnalysis = ({ data, insights }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-sm text-text-secondary">
            Focus Time: <span className="font-medium text-primary">{payload[0].value}h</span>
          </p>
          <p className="text-sm text-text-secondary">
            Interruptions: <span className="font-medium text-warning">{payload[1]?.value || 0}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Focus Time Analysis</h3>
        <div className="flex items-center space-x-2 text-primary">
          <Icon name="Eye" size={16} />
          <span className="text-sm font-medium">Deep Work Tracker</span>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="day" 
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
            <Bar 
              dataKey="focusTime" 
              fill="#2563EB" 
              radius={[4, 4, 0, 0]}
              name="Focus Time"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="bg-secondary-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={insight.icon} size={16} className="text-primary" />
              <h4 className="font-medium text-text-primary">{insight.title}</h4>
            </div>
            <p className="text-sm text-text-secondary">{insight.description}</p>
            <div className="mt-2">
              <span className="text-lg font-bold text-text-primary">{insight.value}</span>
              <span className="text-sm text-text-muted ml-1">{insight.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusTimeAnalysis;
