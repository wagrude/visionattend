import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusIndicator = () => {
  const [systemStatus, setSystemStatus] = useState({
    camera: 'connected',
    database: 'healthy',
    network: 'online',
    storage: 'normal',
    performance: 'optimal'
  });

  const [systemMetrics, setSystemMetrics] = useState({
    uptime: '2 days, 14 hours',
    memoryUsage: 68,
    cpuUsage: 23,
    storageUsed: 2.3,
    storageTotal: 10,
    activeUsers: 1,
    lastBackup: '6 hours ago'
  });

  useEffect(() => {
    // Simulate real-time status updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(15, Math.min(85, prev?.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(50, Math.min(90, prev?.memoryUsage + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': case'healthy': case'online': case'normal': case'optimal':
        return 'text-success';
      case 'warning': case'slow': case'high':
        return 'text-warning';
      case 'error': case'offline': case'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (component, status) => {
    switch (component) {
      case 'camera':
        return status === 'connected' ? 'Video' : 'VideoOff';
      case 'database':
        return status === 'healthy' ? 'Database' : 'AlertTriangle';
      case 'network':
        return status === 'online' ? 'Wifi' : 'WifiOff';
      case 'storage':
        return 'HardDrive';
      case 'performance':
        return status === 'optimal' ? 'Zap' : 'AlertTriangle';
      default:
        return 'HelpCircle';
    }
  };

  const getStatusText = (component, status) => {
    const statusTexts = {
      camera: {
        connected: 'Camera Ready',
        connecting: 'Connecting...',
        error: 'Camera Error'
      },
      database: {
        healthy: 'Database Healthy',
        warning: 'Needs Optimization',
        critical: 'Database Error'
      },
      network: {
        online: 'Network Online',
        slow: 'Slow Connection',
        offline: 'Network Offline'
      },
      storage: {
        normal: 'Storage Normal',
        warning: 'Storage Low',
        critical: 'Storage Critical'
      },
      performance: {
        optimal: 'Performance Optimal',
        good: 'Performance Good',
        slow: 'Performance Slow'
      }
    };
    
    return statusTexts?.[component]?.[status] || 'Unknown Status';
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">System Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(systemStatus)?.map(([component, status]) => (
          <div key={component} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon 
              name={getStatusIcon(component, status)} 
              size={20} 
              className={getStatusColor(status)} 
            />
            <div>
              <p className="font-medium text-foreground capitalize">{component}</p>
              <p className={`text-sm ${getStatusColor(status)}`}>
                {getStatusText(component, status)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* System Metrics */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">System Metrics</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CPU Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">CPU Usage</span>
              <span className="text-sm font-medium text-foreground">{systemMetrics?.cpuUsage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(systemMetrics?.cpuUsage)}`}
                style={{ width: `${systemMetrics?.cpuUsage}%` }}
              />
            </div>
          </div>

          {/* Memory Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Memory Usage</span>
              <span className="text-sm font-medium text-foreground">{systemMetrics?.memoryUsage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(systemMetrics?.memoryUsage)}`}
                style={{ width: `${systemMetrics?.memoryUsage}%` }}
              />
            </div>
          </div>

          {/* Storage Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Storage Usage</span>
              <span className="text-sm font-medium text-foreground">
                {systemMetrics?.storageUsed} GB / {systemMetrics?.storageTotal} GB
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getUsageColor((systemMetrics?.storageUsed / systemMetrics?.storageTotal) * 100)}`}
                style={{ width: `${(systemMetrics?.storageUsed / systemMetrics?.storageTotal) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Users */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span className="text-sm font-medium text-foreground">{systemMetrics?.activeUsers}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Currently logged in</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">System Uptime</p>
              <p className="text-xs text-muted-foreground">{systemMetrics?.uptime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={16} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Last Backup</p>
              <p className="text-xs text-muted-foreground">{systemMetrics?.lastBackup}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString()}
        </div>
        <button
          onClick={() => window.location?.reload()}
          className="text-xs text-primary hover:text-primary/80 transition-colors duration-200"
        >
          Refresh Status
        </button>
      </div>
    </div>
  );
};

export default SystemStatusIndicator;