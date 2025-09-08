import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import SessionStatus from '../../components/ui/SessionStatus';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import VideoFeed from './components/VideoFeed';
import StudentRecognitionPanel from './components/StudentRecognitionPanel';
import AttendanceStats from './components/AttendanceStats';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AttendanceDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [cameraStatus, setCameraStatus] = useState('disconnected');
  const [sessionDuration, setSessionDuration] = useState(0);
  const [studentCount, setStudentCount] = useState(38);
  const [selectedDevice, setSelectedDevice] = useState('default');
  const [voiceFeedbackEnabled, setVoiceFeedbackEnabled] = useState(true);
  const [recognizedStudents, setRecognizedStudents] = useState([]);

  // Session timer effect
  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  // Mock camera initialization
  useEffect(() => {
    if (isSessionActive && cameraStatus === 'disconnected') {
      setCameraStatus('connecting');
      setTimeout(() => {
        setCameraStatus('connected');
      }, 2000);
    }
  }, [isSessionActive, cameraStatus]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleStartSession = async () => {
    try {
      setIsSessionActive(true);
      setCameraStatus('connecting');
      setSessionDuration(0);
      
      // Simulate camera initialization
      setTimeout(() => {
        setCameraStatus('connected');
      }, 2000);
      
      // Mock voice announcement
      if (voiceFeedbackEnabled) {
        console.log('Voice: Attendance session started');
      }
    } catch (error) {
      console.error('Failed to start session:', error);
      setCameraStatus('error');
    }
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setCameraStatus('disconnected');
    
    // Mock voice announcement
    if (voiceFeedbackEnabled) {
      console.log('Voice: Attendance session ended');
    }
  };

  const handleCameraToggle = () => {
    if (cameraStatus === 'disconnected') {
      setCameraStatus('connecting');
      setTimeout(() => {
        setCameraStatus('connected');
      }, 1500);
    } else {
      setCameraStatus('disconnected');
    }
  };

  const handleDeviceChange = (deviceId) => {
    setSelectedDevice(deviceId);
    if (cameraStatus === 'connected') {
      setCameraStatus('connecting');
      setTimeout(() => {
        setCameraStatus('connected');
      }, 1000);
    }
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'start-session':
        if (isSessionActive) {
          handleEndSession();
        } else {
          handleStartSession();
        }
        break;
      case 'manual-attendance':
        // Open manual attendance modal
        console.log('Opening manual attendance entry');
        break;
      case 'export-today':
        // Export today's attendance
        console.log('Exporting today\'s attendance');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleManualAttendance = () => {
    console.log('Opening manual attendance dialog');
  };

  const handleVoiceFeedbackToggle = (enabled) => {
    setVoiceFeedbackEnabled(enabled);
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
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-240'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Attendance Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Monitor and manage real-time attendance with facial recognition
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/student-management')}
                iconName="Users"
                iconPosition="left"
                iconSize={16}
              >
                Manage Students
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/attendance-history')}
                iconName="History"
                iconPosition="left"
                iconSize={16}
              >
                View History
              </Button>
            </div>
          </div>

          {/* Session Status */}
          <SessionStatus
            isSessionActive={isSessionActive}
            cameraStatus={cameraStatus}
            studentCount={studentCount}
            sessionDuration={sessionDuration}
            onStartSession={handleStartSession}
            onEndSession={handleEndSession}
          />

          {/* Quick Actions */}
          <QuickActionToolbar
            onAction={handleQuickAction}
            isSessionActive={isSessionActive}
            canExport={true}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Video Feed - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <VideoFeed
                isSessionActive={isSessionActive}
                cameraStatus={cameraStatus}
                onCameraToggle={handleCameraToggle}
                onDeviceChange={handleDeviceChange}
                recognizedStudents={recognizedStudents}
                selectedDevice={selectedDevice}
              />
            </div>

            {/* Student Recognition Panel - Takes 1 column */}
            <div className="xl:col-span-1">
              <StudentRecognitionPanel
                recognizedStudents={recognizedStudents}
                isSessionActive={isSessionActive}
                onManualAttendance={handleManualAttendance}
                onVoiceFeedbackToggle={handleVoiceFeedbackToggle}
                voiceFeedbackEnabled={voiceFeedbackEnabled}
              />
            </div>
          </div>

          {/* Attendance Statistics */}
          <AttendanceStats
            totalStudents={45}
            presentStudents={studentCount}
            absentStudents={7}
            lateStudents={3}
            sessionDuration={sessionDuration}
            isSessionActive={isSessionActive}
          />

          {/* Emergency Actions */}
          <div className="bg-surface border border-border rounded-lg p-6 card-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Emergency & Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/system-settings')}
              >
                <Icon name="Settings" size={24} />
                <span className="text-sm">System Settings</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => console.log('Testing camera')}
              >
                <Icon name="Video" size={24} />
                <span className="text-sm">Test Camera</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => console.log('Backup data')}
              >
                <Icon name="Database" size={24} />
                <span className="text-sm">Backup Data</span>
              </Button>

              <Button
                variant="destructive"
                className="h-20 flex-col space-y-2"
                onClick={() => console.log('Emergency stop')}
              >
                <Icon name="AlertTriangle" size={24} />
                <span className="text-sm">Emergency Stop</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceDashboard;