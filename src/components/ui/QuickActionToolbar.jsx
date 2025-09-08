import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const QuickActionToolbar = ({ 
  onAction,
  isSessionActive = false,
  selectedStudents = [],
  canExport = true 
}) => {
  const location = useLocation();

  const getToolbarActions = () => {
    switch (location?.pathname) {
      case '/attendance-dashboard':
        return [
          {
            id: 'start-session',
            label: isSessionActive ? 'End Session' : 'Start Session',
            icon: isSessionActive ? 'Square' : 'Play',
            variant: isSessionActive ? 'destructive' : 'default',
            disabled: false,
            primary: true
          },
          {
            id: 'manual-attendance',
            label: 'Manual Entry',
            icon: 'UserCheck',
            variant: 'outline',
            disabled: !isSessionActive
          },
          {
            id: 'export-today',
            label: 'Export Today',
            icon: 'Download',
            variant: 'outline',
            disabled: !canExport
          }
        ];

      case '/student-management':
        return [
          {
            id: 'add-student',
            label: 'Add Student',
            icon: 'UserPlus',
            variant: 'default',
            disabled: false,
            primary: true
          },
          {
            id: 'bulk-import',
            label: 'Import CSV',
            icon: 'Upload',
            variant: 'outline',
            disabled: false
          },
          {
            id: 'train-faces',
            label: 'Train Recognition',
            icon: 'Brain',
            variant: 'outline',
            disabled: selectedStudents?.length === 0
          },
          {
            id: 'export-roster',
            label: 'Export Roster',
            icon: 'Download',
            variant: 'outline',
            disabled: !canExport
          }
        ];

      case '/attendance-history':
        return [
          {
            id: 'export-report',
            label: 'Export Report',
            icon: 'FileText',
            variant: 'default',
            disabled: !canExport,
            primary: true
          },
          {
            id: 'filter-dates',
            label: 'Filter Dates',
            icon: 'Calendar',
            variant: 'outline',
            disabled: false
          },
          {
            id: 'correct-attendance',
            label: 'Make Corrections',
            icon: 'Edit',
            variant: 'outline',
            disabled: selectedStudents?.length === 0
          }
        ];

      case '/system-settings':
        return [
          {
            id: 'test-camera',
            label: 'Test Camera',
            icon: 'Video',
            variant: 'default',
            disabled: false,
            primary: true
          },
          {
            id: 'backup-data',
            label: 'Backup Data',
            icon: 'Database',
            variant: 'outline',
            disabled: false
          },
          {
            id: 'reset-settings',
            label: 'Reset Settings',
            icon: 'RotateCcw',
            variant: 'destructive',
            disabled: false
          }
        ];

      default:
        return [];
    }
  };

  const actions = getToolbarActions();
  const primaryActions = actions?.filter(action => action?.primary);
  const secondaryActions = actions?.filter(action => !action?.primary);

  const handleActionClick = (actionId) => {
    if (onAction) {
      onAction(actionId);
    }
  };

  if (actions?.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-4 card-shadow">
      <div className="flex items-center justify-between">
        {/* Left Section - Primary Actions */}
        <div className="flex items-center space-x-3">
          {primaryActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              onClick={() => handleActionClick(action?.id)}
              disabled={action?.disabled}
              iconName={action?.icon}
              iconPosition="left"
              iconSize={16}
              className="micro-feedback"
            >
              {action?.label}
            </Button>
          ))}
        </div>

        {/* Right Section - Secondary Actions */}
        {secondaryActions?.length > 0 && (
          <div className="flex items-center space-x-2">
            {secondaryActions?.map((action) => (
              <Button
                key={action?.id}
                variant={action?.variant}
                size="sm"
                onClick={() => handleActionClick(action?.id)}
                disabled={action?.disabled}
                iconName={action?.icon}
                iconPosition="left"
                iconSize={14}
                className="micro-feedback"
              >
                {action?.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      {/* Context Information */}
      {selectedStudents?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {selectedStudents?.length} student{selectedStudents?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
        </div>
      )}
      {/* Session Context for Dashboard */}
      {location?.pathname === '/attendance-dashboard' && isSessionActive && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Attendance session is active. Camera is monitoring for student recognition.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionToolbar;