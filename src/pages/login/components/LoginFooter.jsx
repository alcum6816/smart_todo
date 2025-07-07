import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-8 text-center">
      {/* Trust Signals */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-text-muted">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs text-text-muted">Privacy Protected</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-success" />
          <span className="text-xs text-text-muted">Certified Secure</span>
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button className="text-xs text-text-muted hover:text-text-primary transition-colors">
          Privacy Policy
        </button>
        <span className="text-xs text-text-muted">•</span>
        <button className="text-xs text-text-muted hover:text-text-primary transition-colors">
          Terms of Service
        </button>
        <span className="text-xs text-text-muted">•</span>
        <button className="text-xs text-text-muted hover:text-text-primary transition-colors">
          Support
        </button>
      </div>

      {/* Copyright */}
      <p className="text-xs text-text-muted">
        © {currentYear} Smart Todo AI. All rights reserved.
      </p>

      {/* Demo Credentials Info */}
      <div className="mt-6 p-3 bg-accent-50 border border-accent-100 rounded-lg">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">Demo Access</span>
        </div>
        <p className="text-xs text-text-muted">
          Use demo@smarttodo.ai with password SmartTodo123! for testing
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;
