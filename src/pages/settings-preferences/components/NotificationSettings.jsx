import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    // General Settings
    masterNotifications: true,
    doNotDisturb: false,
    quietHours: { enabled: false, start: "22:00", end: "08:00" },
    
    // Channel Preferences
    email: {
      enabled: true,
      taskReminders: true,
      aiInsights: true,
      deadlineAlerts: true,
      weeklyReports: true,
      systemUpdates: false
    },
    push: {
      enabled: true,
      taskReminders: true,
      aiInsights: false,
      deadlineAlerts: true,
      weeklyReports: false,
      systemUpdates: true
    },
    inApp: {
      enabled: true,
      taskReminders: true,
      aiInsights: true,
      deadlineAlerts: true,
      weeklyReports: true,
      systemUpdates: true
    },
    
    // AI-Specific Notifications
    aiNotifications: {
      smartSuggestions: true,
      priorityChanges: true,
      workflowOptimizations: true,
      focusReminders: false,
      productivityInsights: true,
      learningUpdates: false
    },
    
    // Timing Settings
    reminderTiming: {
      taskReminders: "15", // minutes before
      deadlineAlerts: "24", // hours before
      aiInsights: "daily"
    }
  });

  const handleToggle = (category, setting) => {
    if (category) {
      setNotificationSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [setting]: !prev[category][setting]
        }
      }));
    } else {
      setNotificationSettings(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };

  const handleTimeChange = (category, setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const testNotification = (type) => {
    // Mock notification test
    console.log(`Testing ${type} notification`);
    // Show temporary success message
  };

  return (
    <div className="space-y-6">
      {/* Master Controls */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Master Controls</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={20} className="text-primary" />
              <div>
                <h4 className="text-sm font-medium text-text-primary">All Notifications</h4>
                <p className="text-xs text-text-secondary">Master switch for all notifications</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle(null, 'masterNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.masterNotifications ? 'bg-primary' : 'bg-secondary-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.masterNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <Icon name="Moon" size={20} className="text-secondary" />
              <div>
                <h4 className="text-sm font-medium text-text-primary">Do Not Disturb</h4>
                <p className="text-xs text-text-secondary">Temporarily disable all notifications</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle(null, 'doNotDisturb')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.doNotDisturb ? 'bg-primary' : 'bg-secondary-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.doNotDisturb ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Quiet Hours */}
          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} className="text-accent" />
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Quiet Hours</h4>
                  <p className="text-xs text-text-secondary">Set specific hours to limit notifications</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('quietHours', 'enabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.quietHours.enabled ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {notificationSettings.quietHours.enabled && (
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex-1">
                  <label className="block text-xs text-text-secondary mb-1">Start Time</label>
                  <input
                    type="time"
                    value={notificationSettings.quietHours.start}
                    onChange={(e) => handleTimeChange('quietHours', 'start', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-text-secondary mb-1">End Time</label>
                  <input
                    type="time"
                    value={notificationSettings.quietHours.end}
                    onChange={(e) => handleTimeChange('quietHours', 'end', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Channel Preferences */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Notification Channels</h3>
        
        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={20} className="text-primary" />
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Email Notifications</h4>
                  <p className="text-xs text-text-secondary">Receive notifications via email</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={() => testNotification('email')}>
                  Test
                </Button>
                <button
                  onClick={() => handleToggle('email', 'enabled')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.email.enabled ? 'bg-primary' : 'bg-secondary-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.email.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            {notificationSettings.email.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8">
                {Object.entries(notificationSettings.email).filter(([key]) => key !== 'enabled').map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-3 text-sm">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleToggle('email', key)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Push Notifications */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={20} className="text-success" />
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Push Notifications</h4>
                  <p className="text-xs text-text-secondary">Receive push notifications on your device</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={() => testNotification('push')}>
                  Test
                </Button>
                <button
                  onClick={() => handleToggle('push', 'enabled')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.push.enabled ? 'bg-primary' : 'bg-secondary-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.push.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            {notificationSettings.push.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8">
                {Object.entries(notificationSettings.push).filter(([key]) => key !== 'enabled').map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-3 text-sm">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleToggle('push', key)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* In-App Notifications */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon name="Monitor" size={20} className="text-accent" />
                <div>
                  <h4 className="text-sm font-medium text-text-primary">In-App Notifications</h4>
                  <p className="text-xs text-text-secondary">Show notifications within the application</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('inApp', 'enabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.inApp.enabled ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.inApp.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {notificationSettings.inApp.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8">
                {Object.entries(notificationSettings.inApp).filter(([key]) => key !== 'enabled').map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-3 text-sm">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleToggle('inApp', key)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI-Specific Notifications */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">AI-Powered Notifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(notificationSettings.aiNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div>
                <h4 className="text-sm font-medium text-text-primary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {key === 'smartSuggestions' && 'AI-generated task suggestions'}
                  {key === 'priorityChanges' && 'When AI adjusts task priorities'}
                  {key === 'workflowOptimizations' && 'Workflow improvement suggestions'}
                  {key === 'focusReminders' && 'AI-powered focus session reminders'}
                  {key === 'productivityInsights' && 'Weekly productivity analysis'}
                  {key === 'learningUpdates' && 'AI learning progress updates'}
                </p>
              </div>
              <button
                onClick={() => handleToggle('aiNotifications', key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Timing Settings */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Notification Timing</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Task Reminders</h4>
              <p className="text-xs text-text-secondary">How early to remind before task due time</p>
            </div>
            <select
              value={notificationSettings.reminderTiming.taskReminders}
              onChange={(e) => handleTimeChange('reminderTiming', 'taskReminders', e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Deadline Alerts</h4>
              <p className="text-xs text-text-secondary">How early to alert before deadlines</p>
            </div>
            <select
              value={notificationSettings.reminderTiming.deadlineAlerts}
              onChange={(e) => handleTimeChange('reminderTiming', 'deadlineAlerts', e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="1">1 hour</option>
              <option value="6">6 hours</option>
              <option value="24">1 day</option>
              <option value="72">3 days</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-text-primary">AI Insights</h4>
              <p className="text-xs text-text-secondary">Frequency of AI productivity insights</p>
            </div>
            <select
              value={notificationSettings.reminderTiming.aiInsights}
              onChange={(e) => handleTimeChange('reminderTiming', 'aiInsights', e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
