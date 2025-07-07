import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-elevation-2">
          <Icon name="Brain" size={28} color="white" />
        </div>
        <div className="ml-3">
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            Smart Todo AI
          </h1>
          <p className="text-sm text-text-muted">AI-Powered Productivity</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-6">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Welcome Back
        </h2>
        <p className="text-text-secondary text-lg">
          Sign in to your AI-enhanced productivity workspace
        </p>
      </div>

      {/* AI Features Highlight */}
      <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Sparkles" size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Features</span>
        </div>
        <p className="text-xs text-text-muted">
          Smart task prioritization • Intelligent scheduling • Automated insights
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;
