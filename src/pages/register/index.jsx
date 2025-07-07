import React from 'react';
import AuthHeader from './components/AuthHeader';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <AuthHeader />
            <RegistrationForm />
          </div>
        </div>

        {/* Right Side - Trust Signals & Features */}
        <div className="flex-1 bg-secondary-50 p-6 lg:p-12 lg:max-w-lg">
          <div className="h-full flex flex-col justify-center">
            <TrustSignals />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Spacing */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default Register;
