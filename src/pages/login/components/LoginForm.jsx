import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'demo@smarttodo.ai',
    password: 'SmartTodo123!'
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/dashboard');
      } else {
        // Failed login
        setErrors({
          general: 'Invalid email or password. Please use demo@smarttodo.ai with password SmartTodo123!'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider.toLowerCase()}.com`);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full ${errors.email ? 'border-error focus:border-error' : ''}`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pr-12 ${errors.password ? 'border-error focus:border-error' : ''}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="p-3 bg-error-50 border border-error-100 rounded-lg">
            <p className="text-sm text-error flex items-center">
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              {errors.general}
            </p>
          </div>
        )}

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          className="mt-6"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-primary hover:text-primary-700 transition-colors"
          >
            Forgot your password?
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-text-muted">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialLogin('Google')}
            disabled={isLoading}
            className="flex items-center justify-center space-x-2"
          >
            <Icon name="Chrome" size={20} />
            <span>Continue with Google</span>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialLogin('Microsoft')}
            disabled={isLoading}
            className="flex items-center justify-center space-x-2"
          >
            <Icon name="Square" size={20} />
            <span>Continue with Microsoft</span>
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-text-muted">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-primary hover:text-primary-700 font-medium transition-colors"
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
