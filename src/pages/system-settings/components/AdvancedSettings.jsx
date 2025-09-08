import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedSettings = () => {
  const [modelVersion, setModelVersion] = useState('v2.1.0');
  const [updateChannel, setUpdateChannel] = useState('stable');
  const [debugMode, setDebugMode] = useState(false);
  const [apiLogging, setApiLogging] = useState(true);
  const [performanceLogging, setPerformanceLogging] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackupSize, setLastBackupSize] = useState('2.3 GB');
  const [databaseHealth, setDatabaseHealth] = useState('excellent');

  const modelVersionOptions = [
    { value: 'v2.1.0', label: 'v2.1.0 (Current - Stable)' },
    { value: 'v2.0.5', label: 'v2.0.5 (Previous - Stable)' },
    { value: 'v2.2.0-beta', label: 'v2.2.0-beta (Testing)' }
  ];

  const updateChannelOptions = [
    { value: 'stable', label: 'Stable (Recommended)' },
    { value: 'beta', label: 'Beta (Early Access)' },
    { value: 'manual', label: 'Manual Updates Only' }
  ];

  const logLevelOptions = [
    { value: 'error', label: 'Errors Only' },
    { value: 'warning', label: 'Warnings & Errors' },
    { value: 'info', label: 'Info, Warnings & Errors' },
    { value: 'debug', label: 'All Logs (Debug Mode)' }
  ];

  const handleUpdateModel = () => {
    if (window.confirm('Updating the facial recognition model will restart the system. Continue?')) {
      alert('Model update initiated. System will restart automatically when complete.');
    }
  };

  const handleBackupData = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          alert('Backup completed successfully!\nLocation: /backups/visionattend_backup_2025-01-08.zip\nSize: 2.3 GB');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleRestoreData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip,.sql';
    input.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        if (window.confirm(`Restore data from ${file?.name}? This will overwrite current data.`)) {
          alert('Data restoration initiated. This may take several minutes...');
        }
      }
    };
    input?.click();
  };

  const handleOptimizeDatabase = () => {
    if (window.confirm('Database optimization will temporarily lock the system. Continue?')) {
      alert('Database optimization completed!\n• Freed 150 MB of space\n• Improved query performance by 15%\n• Rebuilt 3 indexes');
      setDatabaseHealth('excellent');
    }
  };

  const handleExportLogs = () => {
    alert('System logs exported successfully!\nLocation: /exports/system_logs_2025-01-08.txt\nSize: 45 MB');
  };

  const handleClearCache = () => {
    if (window.confirm('Clear all cached data? This may temporarily slow down face recognition.')) {
      alert('Cache cleared successfully! Freed 320 MB of storage space.');
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getHealthIcon = (health) => {
    switch (health) {
      case 'excellent': return 'CheckCircle';
      case 'good': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Icon name={getHealthIcon(databaseHealth)} size={20} className={getHealthColor(databaseHealth)} />
            <div>
              <p className="font-medium text-foreground">Database Health</p>
              <p className={`text-sm capitalize ${getHealthColor(databaseHealth)}`}>{databaseHealth}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Cpu" size={20} className="text-success" />
            <div>
              <p className="font-medium text-foreground">System Performance</p>
              <p className="text-sm text-success">Optimal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Wifi" size={20} className="text-success" />
            <div>
              <p className="font-medium text-foreground">Network Status</p>
              <p className="text-sm text-success">Connected</p>
            </div>
          </div>
        </div>
      </div>
      {/* Model Management */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Facial Recognition Model</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Select
              label="Model Version"
              description="Current facial recognition model version"
              options={modelVersionOptions}
              value={modelVersion}
              onChange={setModelVersion}
            />
            
            <Select
              label="Update Channel"
              description="How to receive model updates"
              options={updateChannelOptions}
              value={updateChannel}
              onChange={setUpdateChannel}
            />
            
            <Button
              variant="default"
              onClick={handleUpdateModel}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Update Model
            </Button>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Model Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-medium text-foreground">97.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Training Data:</span>
                <span className="font-medium text-foreground">50K+ faces</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model Size:</span>
                <span className="font-medium text-foreground">45 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium text-foreground">Dec 15, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Backup & Restore</h4>
            
            {isBackingUp ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Backing up data...</span>
                  <span className="font-medium text-foreground">{backupProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${backupProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  onClick={handleBackupData}
                  iconName="Database"
                  iconPosition="left"
                  iconSize={16}
                  className="flex-1"
                >
                  Backup Data
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRestoreData}
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={16}
                  className="flex-1"
                >
                  Restore Data
                </Button>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              <p>Last backup: Today, 6:00 AM</p>
              <p>Backup size: {lastBackupSize}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Database Maintenance</h4>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleOptimizeDatabase}
                iconName="Zap"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                Optimize Database
              </Button>
              <Button
                variant="outline"
                onClick={handleClearCache}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                Clear Cache
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Database size: 2.3 GB</p>
              <p>Cache size: 320 MB</p>
            </div>
          </div>
        </div>
      </div>
      {/* Logging & Debugging */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Logging & Debugging</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Select
              label="Log Level"
              description="Amount of detail in system logs"
              options={logLevelOptions}
              value="info"
              onChange={() => {}}
            />
            
            <div className="space-y-3">
              <Checkbox
                checked={debugMode}
                onChange={(e) => setDebugMode(e?.target?.checked)}
                label="Debug Mode"
                description="Enable detailed debugging information"
              />
              
              <Checkbox
                checked={apiLogging}
                onChange={(e) => setApiLogging(e?.target?.checked)}
                label="API Request Logging"
                description="Log all API requests and responses"
              />
              
              <Checkbox
                checked={performanceLogging}
                onChange={(e) => setPerformanceLogging(e?.target?.checked)}
                label="Performance Monitoring"
                description="Track system performance metrics"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Log Management</h4>
            
            <Button
              variant="outline"
              onClick={handleExportLogs}
              iconName="FileText"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Export System Logs
            </Button>
            
            <div className="bg-muted rounded-lg p-3">
              <div className="text-sm">
                <p className="font-medium text-foreground mb-2">Recent Log Activity</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• Camera initialized successfully</p>
                  <p>• 15 students recognized in last session</p>
                  <p>• Database backup completed</p>
                  <p>• Performance metrics updated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Developer Tools */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Developer Tools</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="API Endpoint"
            description="Custom API endpoint for development"
            value="https://api.visionattend.local"
            placeholder="Enter API endpoint"
          />
          
          <Input
            type="password"
            label="Developer Key"
            description="Authentication key for advanced features"
            placeholder="Enter developer key"
          />
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-warning">Developer Mode Warning</p>
              <p className="mt-1 text-xs">
                These settings are intended for development and testing only. Incorrect configuration may affect system stability.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Reset Options */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h3>
        
        <div className="space-y-3">
          <Button
            variant="destructive"
            onClick={() => {
              if (window.confirm('Reset all system settings to factory defaults? This cannot be undone.')) {
                alert('System settings have been reset to factory defaults. Please restart the application.');
              }
            }}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Factory Reset
          </Button>
          
          <p className="text-sm text-muted-foreground">
            This will reset all settings, clear all data, and restore the system to its initial state.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;