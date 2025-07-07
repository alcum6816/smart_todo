import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    // Data Collection
    analyticsTracking: true,
    performanceMetrics: true,
    errorReporting: true,
    usageStatistics: false,
    
    // AI Privacy
    aiDataProcessing: true,
    personalizedSuggestions: true,
    dataRetention: "1year",
    anonymizeData: true,
    
    // Sharing & Visibility
    profileVisibility: "private",
    taskSharingDefault: "private",
    activityStatus: false,
    searchIndexing: false,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginNotifications: true,
    deviceTracking: true,
    
    // Communication
    marketingEmails: false,
    productUpdates: true,
    securityAlerts: true,
    surveyInvitations: false
  });

  const [dataRequests, setDataRequests] = useState([
    {
      id: 1,
      type: 'export',
      status: 'completed',
      requestDate: '2024-01-10T10:00:00Z',
      completedDate: '2024-01-10T10:30:00Z',
      downloadUrl: 'https://example.com/export/user-data.zip'
    },
    {
      id: 2,
      type: 'deletion',
      status: 'pending',
      requestDate: '2024-01-14T15:00:00Z',
      completedDate: null,
      downloadUrl: null
    }
  ]);

  const [auditLog, setAuditLog] = useState([
    {
      id: 1,
      action: 'Login',
      timestamp: '2024-01-15T09:30:00Z',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'New York, US'
    },
    {
      id: 2,
      action: 'Password Changed',
      timestamp: '2024-01-14T16:45:00Z',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'New York, US'
    },
    {
      id: 3,
      action: 'Data Export Requested',
      timestamp: '2024-01-10T10:00:00Z',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'New York, US'
    }
  ]);

  const handleToggle = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelectChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const requestDataExport = () => {
    const newRequest = {
      id: Date.now(),
      type: 'export',
      status: 'processing',
      requestDate: new Date().toISOString(),
      completedDate: null,
      downloadUrl: null
    };
    setDataRequests(prev => [newRequest, ...prev]);
  };

  const requestDataDeletion = () => {
    const newRequest = {
      id: Date.now(),
      type: 'deletion',
      status: 'pending',
      requestDate: new Date().toISOString(),
      completedDate: null,
      downloadUrl: null
    };
    setDataRequests(prev => [newRequest, ...prev]);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success-50';
      case 'processing': return 'text-warning bg-warning-50';
      case 'pending': return 'text-text-muted bg-secondary-50';
      default: return 'text-text-muted bg-secondary-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Collection */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Data Collection & Analytics</h3>
        
        <div className="space-y-4">
          {[
            { key: 'analyticsTracking', label: 'Analytics Tracking', description: 'Help improve the app by sharing usage analytics' },
            { key: 'performanceMetrics', label: 'Performance Metrics', description: 'Share performance data to help optimize the app' },
            { key: 'errorReporting', label: 'Error Reporting', description: 'Automatically report errors to help fix bugs' },
            { key: 'usageStatistics', label: 'Usage Statistics', description: 'Share detailed usage patterns for research' }
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text-primary">{item.label}</h4>
                <p className="text-xs text-text-secondary mt-1">{item.description}</p>
              </div>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings[item.key] ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Privacy */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">AI & Machine Learning</h3>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 rounded-lg border border-border">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-text-primary">AI Data Processing</h4>
              <p className="text-xs text-text-secondary mt-1">Allow AI to process your task data for intelligent features</p>
            </div>
            <button
              onClick={() => handleToggle('aiDataProcessing')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                privacySettings.aiDataProcessing ? 'bg-primary' : 'bg-secondary-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  privacySettings.aiDataProcessing ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-start justify-between p-4 rounded-lg border border-border">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-text-primary">Personalized Suggestions</h4>
              <p className="text-xs text-text-secondary mt-1">Enable AI to provide personalized task suggestions</p>
            </div>
            <button
              onClick={() => handleToggle('personalizedSuggestions')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                privacySettings.personalizedSuggestions ? 'bg-primary' : 'bg-secondary-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  privacySettings.personalizedSuggestions ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Data Retention Period</h4>
              <p className="text-xs text-text-secondary mt-1">How long to keep your data for AI training</p>
            </div>
            <select
              value={privacySettings.dataRetention}
              onChange={(e) => handleSelectChange('dataRetention', e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="3months">3 months</option>
              <option value="6months">6 months</option>
              <option value="1year">1 year</option>
              <option value="2years">2 years</option>
              <option value="indefinite">Indefinite</option>
            </select>
          </div>

          <div className="flex items-start justify-between p-4 rounded-lg border border-border">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-text-primary">Anonymize Data</h4>
              <p className="text-xs text-text-secondary mt-1">Remove personal identifiers from data used for AI training</p>
            </div>
            <button
              onClick={() => handleToggle('anonymizeData')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                privacySettings.anonymizeData ? 'bg-primary' : 'bg-secondary-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  privacySettings.anonymizeData ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Sharing & Visibility */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Sharing & Visibility</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Profile Visibility</h4>
              <p className="text-xs text-text-secondary mt-1">Who can see your profile information</p>
            </div>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Task Sharing Default</h4>
              <p className="text-xs text-text-secondary mt-1">Default privacy level for new shared tasks</p>
            </div>
            <select
              value={privacySettings.taskSharingDefault}
              onChange={(e) => handleSelectChange('taskSharingDefault', e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="public">Public</option>
              <option value="team">Team Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {[
            { key: 'activityStatus', label: 'Activity Status', description: 'Show when you\'re active or last seen' },
            { key: 'searchIndexing', label: 'Search Indexing', description: 'Allow your public content to be indexed by search engines' }
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text-primary">{item.label}</h4>
                <p className="text-xs text-text-secondary mt-1">{item.description}</p>
              </div>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings[item.key] ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Security & Access</h3>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 rounded-lg border border-border">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-text-primary">Two-Factor Authentication</h4>
              <p className="text-xs text-text-secondary mt-1">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-3">
              {!privacySettings.twoFactorAuth && (
                <Button variant="outline" size="sm">
                  Setup 2FA
                </Button>
              )}
              <button
                onClick={() => handleToggle('twoFactorAuth')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.twoFactorAuth ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Session Timeout</h4>
              <p className="text-xs text-text-secondary mt-1">Automatically log out after inactivity</p>
            </div>
            <select
              value={privacySettings.sessionTimeout}
              onChange={(e) => handleSelectChange('sessionTimeout', e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="240">4 hours</option>
              <option value="never">Never</option>
            </select>
          </div>

          {[
            { key: 'loginNotifications', label: 'Login Notifications', description: 'Get notified of new login attempts' },
            { key: 'deviceTracking', label: 'Device Tracking', description: 'Track devices that access your account' }
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text-primary">{item.label}</h4>
                <p className="text-xs text-text-secondary mt-1">{item.description}</p>
              </div>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings[item.key] ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Rights */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Data Rights & Requests</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Request Your Data</h4>
            <p className="text-sm text-text-secondary">Download a copy of all your data</p>
            <Button variant="outline" iconName="Download" onClick={requestDataExport}>
              Request Data Export
            </Button>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Delete Your Data</h4>
            <p className="text-sm text-text-secondary">Permanently delete your account and all data</p>
            <Button variant="danger" iconName="Trash2" onClick={requestDataDeletion}>
              Request Data Deletion
            </Button>
          </div>
        </div>

        {/* Data Requests History */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary">Request History</h4>
          <div className="space-y-3">
            {dataRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <h5 className="text-sm font-medium text-text-primary capitalize">
                    Data {request.type}
                  </h5>
                  <p className="text-xs text-text-secondary">
                    Requested: {formatTimestamp(request.requestDate)}
                  </p>
                  {request.completedDate && (
                    <p className="text-xs text-text-secondary">
                      Completed: {formatTimestamp(request.completedDate)}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  {request.downloadUrl && (
                    <Button variant="outline" size="sm" iconName="Download">
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Security Activity Log</h3>
        
        <div className="space-y-3">
          {auditLog.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div>
                <h5 className="text-sm font-medium text-text-primary">{entry.action}</h5>
                <p className="text-xs text-text-secondary">
                  {formatTimestamp(entry.timestamp)} • {entry.device}
                </p>
                <p className="text-xs text-text-muted">
                  {entry.ipAddress} • {entry.location}
                </p>
              </div>
              <Icon name="Shield" size={16} className="text-text-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
