import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobRole: '',
    companySize: '',
    productivityGoals: [],
    timezone: '',
    notifications: true,
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  const jobRoles = [
    "Project Manager",
    "Software Developer",
    "Marketing Manager",
    "Sales Representative",
    "Entrepreneur",
    "Student",
    "Consultant",
    "Designer",
    "Other"
  ];

  const companySizes = [
    "Just me",
    "2-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-1000 employees",
    "1000+ employees"
  ];

  const productivityGoals = [
    "Better task organization",
    "Improved time management",
    "Team collaboration",
    "Project tracking",
    "Habit formation",
    "Deadline management",
    "Focus improvement",
    "Workflow automation"
  ];

  const timezones = [
    "UTC-12:00 (Baker Island)",
    "UTC-11:00 (American Samoa)",
    "UTC-10:00 (Hawaii)",
    "UTC-09:00 (Alaska)",
    "UTC-08:00 (Pacific Time)",
    "UTC-07:00 (Mountain Time)",
    "UTC-06:00 (Central Time)",
    "UTC-05:00 (Eastern Time)",
    "UTC-04:00 (Atlantic Time)",
    "UTC-03:00 (Argentina)",
    "UTC-02:00 (South Georgia)",
    "UTC-01:00 (Azores)",
    "UTC+00:00 (London)",
    "UTC+01:00 (Central Europe)",
    "UTC+02:00 (Eastern Europe)",
    "UTC+03:00 (Moscow)",
    "UTC+04:00 (Dubai)",
    "UTC+05:00 (Pakistan)",
    "UTC+05:30 (India)",
    "UTC+06:00 (Bangladesh)",
    "UTC+07:00 (Thailand)",
    "UTC+08:00 (China)",
    "UTC+09:00 (Japan)",
    "UTC+10:00 (Australia East)",
    "UTC+11:00 (Solomon Islands)",
    "UTC+12:00 (New Zealand)"
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time password strength calculation
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      productivityGoals: prev.productivityGoals.includes(goal)
        ? prev.productivityGoals.filter(g => g !== goal)
        : [...prev.productivityGoals, goal]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData.jobRole) {
        newErrors.jobRole = 'Please select your job role';
      }
      if (!formData.companySize) {
        newErrors.companySize = 'Please select your company size';
      }
      if (formData.productivityGoals.length === 0) {
        newErrors.productivityGoals = 'Please select at least one productivity goal';
      }
    }

    if (step === 3) {
      if (!formData.timezone) {
        newErrors.timezone = 'Please select your timezone';
      }
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSocialRegister = (provider) => {
    setIsLoading(true);
    // Simulate social registration
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setEmailVerificationSent(true);
      setIsLoading(false);
      
      // Simulate email verification and redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  if (emailVerificationSent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Check Your Email
        </h2>
        <p className="text-text-secondary mb-6">
          We've sent a verification link to <strong>{formData.email}</strong>
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-primary-700">
            <Icon name="Info" size={16} className="inline mr-2" />
            Redirecting to dashboard in a few seconds...
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => setEmailVerificationSent(false)}
          className="text-sm"
        >
          Didn't receive the email? Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of 3
          </span>
          <span className="text-sm text-text-muted">
            {Math.round((currentStep / 3) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-secondary-100 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                Create Your Account
              </h2>
              <p className="text-text-secondary">
                Let's get you started with Smart Todo AI
              </p>
            </div>

            {/* Social Registration */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => handleSocialRegister('google')}
                disabled={isLoading}
                iconName="Chrome"
                iconPosition="left"
              >
                Continue with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => handleSocialRegister('microsoft')}
                disabled={isLoading}
                iconName="Windows"
                iconPosition="left"
              >
                Continue with Microsoft
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-text-muted">Or continue with email</span>
              </div>
            </div>

            <div>
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-error' : ''}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-error">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-error' : ''}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-error' : ''}
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">Password strength:</span>
                    <span className={`font-medium ${
                      passwordStrength < 50 ? 'text-error' : 
                      passwordStrength < 75 ? 'text-warning' : 'text-success'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-secondary-100 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={errors.confirmPassword ? 'border-error' : ''}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Professional Information */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                Personalize Your Experience
              </h2>
              <p className="text-text-secondary">
                Help us customize AI recommendations for you
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                What's your role?
              </label>
              <select
                value={formData.jobRole}
                onChange={(e) => handleInputChange('jobRole', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.jobRole ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select your job role</option>
                {jobRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.jobRole && (
                <p className="mt-1 text-sm text-error">{errors.jobRole}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company size
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.companySize ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select company size</option>
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              {errors.companySize && (
                <p className="mt-1 text-sm text-error">{errors.companySize}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                What are your productivity goals? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {productivityGoals.map(goal => (
                  <label
                    key={goal}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.productivityGoals.includes(goal)
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.productivityGoals.includes(goal)}
                      onChange={() => handleGoalToggle(goal)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${
                      formData.productivityGoals.includes(goal)
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {formData.productivityGoals.includes(goal) && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </div>
                    <span className="text-sm">{goal}</span>
                  </label>
                ))}
              </div>
              {errors.productivityGoals && (
                <p className="mt-1 text-sm text-error">{errors.productivityGoals}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                Final Setup
              </h2>
              <p className="text-text-secondary">
                Configure your preferences to get started
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Timezone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.timezone ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select your timezone</option>
                {timezones.map(timezone => (
                  <option key={timezone} value={timezone}>{timezone}</option>
                ))}
              </select>
              {errors.timezone && (
                <p className="mt-1 text-sm text-error">{errors.timezone}</p>
              )}
            </div>

            <div className="bg-secondary-50 rounded-lg p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => handleInputChange('notifications', e.target.checked)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-text-primary">
                    Enable smart notifications
                  </div>
                  <div className="text-sm text-text-secondary">
                    Get AI-powered reminders and productivity insights
                  </div>
                </div>
              </label>
            </div>

            <div className="border-t border-border pt-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  className={`mt-1 ${errors.termsAccepted ? 'border-error' : ''}`}
                />
                <div className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </label>
              {errors.termsAccepted && (
                <p className="mt-1 text-sm text-error">{errors.termsAccepted}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex space-x-3 pt-4">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              disabled={isLoading}
              iconName="ArrowLeft"
              iconPosition="left"
              className="flex-1"
            >
              Previous
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNextStep}
              disabled={isLoading}
              iconName="ArrowRight"
              iconPosition="right"
              className="flex-1"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              loading={isLoading}
              iconName="UserPlus"
              iconPosition="left"
              className="flex-1"
            >
              Create Account
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
