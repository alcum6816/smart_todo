import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-elevation-2">
          <Icon name="Brain" size={28} color="white" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            Smart Todo AI
          </h1>
          <p className="text-sm text-text-muted">Intelligent Task Management</p>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Transform Your Productivity with AI
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed">
          Join thousands of professionals who've revolutionized their task management with intelligent automation, smart prioritization, and AI-powered insights.
        </p>
        
        {/* Key Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-text-primary">AI Prioritization</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={16} className="text-success" />
            </div>
            <span className="text-sm font-medium text-text-primary">Smart Goals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={16} className="text-accent" />
            </div>
            <span className="text-sm font-medium text-text-primary">Analytics</span>
          </div>
        </div>
      </div>

      {/* Login Link */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-text-secondary">Already have an account?</span>
        <Button
          variant="link"
          onClick={() => navigate('/login')}
          className="p-0 h-auto font-medium"
        >
          Sign in here
        </Button>
      </div>
    </div>
  );
};

export default AuthHeader;
