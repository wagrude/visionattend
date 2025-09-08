import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import SystemStatusIndicator from './components/SystemStatusIndicator';
import CameraConfiguration from './components/CameraConfiguration';
import VoiceSettings from './components/VoiceSettings';
import GeneralSettings from './components/GeneralSettings';
import AdvancedSettings from './components/AdvancedSettings';
import Icon from '../../components/AppIcon';

const SystemSettings = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: 'Settings',
      description: 'Basic system configuration'
    },
    {
      id: 'camera',
      label: 'Camera',
      icon: 'Video',
      description: 'Camera and recognition settings'
    },
    {
      id: 'voice',
      label: 'Voice',
      icon: 'Volume2',
      description: 'Voice feedback and announcements'
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: 'Code',
      description: 'Advanced system configuration'
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'test-camera': alert('Camera test initiated. Please check the Camera tab for live preview.');
        setActiveTab('camera');
        break;
      case 'backup-data':
        if (window.confirm('Start system backup? This may take several minutes.')) {
          alert('Backup started successfully. You will be notified when complete.');
        }
        break;
      case 'reset-settings':
        if (window.confirm('Reset all settings to default values? This action cannot be undone.')) {
          alert('Settings have been reset to default values. Please restart the application.');
        }
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'camera':
        return <CameraConfiguration />;
      case 'voice':
        return <VoiceSettings />;
      case 'advanced':
        return <AdvancedSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSidebarToggle={handleSidebarToggle}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      <main className={`pt-16 transition-all duration-200 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-240'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
              <p className="text-muted-foreground mt-1">
                Configure attendance system parameters and preferences
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Settings" size={20} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">VisionAttend v1.0</span>
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActionToolbar onAction={handleQuickAction} />

          {/* System Status */}
          <SystemStatusIndicator />

          {/* Settings Tabs */}
          <div className="bg-surface border border-border rounded-lg card-shadow">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Settings tabs">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Tab Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">
                  {tabs?.find(tab => tab?.id === activeTab)?.label} Settings
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {tabs?.find(tab => tab?.id === activeTab)?.description}
                </p>
              </div>

              {/* Dynamic Content */}
              {renderTabContent()}
            </div>
          </div>

          {/* Footer Information */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Settings are automatically saved when changed
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Last modified: {new Date()?.toLocaleDateString()} at {new Date()?.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemSettings;