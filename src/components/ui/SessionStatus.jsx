import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SessionStatus = ({ 
  isSessionActive = false, 
  cameraStatus = 'disconnected', 
  studentCount = 0, 
  sessionDuration = 0,
  onStartSession,
  onEndSession 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getCameraStatusColor = () => {
    switch (cameraStatus) {
      case 'connected':
        return 'text-success';
      case 'connecting':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCameraStatusIcon = () => {
    switch (cameraStatus) {
      case 'connected':
        return 'Video';
      case 'connecting':
        return 'Loader';
      case 'error':
        return 'VideoOff';
      default:
        return 'VideoOff';
    }
  };

  const getSessionStatusColor = () => {
    return isSessionActive ? 'text-success' : 'text-muted-foreground';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 card-shadow">
      <div className="flex items-center justify-between">
        {/* Left Section - Session Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full status-indicator ${
              isSessionActive ? 'bg-success' : 'bg-muted-foreground'
            }`} />
            <span className={`text-sm font-medium status-indicator ${getSessionStatusColor()}`}>
              {isSessionActive ? 'Session Active' : 'Session Inactive'}
            </span>
          </div>

          {isSessionActive && (
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm font-mono text-foreground">
                {formatDuration(sessionDuration)}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {studentCount} Students
            </span>
          </div>
        </div>

        {/* Center Section - Camera Status */}
        <div className="flex items-center space-x-2">
          <Icon 
            name={getCameraStatusIcon()} 
            size={16} 
            className={`status-indicator ${getCameraStatusColor()}`}
          />
          <span className={`text-sm font-medium status-indicator ${getCameraStatusColor()}`}>
            {cameraStatus === 'connected' && 'Camera Ready'}
            {cameraStatus === 'connecting' && 'Connecting...'}
            {cameraStatus === 'error' && 'Camera Error'}
            {cameraStatus === 'disconnected' && 'Camera Off'}
          </span>
        </div>

        {/* Right Section - Current Time and Actions */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-mono text-foreground">
              {currentTime?.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentTime?.toLocaleDateString([], { 
                weekday: 'short',
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {!isSessionActive ? (
            <button
              onClick={onStartSession}
              disabled={cameraStatus !== 'connected'}
              className="flex items-center space-x-2 px-4 py-2 bg-success text-success-foreground rounded-md text-sm font-medium hover:bg-success/90 disabled:opacity-50 disabled:cursor-not-allowed micro-feedback focus-ring"
            >
              <Icon name="Play" size={16} />
              <span>Start Session</span>
            </button>
          ) : (
            <button
              onClick={onEndSession}
              className="flex items-center space-x-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-sm font-medium hover:bg-destructive/90 micro-feedback focus-ring"
            >
              <Icon name="Square" size={16} />
              <span>End Session</span>
            </button>
          )}
        </div>
      </div>
      {/* Additional Status Information */}
      {(cameraStatus === 'error' || cameraStatus === 'connecting') && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon 
              name={cameraStatus === 'error' ? 'AlertTriangle' : 'Info'} 
              size={14} 
              className={cameraStatus === 'error' ? 'text-warning' : 'text-muted-foreground'} 
            />
            <span className="text-xs text-muted-foreground">
              {cameraStatus === 'error' && 'Please check camera connection and permissions'}
              {cameraStatus === 'connecting' && 'Initializing camera for facial recognition...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionStatus;