import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import ProductivityChart from './components/ProductivityChart';
import InsightCard from './components/InsightCard';
import TimeAllocationChart from './components/TimeAllocationChart';
import ProductivityScore from './components/ProductivityScore';
import FocusTimeAnalysis from './components/FocusTimeAnalysis';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import DateRangeSelector from './components/DateRangeSelector';
import { generateProductivityInsights, generateProductivitySummary } from '../../services/openaiService';

const AIInsightsAnalytics = () => {
  const [selectedRange, setSelectedRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [aiInsights, setAiInsights] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [error, setError] = useState(null);

  // Mock data for metrics
  const metricsData = [
    {
      title: "Tasks Completed",
      value: "127",
      change: "+12%",
      changeType: "positive",
      icon: "CheckCircle",
      color: "success"
    },
    {
      title: "Average Focus Time",
      value: "4.2h",
      change: "+8%",
      changeType: "positive",
      icon: "Clock",
      color: "primary"
    },
    {
      title: "Productivity Score",
      value: "87",
      change: "+5%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "accent"
    },
    {
      title: "Deadline Accuracy",
      value: "94%",
      change: "-2%",
      changeType: "negative",
      icon: "Target",
      color: "warning"
    }
  ];

  // Mock data for productivity chart
  const productivityData = [
    { name: 'Mon', value: 85 },
    { name: 'Tue', value: 92 },
    { name: 'Wed', value: 78 },
    { name: 'Thu', value: 88 },
    { name: 'Fri', value: 95 },
    { name: 'Sat', value: 67 },
    { name: 'Sun', value: 72 }
  ];

  // Mock data for time allocation
  const timeAllocationData = [
    { name: 'Deep Work', value: 6.5 },
    { name: 'Meetings', value: 2.3 },
    { name: 'Email', value: 1.2 },
    { name: 'Planning', value: 0.8 },
    { name: 'Breaks', value: 1.2 }
  ];

  // Mock data for productivity score breakdown
  const productivityBreakdown = [
    { category: 'Task Completion', score: 87, icon: 'CheckCircle' },
    { category: 'Time Management', score: 92, icon: 'Clock' },
    { category: 'Focus Quality', score: 78, icon: 'Eye' },
    { category: 'Goal Achievement', score: 85, icon: 'Target' }
  ];

  // Mock data for focus time analysis
  const focusTimeData = [
    { day: 'Mon', focusTime: 6.2, interruptions: 3 },
    { day: 'Tue', focusTime: 5.8, interruptions: 5 },
    { day: 'Wed', focusTime: 7.1, interruptions: 2 },
    { day: 'Thu', focusTime: 4.9, interruptions: 7 },
    { day: 'Fri', focusTime: 6.5, interruptions: 4 },
    { day: 'Sat', focusTime: 3.2, interruptions: 1 },
    { day: 'Sun', focusTime: 2.8, interruptions: 1 }
  ];

  const focusInsights = [
    {
      title: 'Peak Focus Hours',
      description: 'Your best focus time is 9-11 AM with 89% efficiency',
      value: '9-11 AM',
      unit: '',
      icon: 'Clock'
    },
    {
      title: 'Average Deep Work',
      description: 'Daily average of uninterrupted work sessions',
      value: '5.2',
      unit: 'hours',
      icon: 'Eye'
    },
    {
      title: 'Interruption Rate',
      description: 'Average interruptions per work session',
      value: '3.3',
      unit: 'per day',
      icon: 'AlertCircle'
    },
    {
      title: 'Focus Improvement',
      description: 'Improvement in focus time over last month',
      value: '+12',
      unit: '%',
      icon: 'TrendingUp'
    }
  ];

  // Mock data for predictive analytics
  const predictiveData = {
    workload: [
      { date: 'Dec 15', value: 8, type: 'actual' },
      { date: 'Dec 16', value: 12, type: 'actual' },
      { date: 'Dec 17', value: 9, type: 'actual' },
      { date: 'Dec 18', value: 15, type: 'actual' },
      { date: 'Dec 19', value: 11, type: 'actual' },
      { date: 'Today', value: 13, type: 'actual' },
      { date: 'Dec 21', value: 16, type: 'predicted' },
      { date: 'Dec 22', value: 14, type: 'predicted' },
      { date: 'Dec 23', value: 10, type: 'predicted' },
      { date: 'Dec 24', value: 7, type: 'predicted' },
      { date: 'Dec 25', value: 5, type: 'predicted' }
    ],
    deadlines: [
      { date: 'Dec 15', value: 2, type: 'actual' },
      { date: 'Dec 16', value: 4, type: 'actual' },
      { date: 'Dec 17', value: 1, type: 'actual' },
      { date: 'Dec 18', value: 6, type: 'actual' },
      { date: 'Dec 19', value: 3, type: 'actual' },
      { date: 'Today', value: 5, type: 'actual' },
      { date: 'Dec 21', value: 8, type: 'predicted' },
      { date: 'Dec 22', value: 6, type: 'predicted' },
      { date: 'Dec 23', value: 4, type: 'predicted' },
      { date: 'Dec 24', value: 2, type: 'predicted' },
      { date: 'Dec 25', value: 1, type: 'predicted' }
    ],
    productivity: [
      { date: 'Dec 15', value: 85, type: 'actual' },
      { date: 'Dec 16', value: 92, type: 'actual' },
      { date: 'Dec 17', value: 78, type: 'actual' },
      { date: 'Dec 18', value: 88, type: 'actual' },
      { date: 'Dec 19', value: 95, type: 'actual' },
      { date: 'Today', value: 87, type: 'actual' },
      { date: 'Dec 21', value: 82, type: 'predicted' },
      { date: 'Dec 22', value: 89, type: 'predicted' },
      { date: 'Dec 23', value: 91, type: 'predicted' },
      { date: 'Dec 24', value: 75, type: 'predicted' },
      { date: 'Dec 25', value: 68, type: 'predicted' }
    ]
  };

  const predictiveRecommendations = {
    workload: [
      {
        title: 'Redistribute Peak Load',
        description: 'Move 3 tasks from Dec 21 to Dec 23 to balance workload',
        impact: 'High Impact',
        icon: 'BarChart3'
      },
      {
        title: 'Schedule Buffer Time',
        description: 'Add 30min buffer between tasks on high-load days',
        impact: 'Medium Impact',
        icon: 'Clock'
      }
    ],
    deadlines: [
      {
        title: 'Early Start Recommendation',
        description: 'Begin Dec 21 tasks 2 days earlier to avoid deadline pressure',
        impact: 'High Impact',
        icon: 'AlertTriangle'
      },
      {
        title: 'Delegate Opportunity',
        description: 'Consider delegating 2 low-priority tasks due Dec 21',
        impact: 'Medium Impact',
        icon: 'Users'
      }
    ],
    productivity: [
      {
        title: 'Maintain Momentum',
        description: 'Current productivity trend is positive, maintain current habits',
        impact: 'High Impact',
        icon: 'TrendingUp'
      },
      {
        title: 'Holiday Adjustment',
        description: 'Plan lighter workload for Dec 24-25 to maintain balance',
        impact: 'Medium Impact',
        icon: 'Calendar'
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'insights', label: 'AI Insights', icon: 'Brain' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'predictions', label: 'Predictions', icon: 'TrendingUp' }
  ];

  const handleRangeChange = (range, customDates = null) => {
    setIsLoading(true);
    setSelectedRange(range);
    
    // Generate AI insights with actual data
    loadAIInsights();
    
    // Simulate API call for other data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const loadAIInsights = async () => {
    try {
      setError(null);
      
      // Prepare user data for AI analysis
      const userData = {
        metrics: metricsData,
        productivityData,
        timeAllocationData,
        focusTimeData,
        selectedRange,
        timestamp: new Date().toISOString()
      };

      // Generate AI insights
      const insights = await generateProductivityInsights(userData);
      setAiInsights(insights);

      // Generate AI summary
      const summary = await generateProductivitySummary(userData);
      setAiSummary(summary);
      
    } catch (error) {
      console.error('Error loading AI insights:', error);
      setError('Failed to load AI insights. Please check your OpenAI API key.');
      
      // Fallback to mock data
      setAiInsights([
        {
          id: 1,
          type: 'optimization',
          title: 'Optimize Morning Routine',
          category: 'Workflow Optimization',
          description: 'Your productivity peaks between 9-11 AM. Consider scheduling high-priority tasks during this window.',
          analysis: 'Based on 30 days of data analysis, your cognitive performance shows a consistent pattern of peak efficiency during morning hours.',
          recommendations: [
            'Block 9-11 AM for deep work sessions',
            'Schedule meetings after 2 PM when possible',
            'Use morning time for complex problem-solving tasks'
          ],
          metrics: [
            { label: 'Expected Productivity Gain', value: '+23%' },
            { label: 'Time Saved Weekly', value: '3.5 hours' }
          ],
          impact: 'high',
          generatedAt: '2 hours ago'
        }
      ]);
      
      setAiSummary('AI insights temporarily unavailable. Please check your OpenAI API configuration.');
    }
  };

  const handleInsightImplement = (insight) => {
    console.log('Implementing insight:', insight);
    // Here you would typically make an API call to implement the insight
  };

  useEffect(() => {
    // Load AI insights on component mount
    setIsLoading(true);
    loadAIInsights();
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-text-primary mb-2">AI Insights & Analytics</h1>
            <p className="text-text-secondary">
              Comprehensive productivity intelligence powered by OpenAI
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => handleRangeChange(selectedRange)}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button
              variant="primary"
              iconName="Download"
              iconPosition="left"
            >
              Export Report
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={20} className="text-error" />
              <p className="text-error font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Date Range Selector */}
        <DateRangeSelector 
          onRangeChange={handleRangeChange}
          currentRange={selectedRange}
        />

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              iconName={tab.icon}
              iconPosition="left"
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="text-text-secondary">Analyzing your productivity data with AI...</span>
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {!isLoading && (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {metricsData.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ProductivityChart 
                    data={productivityData}
                    title="Weekly Productivity Trend"
                    type="area"
                    color="#2563EB"
                  />
                  <TimeAllocationChart 
                    data={timeAllocationData}
                    title="Time Allocation Breakdown"
                  />
                </div>

                {/* Productivity Score and Focus Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ProductivityScore 
                    score={87}
                    trend={5}
                    breakdown={productivityBreakdown}
                  />
                  <FocusTimeAnalysis 
                    data={focusTimeData}
                    insights={focusInsights}
                  />
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-text-primary">AI-Generated Insights</h2>
                  <div className="flex items-center space-x-2 text-accent">
                    <Icon name="Sparkles" size={16} />
                    <span className="text-sm font-medium">Powered by OpenAI</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {aiInsights.map((insight) => (
                    <InsightCard 
                      key={insight.id}
                      insight={insight}
                      onImplement={handleInsightImplement}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ProductivityChart 
                    data={productivityData}
                    title="Productivity Trend Analysis"
                    type="line"
                    color="#10B981"
                  />
                  <FocusTimeAnalysis 
                    data={focusTimeData}
                    insights={focusInsights}
                  />
                </div>
                
                <TimeAllocationChart 
                  data={timeAllocationData}
                  title="Detailed Time Allocation"
                />
              </div>
            )}

            {activeTab === 'predictions' && (
              <div className="space-y-6">
                <PredictiveAnalytics 
                  predictions={predictiveData}
                  recommendations={predictiveRecommendations}
                />
              </div>
            )}
          </>
        )}

        {/* AI Summary Section */}
        {!isLoading && (
          <div className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Brain" size={24} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">AI Summary</h3>
                <p className="text-text-secondary mb-4">
                  {aiSummary || `Based on your productivity patterns over the last ${selectedRange === '7d' ? '7 days' : selectedRange === '30d' ? '30 days' : 'selected period'}, 
                  you're performing exceptionally well with an 87% productivity score. Your morning focus sessions are your strongest asset, 
                  showing 34% higher efficiency. Consider implementing structured breaks and redistributing your Tuesday/Thursday workload 
                  for optimal performance. The AI predicts a potential 23% productivity gain with these optimizations.`}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-success-100 text-success text-sm rounded-full">High Performance</span>
                  <span className="px-3 py-1 bg-accent-100 text-accent text-sm rounded-full">Optimization Opportunities</span>
                  <span className="px-3 py-1 bg-primary-100 text-primary text-sm rounded-full">OpenAI Powered</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsAnalytics;
