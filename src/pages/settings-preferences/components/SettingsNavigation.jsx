import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsNavigation = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    {
      id: 'account',
      label: 'Account',
      icon: 'User',
      description: 'Profile and account settings'
    },
    {
      id: 'ai-preferences',
      label: 'AI Preferences',
      icon: 'Brain',
      description: 'Customize AI behavior'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Manage notification settings'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Link',
      description: 'Connected services and APIs'
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      icon: 'Shield',
      description: 'Data privacy and security'
    }
  ];

  return (
    <div className="space-y-2">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
            activeTab === item.id
              ? 'bg-primary text-primary-foreground shadow-elevation-1'
              : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
          }`}
        >
          <Icon 
            name={item.icon} 
            size={20} 
            className={activeTab === item.id ? 'text-primary-foreground' : 'text-text-muted'} 
          />
          <div className="flex-1">
            <div className={`text-sm font-medium ${
              activeTab === item.id ? 'text-primary-foreground' : 'text-text-primary'
            }`}>
              {item.label}
            </div>
            <div className={`text-xs ${
              activeTab === item.id ? 'text-primary-foreground opacity-80' : 'text-text-muted'
            }`}>
              {item.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SettingsNavigation;
