import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { generateProductivityPatterns, generateRecommendations } from '../../../services/openaiService';

const AIInsightsPanel = () => {
  const [activeTab, setActiveTab] = useState('patterns');
  const [productivityPatterns, setProductivityPatterns] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeEstimationData = [
    {
      task: "Documentation",
      estimated: "30 min",
      actual: "45 min",
      accuracy: 67,
      trend: "improving"
    },
    {
      task: "Meetings",
      estimated: "60 min",
      actual: "55 min",
      accuracy: 92,
      trend: "stable"
    },
    {
      task: "Code Review",
      estimated: "20 min",
      actual: "25 min",
      accuracy: 80,
      trend: "declining"
    }
  ];

  const tabs = [
    { id: 'patterns', label: 'Patterns', icon: 'TrendingUp' },
    { id: 'estimation', label: 'Time Accuracy', icon: 'Clock' },
    { id: 'recommendations', label: 'Suggestions', icon: 'Lightbulb' }
  ];

  const loadAIData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Sample user data for AI analysis
      const userData = {
        dailyTasks: 12,
        completionRate: 85,
        focusTime: 6.2,
        interruptions: 3,
        peakHours: '9-11 AM',
        weeklyTrend: 'improving',
        contextSwitches: 12,
        timestamp: new Date().toISOString()
      };

      // Generate patterns and recommendations concurrently
      const [patterns, recs] = await Promise.all([
        generateProductivityPatterns(userData),
        generateRecommendations(userData)
      ]);

      setProductivityPatterns(patterns);
      setRecommendations(recs);
      
    } catch (error) {
      console.error('Error loading AI data:', error);
      setError('Failed to load AI insights. Please check your OpenAI API key.');
      
      // Fallback to mock data
      setProductivityPatterns([
        {
          id: 1,
          title: "Peak Focus Hours",
          insight: "You're most productive between 9-11 AM",
          recommendation: "Schedule complex tasks during this window",
          confidence: 94,
          icon: "Clock"
        },
        {
          id: 2,
          title: "Task Completion Rate",
          insight: "85% completion rate this week",
          recommendation: "Consider reducing daily task load by 2-3 items",
          confidence: 87,
          icon: "Target"
        }
      ]);
      
      setRecommendations([
        {
          id: 1,
          type: "workflow",
          title: "Optimize Morning Routine",
          description: "Start with high-priority tasks when energy is highest",
          impact: "High",
          effort: "Low",
          icon: "Sunrise"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAIData();
  }, []);

  const renderPatterns = () => (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-text-secondary">Analyzing patterns with AI...</span>
          </div>
        </div>
      ) : (
        productivityPatterns.map((pattern) => (
          <div key={pattern.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon name={pattern.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-text-primary">{pattern.title}</h4>
                <p className="text-sm text-text-secondary">{pattern.insight}</p>
                <p className="text-sm text-accent font-medium">{pattern.recommendation}</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-secondary-100 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${pattern.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-text-muted">{pattern.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderEstimation = () => (
    <div className="space-y-4">
      <div className="bg-surface border border-border rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3">Time Estimation Accuracy</h4>
        <div className="space-y-3">
          {timeEstimationData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">{item.task}</span>
                  <span className="text-xs text-text-muted">{item.accuracy}% accurate</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <span>Est: {item.estimated}</span>
                  <span>•</span>
                  <span>Actual: {item.actual}</span>
                  <span>•</span>
                  <span className={`capitalize ${
                    item.trend === 'improving' ? 'text-success' : 
                    item.trend === 'declining' ? 'text-error' : 'text-text-muted'
                  }`}>
                    {item.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-text-secondary">Generating recommendations...</span>
          </div>
        </div>
      ) : (
        recommendations.map((rec) => (
          <div key={rec.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
                <Icon name={rec.icon} size={20} className="text-accent" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-text-primary">{rec.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      rec.impact === 'High' ? 'bg-success-50 text-success' :
                      rec.impact === 'Medium'? 'bg-warning-50 text-warning' : 'bg-secondary-50 text-secondary-600'
                    }`}>
                      {rec.impact} Impact
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      rec.effort === 'Low' ? 'bg-success-50 text-success' :
                      rec.effort === 'Medium'? 'bg-warning-50 text-warning' : 'bg-error-50 text-error'
                    }`}>
                      {rec.effort} Effort
                    </span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{rec.description}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Apply Suggestion
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">AI Insights</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-ai-pulse"></div>
          <span className="text-sm text-text-muted">OpenAI Powered</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{error}</p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-secondary-50 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'patterns' && renderPatterns()}
        {activeTab === 'estimation' && renderEstimation()}
        {activeTab === 'recommendations' && renderRecommendations()}
      </div>
      
      {/* Refresh Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={loadAIData}
          disabled={isLoading}
          iconName="RefreshCw"
          iconPosition="left"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Insights'}
        </Button>
      </div>
    </div>
  );
};

export default AIInsightsPanel;
