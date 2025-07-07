import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const AccountSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    language: "English",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const subscriptionData = {
    plan: "Pro Plan",
    status: "Active",
    nextBilling: "2024-02-15",
    amount: "$9.99/month",
    features: ["Unlimited AI Tasks", "Advanced Analytics", "Team Collaboration", "Priority Support"]
  };

  const handleProfileUpdate = () => {
    setIsEditingProfile(false);
    // Mock update success
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsChangingPassword(false);
    // Mock password change success
  };

  const handleDataExport = () => {
    // Mock data export
    const exportData = {
      tasks: 245,
      insights: 89,
      preferences: "All settings"
    };
    console.log("Exporting data:", exportData);
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Profile Information</h3>
          <Button
            variant={isEditingProfile ? "secondary" : "outline"}
            iconName={isEditingProfile ? "X" : "Edit"}
            onClick={() => setIsEditingProfile(!isEditingProfile)}
          >
            {isEditingProfile ? "Cancel" : "Edit"}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Image
                src={profileData.avatar}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
              />
              {isEditingProfile && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-elevation-2">
                  <Icon name="Camera" size={16} color="white" />
                </button>
              )}
            </div>
            {isEditingProfile && (
              <Button variant="ghost" size="sm">
                Change Photo
              </Button>
            )}
          </div>

          {/* Profile Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">First Name</label>
              <Input
                type="text"
                value={profileData.firstName}
                onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                disabled={!isEditingProfile}
                className={!isEditingProfile ? "bg-secondary-50" : ""}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Last Name</label>
              <Input
                type="text"
                value={profileData.lastName}
                onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                disabled={!isEditingProfile}
                className={!isEditingProfile ? "bg-secondary-50" : ""}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditingProfile}
                className={!isEditingProfile ? "bg-secondary-50" : ""}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Phone</label>
              <Input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditingProfile}
                className={!isEditingProfile ? "bg-secondary-50" : ""}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Timezone</label>
              <select
                value={profileData.timezone}
                onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                disabled={!isEditingProfile}
                className={`w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  !isEditingProfile ? "bg-secondary-50" : "bg-surface"
                }`}
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Language</label>
              <select
                value={profileData.language}
                onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value }))}
                disabled={!isEditingProfile}
                className={`w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                  !isEditingProfile ? "bg-secondary-50" : "bg-surface"
                }`}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>
        </div>

        {isEditingProfile && (
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-border">
            <Button variant="secondary" onClick={() => setIsEditingProfile(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleProfileUpdate}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Password Management */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Password & Security</h3>
            <p className="text-sm text-text-secondary mt-1">Manage your account security settings</p>
          </div>
          <Button
            variant={isChangingPassword ? "secondary" : "outline"}
            iconName={isChangingPassword ? "X" : "Lock"}
            onClick={() => setIsChangingPassword(!isChangingPassword)}
          >
            {isChangingPassword ? "Cancel" : "Change Password"}
          </Button>
        </div>

        {isChangingPassword && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Current Password</label>
              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">New Password</label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Confirm New Password</label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setIsChangingPassword(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handlePasswordChange}>
                Update Password
              </Button>
            </div>
          </div>
        )}

        {!isChangingPassword && (
          <div className="flex items-center space-x-4 p-4 bg-success-50 rounded-lg">
            <Icon name="Shield" size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-success">Password last changed 30 days ago</p>
              <p className="text-xs text-success-600">Your account is secure</p>
            </div>
          </div>
        )}
      </div>

      {/* Subscription Details */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Subscription & Billing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
              <div>
                <h4 className="font-medium text-primary">{subscriptionData.plan}</h4>
                <p className="text-sm text-primary-600">{subscriptionData.amount}</p>
              </div>
              <span className="px-3 py-1 bg-success text-success-foreground text-xs font-medium rounded-full">
                {subscriptionData.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Next billing date:</span>
                <span className="text-text-primary">{subscriptionData.nextBilling}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Payment method:</span>
                <span className="text-text-primary">•••• 4242</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-text-primary mb-3">Plan Features</h5>
            <ul className="space-y-2">
              {subscriptionData.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
          <Button variant="outline" iconName="CreditCard">
            Update Payment Method
          </Button>
          <Button variant="outline" iconName="Download">
            Download Invoice
          </Button>
          <Button variant="ghost" iconName="ExternalLink">
            Manage Subscription
          </Button>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Data Management</h3>
        <p className="text-text-secondary mb-6">Export your data or manage your account information</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Download" size={20} className="text-primary" />
              <h4 className="font-medium text-text-primary">Export Data</h4>
            </div>
            <p className="text-sm text-text-secondary mb-4">Download all your tasks, insights, and preferences</p>
            <Button variant="outline" onClick={handleDataExport} fullWidth>
              Export All Data
            </Button>
          </div>
          
          <div className="p-4 border border-error-200 rounded-lg bg-error-50">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Trash2" size={20} className="text-error" />
              <h4 className="font-medium text-error">Delete Account</h4>
            </div>
            <p className="text-sm text-error-600 mb-4">Permanently delete your account and all data</p>
            <Button variant="danger" size="sm" fullWidth>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
