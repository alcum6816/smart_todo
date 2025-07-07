import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

import Input from './Input';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'ai-insight', message: 'AI suggests prioritizing 3 high-impact tasks', time: '2m ago', read: false },
    { id: 2, type: 'deadline', message: 'Project deadline approaching in 2 days', time: '1h ago', read: false },
    { id: 3, type: 'completion', message: '5 tasks completed today', time: '3h ago', read: true }
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Tasks', path: '/task-management', icon: 'CheckSquare' },
    { label: 'Insights', path: '/ai-insights-analytics', icon: 'TrendingUp' },
    { label: 'Settings', path: '/settings-preferences', icon: 'Settings' }
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simulate AI processing
      setAiProcessing(true);
      setTimeout(() => {
        setAiProcessing(false);
        // Navigate to task management with search query
        navigate('/task-management', { state: { searchQuery } });
      }, 1500);
    }
  };

  const handleVoiceSearch = () => {
    // Voice search functionality
    setAiProcessing(true);
    setTimeout(() => {
      setAiProcessing(false);
      setSearchQuery('Voice input processed');
    }, 2000);
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'ai-insight') {
      navigate('/ai-insights-analytics');
    } else if (notification.type === 'deadline') {
      navigate('/task-management');
    }
    
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu')) {
        setIsProfileMenuOpen(false);
      }
      if (!event.target.closest('.notification-menu')) {
        setIsNotificationOpen(false);
      }
      if (!event.target.closest('.search-container')) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't render header on auth pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Brain" size={20} color="white" />
          </div>
          <h1 className="text-xl font-heading font-semibold text-text-primary">
            Smart Todo AI
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {aiProcessing && isActive && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-accent rounded-full animate-ai-thinking"></div>
                    <div className="w-1 h-1 bg-accent rounded-full animate-ai-thinking" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-accent rounded-full animate-ai-thinking" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Search Bar */}
        <div className={`search-container hidden md:flex items-center transition-all duration-300 ${
          isSearchExpanded ? 'w-80' : 'w-64'
        }`}>
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              type="search"
              placeholder="Search tasks or ask AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchExpanded(true)}
              className="pl-10 pr-12 bg-secondary-50 border-secondary-200 focus:bg-surface"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-secondary-100 transition-colors"
            >
              <Icon name="Mic" size={16} className="text-text-muted hover:text-accent" />
            </button>
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search */}
          <button className="md:hidden p-2 rounded-lg hover:bg-secondary-50 transition-colors">
            <Icon name="Search" size={20} className="text-text-secondary" />
          </button>

          {/* Notifications */}
          <div className="notification-menu relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <Icon name="Bell" size={20} className="text-text-secondary" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-surface border border-border rounded-xl shadow-elevation-3 py-2 z-60">
                <div className="px-4 py-2 border-b border-border">
                  <h3 className="font-medium text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full px-4 py-3 text-left hover:bg-secondary-50 transition-colors ${
                        !notification.read ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'ai-insight' ? 'bg-primary' :
                          notification.type === 'deadline' ? 'bg-warning' : 'bg-success'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-text-primary">{notification.message}</p>
                          <p className="text-xs text-text-muted mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="profile-menu relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-muted" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-12 w-48 bg-surface border border-border rounded-xl shadow-elevation-3 py-2 z-60">
                <button
                  onClick={() => {
                    navigate('/settings-preferences');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-secondary-50 transition-colors flex items-center space-x-2"
                >
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/settings-preferences');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-secondary-50 transition-colors flex items-center space-x-2"
                >
                  <Icon name="User" size={16} />
                  <span>Profile</span>
                </button>
                <hr className="my-2 border-border" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-50 transition-colors flex items-center space-x-2"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
        <div className="flex items-center justify-around h-16 px-4">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-primary' :'text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="text-xs font-medium">{item.label}</span>
                {aiProcessing && isActive && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-accent rounded-full animate-ai-thinking"></div>
                    <div className="w-1 h-1 bg-accent rounded-full animate-ai-thinking" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-accent rounded-full animate-ai-thinking" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
