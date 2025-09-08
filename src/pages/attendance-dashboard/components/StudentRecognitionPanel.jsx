import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentRecognitionPanel = ({ 
  recognizedStudents = [],
  isSessionActive = false,
  onManualAttendance,
  onVoiceFeedbackToggle,
  voiceFeedbackEnabled = true
}) => {
  const [recentRecognitions, setRecentRecognitions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock recognized students data
  const mockRecognizedStudents = [
    {
      id: 'STU001',
      name: 'Arjun Patel',
      rollNumber: '2024001',
      recognizedAt: new Date(Date.now() - 300000), // 5 minutes ago
      confidence: 0.95,
      status: 'present',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      voiceConfirmed: true
    },
    {
      id: 'STU002',
      name: 'Priya Sharma',
      rollNumber: '2024002',
      recognizedAt: new Date(Date.now() - 180000), // 3 minutes ago
      confidence: 0.92,
      status: 'present',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      voiceConfirmed: true
    },
    {
      id: 'STU003',
      name: 'Rahul Kumar',
      rollNumber: '2024003',
      recognizedAt: new Date(Date.now() - 120000), // 2 minutes ago
      confidence: 0.88,
      status: 'present',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      voiceConfirmed: false
    },
    {
      id: 'STU004',
      name: 'Sneha Gupta',
      rollNumber: '2024004',
      recognizedAt: new Date(Date.now() - 60000), // 1 minute ago
      confidence: 0.94,
      status: 'present',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      voiceConfirmed: true
    }
  ];

  useEffect(() => {
    if (isSessionActive) {
      setRecentRecognitions(mockRecognizedStudents);
    }
  }, [isSessionActive]);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 min ago';
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    return `${diffInHours} hours ago`;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-success';
    if (confidence >= 0.8) return 'text-warning';
    return 'text-error';
  };

  const filteredStudents = recentRecognitions?.filter(student =>
    student?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    student?.rollNumber?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleManualAdd = () => {
    if (onManualAttendance) {
      onManualAttendance();
    }
  };

  const handleVoiceToggle = () => {
    if (onVoiceFeedbackToggle) {
      onVoiceFeedbackToggle(!voiceFeedbackEnabled);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg card-shadow h-full flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">
            Recognized Students
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVoiceToggle}
              iconName={voiceFeedbackEnabled ? "Volume2" : "VolumeX"}
              iconSize={16}
              className={voiceFeedbackEnabled ? 'text-success' : 'text-muted-foreground'}
            >
              <span className="sr-only">Toggle voice feedback</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualAdd}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={14}
              disabled={!isSessionActive}
            >
              Manual
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      {/* Recognition Statistics */}
      <div className="p-4 border-b border-border bg-muted/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-success">
              {recentRecognitions?.length}
            </div>
            <div className="text-xs text-muted-foreground">Present</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-warning">
              {recentRecognitions?.filter(s => s?.confidence < 0.9)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Low Conf.</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-primary">
              {recentRecognitions?.filter(s => s?.voiceConfirmed)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Confirmed</div>
          </div>
        </div>
      </div>
      {/* Student List */}
      <div className="flex-1 overflow-y-auto">
        {!isSessionActive ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6">
            <Icon name="Users" size={48} className="mb-4" />
            <h4 className="text-lg font-medium mb-2">No Active Session</h4>
            <p className="text-sm text-center">
              Start an attendance session to see recognized students appear here.
            </p>
          </div>
        ) : filteredStudents?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6">
            <Icon name="UserX" size={48} className="mb-4" />
            <h4 className="text-lg font-medium mb-2">
              {searchQuery ? 'No Results Found' : 'Waiting for Recognition'}
            </h4>
            <p className="text-sm text-center">
              {searchQuery 
                ? 'Try adjusting your search terms.' :'Students will appear here as they are recognized by the camera.'
              }
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {filteredStudents?.map((student) => (
              <div
                key={student?.id}
                className="flex items-center space-x-3 p-3 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                {/* Student Avatar */}
                <div className="relative">
                  <img
                    src={student?.avatar}
                    alt={student?.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-background rounded-full" />
                </div>

                {/* Student Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-foreground truncate">
                      {student?.name}
                    </h5>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(student?.recognizedAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {student?.rollNumber}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-medium ${getConfidenceColor(student?.confidence)}`}>
                        {Math.round(student?.confidence * 100)}%
                      </span>
                      {student?.voiceConfirmed && (
                        <Icon name="Volume2" size={12} className="text-success" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Voice Feedback Status */}
      {isSessionActive && (
        <div className="p-3 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Icon 
                name={voiceFeedbackEnabled ? "Volume2" : "VolumeX"} 
                size={14} 
                className={voiceFeedbackEnabled ? 'text-success' : 'text-muted-foreground'} 
              />
              <span className="text-muted-foreground">
                Voice feedback: <span className={voiceFeedbackEnabled ? 'text-success' : 'text-muted-foreground'}>
                  {voiceFeedbackEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </span>
            </div>
            <span className="text-muted-foreground">
              Last update: {new Date()?.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRecognitionPanel;