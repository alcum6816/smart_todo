import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import SettingsNavigation from './components/SettingsNavigation';
import AccountSettings from './components/AccountSettings';
import AIPreferences from './components/AIPreferences';
import NotificationSettings from './components/NotificationSettings';
import IntegrationSettings from './components/IntegrationSettings';
import PrivacySettings from './components/PrivacySettings';

const SettingsPreferences = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Search functionality
  const searchableSettings = [
    { id: 'account', keywords: ['profile', 'password', 'email', 'subscription', 'billing', 'export', 'delete'] },
    { id: 'ai-preferences', keywords: ['ai', 'categorization', 'priority', 'suggestions', 'nlp', 'automation', 'learning'] },
    { id: 'notifications', keywords: ['notifications', 'alerts', 'email', 'push', 'reminders', 'quiet', 'timing'] },
    { id: 'integrations', keywords: ['integrations', 'calendar', 'slack', 'gmail', 'github', 'webhooks', 'api'] },
    { id: 'privacy', keywords: ['privacy', 'security', 'data', 'tracking', 'sharing', 'visibility', '2fa', 'audit'] }
  ];

  const filteredTabs = searchQuery
    ? searchableSettings.filter(setting =>
        setting.keywords.some(keyword =>
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ).map(setting => setting.id)
    : null;

  // Auto-save functionality
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && filteredTabs && filteredTabs.length > 0) {
      setActiveTab(filteredTabs[0]);
    }
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />;
      case 'ai-preferences':
        return <AIPreferences />;
      case 'notifications':
        return <NotificationSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      default:
        return <AccountSettings />;
    }
  };

  const getActiveTabInfo = () => {
    const tabInfo = {
      'account': { title: 'Account Settings', description: 'Manage your profile, subscription, and account preferences' },
      'ai-preferences': { title: 'AI Preferences', description: 'Customize how AI processes and suggests tasks' },
      'notifications': { title: 'Notification Settings', description: 'Control when and how you receive notifications' },
      'integrations': { title: 'Integrations', description: 'Connect with external services and manage API access' },
      'privacy': { title: 'Privacy & Security', description: 'Manage your data privacy and security settings' }
    };
    return tabInfo[activeTab] || tabInfo.account;
  };

  return (
    <>
      <Helmet>
        <title>Settings & Preferences - Smart Todo AI</title>
        <meta name="description" content="Customize your Smart Todo AI experience with comprehensive settings for account, AI preferences, notifications, integrations, and privacy controls." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="pt-16 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">Settings & Preferences</h1>
                  <p className="text-text-secondary">Customize your Smart Todo AI experience</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="max-w-md">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search settings..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Desktop Navigation Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="bg-surface rounded-xl border border-border p-4">
                    <SettingsNavigation 
                      activeTab={activeTab} 
                      onTabChange={handleTabChange}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="outline"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  iconName={isMobileMenuOpen ? "X" : "Menu"}
                  fullWidth
                >
                  {getActiveTabInfo().title}
                </Button>
                
                {isMobileMenuOpen && (
                  <div className="mt-4 bg-surface rounded-xl border border-border p-4">
                    <SettingsNavigation 
                      activeTab={activeTab} 
                      onTabChange={handleTabChange}
                    />
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Content Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    {getActiveTabInfo().title}
                  </h2>
                  <p className="text-text-secondary">
                    {getActiveTabInfo().description}
                  </p>
                </div>

                {/* Search Results Info */}
                {searchQuery && filteredTabs && (
                  <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <div className="flex items-center space-x-2">
                      <Icon name="Search" size={16} className="text-primary" />
                      <span className="text-sm text-primary">
                        Found {filteredTabs.length} section{filteredTabs.length !== 1 ? 's' : ''} matching "{searchQuery}"
                      </span>
                    </div>
                  </div>
                )}

                {/* Settings Content */}
                <div className="space-y-6">
                  {renderActiveContent()}
                </div>

                {/* Unsaved Changes Warning */}
                {hasUnsavedChanges && (
                  <div className="fixed bottom-20 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-warning text-warning-foreground p-4 rounded-lg shadow-elevation-3 z-50">
                    <div className="flex items-center space-x-3">
                      <Icon name="AlertTriangle" size={20} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">You have unsaved changes</p>
                        <p className="text-xs opacity-80">Don't forget to save your settings</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setHasUnsavedChanges(false)}>
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-12 bg-surface rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" iconName="RotateCcw" onClick={() => window.location.reload()}>
                  Reset All Settings
                </Button>
                <Button variant="outline" iconName="Download">
                  Export Settings
                </Button>
                <Button variant="outline" iconName="Upload">
                  Import Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPreferences;
