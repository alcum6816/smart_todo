import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and SOC 2 compliance'
    },
    {
      icon: 'Users',
      title: '50,000+ Users',
      description: 'Trusted by professionals worldwide'
    },
    {
      icon: 'Award',
      title: 'Industry Recognition',
      description: 'Featured in top productivity publications'
    },
    {
      icon: 'Clock',
      title: '24/7 Support',
      description: 'Always here when you need assistance'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      quote: 'Smart Todo AI increased my productivity by 40%. The AI insights are game-changing.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Entrepreneur',
      company: 'StartupXYZ',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      quote: 'Finally, a todo app that understands my workflow and helps me prioritize effectively.'
    },
    {
      name: 'Emily Johnson',
      role: 'Marketing Director',
      company: 'GrowthCo',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      quote: 'The natural language processing is incredible. I just type what I need to do.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Features */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 text-center">
          Why Choose Smart Todo AI?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary text-sm">{feature.title}</h4>
                <p className="text-xs text-text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 text-center">
          What Our Users Say
        </h3>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-secondary-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <div className="flex-1">
                  <p className="text-sm text-text-primary italic mb-2">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-text-primary">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-text-muted">•</span>
                    <span className="text-xs text-text-secondary">
                      {testimonial.role} at {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 opacity-60">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs font-medium text-text-secondary">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-primary" />
          <span className="text-xs font-medium text-text-secondary">GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-accent" />
          <span className="text-xs font-medium text-text-secondary">SOC 2 Certified</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-text-muted">
        <p>© {new Date().getFullYear()} Smart Todo AI. All rights reserved.</p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
