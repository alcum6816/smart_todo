import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationSettings = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync tasks with your Google Calendar events',
      icon: 'Calendar',
      connected: true,
      status: 'active',
      lastSync: '2024-01-15T10:30:00Z',
      features: ['Two-way sync', 'Event creation', 'Deadline mapping'],
      settings: {
        syncDirection: 'bidirectional',
        autoCreateEvents: true,
        defaultCalendar: 'primary'
      }
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get task notifications and create tasks from Slack',
      icon: 'MessageSquare',
      connected: true,
      status: 'active',
      lastSync: '2024-01-15T09:15:00Z',
      features: ['Task notifications', 'Quick task creation', 'Team updates'],
      settings: {
        notificationChannel: '#productivity',
        mentionTrigger: true,
        dailyDigest: true
      }
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Convert emails to tasks and send task summaries',
      icon: 'Mail',
      connected: false,
      status: 'disconnected',
      lastSync: null,
      features: ['Email to task', 'Task summaries', 'Smart filtering'],
      settings: {
        autoConvert: false,
        filterLabels: [],
        summaryFrequency: 'weekly'
      }
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Track issues and pull requests as tasks',
      icon: 'Github',
      connected: true,
      status: 'warning',
      lastSync: '2024-01-14T16:45:00Z',
      features: ['Issue tracking', 'PR management', 'Milestone sync'],
      settings: {
        repositories: ['user/repo1', 'user/repo2'],
        syncIssues: true,
        syncPRs: false
      }
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Import boards and cards as organized task lists',
      icon: 'Trello',
      connected: false,
      status: 'disconnected',
      lastSync: null,
      features: ['Board import', 'Card sync', 'List organization'],
      settings: {
        selectedBoards: [],
        syncComments: true,
        preserveLabels: true
      }
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Sync with Notion databases and pages',
      icon: 'FileText',
      connected: false,
      status: 'disconnected',
      lastSync: null,
      features: ['Database sync', 'Page creation', 'Property mapping'],
      settings: {
        databases: [],
        syncDirection: 'import',
        propertyMapping: {}
      }
    }
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: 'Task Completion Webhook',
      url: 'https://api.example.com/webhooks/tasks',
      events: ['task.completed', 'task.created'],
      active: true,
      lastTriggered: '2024-01-15T11:20:00Z'
    },
    {
      id: 2,
      name: 'AI Insights Webhook',
      url: 'https://analytics.example.com/ai-insights',
      events: ['ai.insight.generated'],
      active: false,
      lastTriggered: null
    }
  ]);

  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production API Key',
      key: 'sk-prod-****-****-****-****',
      created: '2024-01-01T00:00:00Z',
      lastUsed: '2024-01-15T10:30:00Z',
      permissions: ['read', 'write'],
      active: true
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'sk-dev-****-****-****-****',
      created: '2024-01-10T00:00:00Z',
      lastUsed: '2024-01-14T15:20:00Z',
      permissions: ['read'],
      active: true
    }
  ]);

  const handleConnect = (integrationId) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: true, status: 'active', lastSync: new Date().toISOString() }
          : integration
      )
    );
  };

  const handleDisconnect = (integrationId) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: false, status: 'disconnected', lastSync: null }
          : integration
      )
    );
  };

  const handleSync = (integrationId) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, lastSync: new Date().toISOString(), status: 'active' }
          : integration
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success-50 border-success-200';
      case 'warning': return 'text-warning bg-warning-50 border-warning-200';
      case 'disconnected': return 'text-text-muted bg-secondary-50 border-secondary-200';
      default: return 'text-text-muted bg-secondary-50 border-secondary-200';
    }
  };

  const formatLastSync = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Connected Services */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Connected Services</h3>
            <p className="text-sm text-text-secondary mt-1">Manage your third-party integrations</p>
          </div>
          <Button variant="outline" iconName="RefreshCw">
            Sync All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name={integration.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{integration.name}</h4>
                    <p className="text-xs text-text-secondary">{integration.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Last sync:</span>
                  <span className="text-text-primary">{formatLastSync(integration.lastSync)}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-text-secondary text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2 pt-2">
                  {integration.connected ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="RefreshCw"
                        onClick={() => handleSync(integration.id)}
                      >
                        Sync
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Settings"
                      >
                        Configure
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Unlink"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="Link"
                      onClick={() => handleConnect(integration.id)}
                      fullWidth
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Webhooks</h3>
            <p className="text-sm text-text-secondary mt-1">Configure webhooks for real-time notifications</p>
          </div>
          <Button variant="outline" iconName="Plus">
            Add Webhook
          </Button>
        </div>

        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-text-primary">{webhook.name}</h4>
                  <p className="text-sm text-text-secondary font-mono">{webhook.url}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    webhook.active ? 'bg-success-50 text-success' : 'bg-secondary-50 text-text-muted'
                  }`}>
                    {webhook.active ? 'Active' : 'Inactive'}
                  </span>
                  <button className="p-1 rounded-md hover:bg-secondary-100 transition-colors">
                    <Icon name="MoreHorizontal" size={16} className="text-text-muted" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex flex-wrap gap-1">
                  {webhook.events.map((event, index) => (
                    <span key={index} className="px-2 py-1 bg-primary-50 text-primary text-xs rounded">
                      {event}
                    </span>
                  ))}
                </div>
                <span className="text-text-secondary">
                  Last triggered: {webhook.lastTriggered ? formatLastSync(webhook.lastTriggered) : 'Never'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">API Keys</h3>
            <p className="text-sm text-text-secondary mt-1">Manage API keys for external integrations</p>
          </div>
          <Button variant="outline" iconName="Plus">
            Generate Key
          </Button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-text-primary">{apiKey.name}</h4>
                  <p className="text-sm text-text-secondary font-mono">{apiKey.key}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    apiKey.active ? 'bg-success-50 text-success' : 'bg-secondary-50 text-text-muted'
                  }`}>
                    {apiKey.active ? 'Active' : 'Inactive'}
                  </span>
                  <button className="p-1 rounded-md hover:bg-secondary-100 transition-colors">
                    <Icon name="Copy" size={16} className="text-text-muted" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-error-50 transition-colors">
                    <Icon name="Trash2" size={16} className="text-error" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Created:</span>
                  <span className="text-text-primary ml-2">{new Date(apiKey.created).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Last used:</span>
                  <span className="text-text-primary ml-2">{formatLastSync(apiKey.lastUsed)}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Permissions:</span>
                  <div className="flex gap-1 mt-1">
                    {apiKey.permissions.map((permission, index) => (
                      <span key={index} className="px-2 py-1 bg-secondary-100 text-text-secondary text-xs rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Import/Export */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Data Import/Export</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Import Data</h4>
            <p className="text-sm text-text-secondary">Import tasks and data from other productivity tools</p>
            
            <div className="space-y-3">
              <Button variant="outline" iconName="Upload" fullWidth>
                Import from CSV
              </Button>
              <Button variant="outline" iconName="Upload" fullWidth>
                Import from JSON
              </Button>
              <Button variant="outline" iconName="Upload" fullWidth>
                Import from Todoist
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Export Data</h4>
            <p className="text-sm text-text-secondary">Export your tasks and data for backup or migration</p>
            
            <div className="space-y-3">
              <Button variant="outline" iconName="Download" fullWidth>
                Export to CSV
              </Button>
              <Button variant="outline" iconName="Download" fullWidth>
                Export to JSON
              </Button>
              <Button variant="outline" iconName="Download" fullWidth>
                Export Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;
