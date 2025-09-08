import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const GeneralSettings = () => {
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [dataRetention, setDataRetention] = useState('365');
  const [offlineSync, setOfflineSync] = useState(true);
  const [autoExport, setAutoExport] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [schoolName, setSchoolName] = useState('Rural Primary School');
  const [academicYear, setAcademicYear] = useState('2024-25');

  const timeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '0', label: 'Never timeout' }
  ];

  const backupFrequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const retentionOptions = [
    { value: '90', label: '3 months' },
    { value: '180', label: '6 months' },
    { value: '365', label: '1 year' },
    { value: '730', label: '2 years' },
    { value: '0', label: 'Keep forever' }
  ];

  const exportFormatOptions = [
    { value: 'csv', label: 'CSV (Excel Compatible)' },
    { value: 'xlsx', label: 'Excel (.xlsx)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' }
  ];

  const academicYearOptions = [
    { value: '2024-25', label: '2024-25' },
    { value: '2025-26', label: '2025-26' },
    { value: '2026-27', label: '2026-27' }
  ];

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      setSessionTimeout('30');
      setAutoBackup(true);
      setBackupFrequency('daily');
      setDataRetention('365');
      setOfflineSync(true);
      setAutoExport(false);
      setExportFormat('csv');
      alert('Settings have been reset to default values.');
    }
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* School Information */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">School Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="School Name"
            description="This will appear in reports and exports"
            value={schoolName}
            onChange={(e) => setSchoolName(e?.target?.value)}
            placeholder="Enter school name"
          />
          
          <Select
            label="Academic Year"
            description="Current academic session"
            options={academicYearOptions}
            value={academicYear}
            onChange={setAcademicYear}
          />
        </div>
      </div>
      {/* Session Management */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Session Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Session Timeout"
            description="Automatically end attendance session after inactivity"
            options={timeoutOptions}
            value={sessionTimeout}
            onChange={setSessionTimeout}
          />
          
          <div className="space-y-3">
            <Checkbox
              checked={offlineSync}
              onChange={(e) => setOfflineSync(e?.target?.checked)}
              label="Offline Mode Support"
              description="Allow attendance marking when internet is unavailable"
            />
            
            <Checkbox
              checked
              onChange={() => {}}
              label="Auto-save Session Data"
              description="Automatically save attendance data every 5 minutes"
            />
          </div>
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Checkbox
                checked={autoBackup}
                onChange={(e) => setAutoBackup(e?.target?.checked)}
                label="Automatic Backup"
                description="Regularly backup attendance data"
              />
            </div>
            
            {autoBackup && (
              <Select
                label="Backup Frequency"
                description="How often to create automatic backups"
                options={backupFrequencyOptions}
                value={backupFrequency}
                onChange={setBackupFrequency}
              />
            )}
            
            <Select
              label="Data Retention Period"
              description="How long to keep attendance records"
              options={retentionOptions}
              value={dataRetention}
              onChange={setDataRetention}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Checkbox
                checked={autoExport}
                onChange={(e) => setAutoExport(e?.target?.checked)}
                label="Auto-Export Reports"
                description="Automatically generate daily reports"
              />
            </div>
            
            <Select
              label="Export Format"
              description="Default format for exported reports"
              options={exportFormatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
            
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="HardDrive" size={16} className="text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Storage Usage</p>
                  <p className="text-muted-foreground">2.3 GB used of 10 GB available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Performance Settings */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Max Students per Session"
            description="Limit concurrent face recognition processing"
            value="50"
            min="10"
            max="100"
          />
          
          <Input
            type="number"
            label="Recognition Retry Attempts"
            description="Number of attempts before marking as absent"
            value="3"
            min="1"
            max="5"
          />
          
          <Checkbox
            checked
            onChange={() => {}}
            label="Enable Performance Monitoring"
            description="Track system performance and generate reports"
          />
          
          <Checkbox
           
            onChange={() => {}}
            label="Low Power Mode"
            description="Reduce processing intensity for battery-powered devices"
          />
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            checked
            onChange={() => {}}
            label="System Alerts"
            description="Show alerts for system errors and warnings"
          />
          
          <Checkbox
            checked
            onChange={() => {}}
            label="Backup Notifications"
            description="Notify when backups are completed or failed"
          />
          
          <Checkbox
           
            onChange={() => {}}
            label="Daily Summary"
            description="Show attendance summary at end of day"
          />
          
          <Checkbox
            checked
            onChange={() => {}}
            label="Low Storage Warnings"
            description="Alert when storage space is running low"
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="destructive"
          onClick={handleResetSettings}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
        >
          Reset to Defaults
        </Button>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => window.location?.reload()}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSaveSettings}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save Settings
          </Button>
        </div>
      </div>
      {/* System Information */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">System Information</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Version</p>
            <p className="font-medium text-foreground">VisionAttend v1.0</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Backup</p>
            <p className="font-medium text-foreground">Today, 6:00 AM</p>
          </div>
          <div>
            <p className="text-muted-foreground">Database Size</p>
            <p className="font-medium text-foreground">2.3 GB</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Students</p>
            <p className="font-medium text-foreground">247 Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;