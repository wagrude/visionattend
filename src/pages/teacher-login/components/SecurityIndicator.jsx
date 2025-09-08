import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicator = () => {
  const [securityStatus, setSecurityStatus] = useState('checking');
  const [connectionInfo, setConnectionInfo] = useState({
    isSecure: false,
    location: 'Unknown',
    lastLogin: null
  });

  useEffect(() => {
    // Simulate security check
    const checkSecurity = () => {
      setTimeout(() => {
        setSecurityStatus('secure');
        setConnectionInfo({
          isSecure: window.location?.protocol === 'https:',
          location: 'Local Network',
          lastLogin: localStorage.getItem('lastLogin') || null
        });
      }, 1000);
    };

    checkSecurity();
  }, []);

  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Data Encryption',
      description: 'All data is encrypted in transit and at rest',
      status: 'active'
    },
    {
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'Multi-layer security for user verification',
      status: 'active'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protection',
      description: 'Facial data stored locally with privacy controls',
      status: 'active'
    },
    {
      icon: 'Database',
      title: 'Local Storage',
      description: 'Attendance data can be stored offline',
      status: 'active'
    }
  ];

  const getSecurityStatusColor = () => {
    switch (securityStatus) {
      case 'secure':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSecurityStatusIcon = () => {
    switch (securityStatus) {
      case 'secure':
        return 'ShieldCheck';
      case 'warning':
        return 'ShieldAlert';
      case 'error':
        return 'ShieldX';
      default:
        return 'Loader';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Status Header */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Icon 
            name={getSecurityStatusIcon()} 
            size={20} 
            className={`${getSecurityStatusColor()} ${securityStatus === 'checking' ? 'animate-spin' : ''}`} 
          />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Security Status</h3>
            <p className="text-xs text-muted-foreground">
              {securityStatus === 'checking' && 'Verifying connection security...'}
              {securityStatus === 'secure' && 'Your connection is secure and protected'}
              {securityStatus === 'warning' && 'Connection has minor security concerns'}
              {securityStatus === 'error' && 'Security issues detected'}
            </p>
          </div>
        </div>

        {/* Connection Details */}
        {securityStatus === 'secure' && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Connection:</span>
              <div className="flex items-center space-x-1">
                <Icon name={connectionInfo?.isSecure ? 'Lock' : 'Unlock'} size={12} className="text-success" />
                <span className="text-foreground">{connectionInfo?.isSecure ? 'Encrypted' : 'Local'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Network:</span>
              <span className="text-foreground">{connectionInfo?.location}</span>
            </div>
            {connectionInfo?.lastLogin && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Login:</span>
                <span className="text-foreground">{connectionInfo?.lastLogin}</span>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Security Features */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Security Features</h3>
        <div className="space-y-2">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-6 h-6 bg-success/10 rounded-full flex-shrink-0">
                <Icon name={feature?.icon} size={12} className="text-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-medium text-foreground">{feature?.title}</h4>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-xs text-success">Active</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Compliance Information */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Award" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-primary mb-1">Educational Compliance</h3>
            <p className="text-xs text-primary/80 leading-relaxed">
              VisionAttend complies with educational data protection standards and privacy regulations. 
              All student data is handled according to institutional policies and local privacy laws.
            </p>
          </div>
        </div>
      </div>
      {/* Help & Support */}
      <div className="text-center">
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 focus-ring rounded px-2 py-1">
          Need help with login? Contact IT Support
        </button>
      </div>
    </div>
  );
};

export default SecurityIndicator;