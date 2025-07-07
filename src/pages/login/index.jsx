import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-accent rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-secondary rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-primary rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-surface border border-border rounded-2xl shadow-elevation-3 p-8">
          <LoginHeader />
          <LoginForm />
          <LoginFooter />
        </div>

        {/* Floating AI Assistant Hint */}
        <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-full shadow-elevation-2 animate-ai-pulse">
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ai-thinking"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-ai-thinking ml-1" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-ai-thinking ml-1" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>

      {/* Mobile Optimization Notice */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden">
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-xs text-text-muted text-center">
            Optimized for mobile productivity on-the-go
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
