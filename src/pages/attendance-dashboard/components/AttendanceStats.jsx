import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStats = ({ 
  totalStudents = 0,
  presentStudents = 0,
  absentStudents = 0,
  lateStudents = 0,
  sessionDuration = 0,
  isSessionActive = false
}) => {
  // Mock data for demonstration
  const mockStats = {
    totalStudents: 45,
    presentStudents: 38,
    absentStudents: 7,
    lateStudents: 3,
    attendanceRate: 84.4,
    averageRecognitionTime: 2.3,
    confidenceScore: 92.1
  };

  const stats = {
    totalStudents: totalStudents || mockStats?.totalStudents,
    presentStudents: presentStudents || mockStats?.presentStudents,
    absentStudents: absentStudents || mockStats?.absentStudents,
    lateStudents: lateStudents || mockStats?.lateStudents,
    attendanceRate: mockStats?.attendanceRate,
    averageRecognitionTime: mockStats?.averageRecognitionTime,
    confidenceScore: mockStats?.confidenceScore
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getAttendanceRateColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 75) return 'text-warning';
    return 'text-error';
  };

  const StatCard = ({ icon, label, value, subValue, color = 'text-foreground', bgColor = 'bg-muted/20' }) => (
    <div className={`${bgColor} border border-border rounded-lg p-4 card-shadow`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${bgColor === 'bg-muted/20' ? 'bg-primary/10' : 'bg-white/20'} rounded-lg flex items-center justify-center`}>
            <Icon name={icon} size={20} className={color} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            {subValue && (
              <div className="text-xs text-muted-foreground mt-1">{subValue}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ label, current, total, color = 'bg-primary' }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium text-foreground">
            {current}/{total} ({percentage?.toFixed(1)}%)
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`${color} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="Users"
          label="Total Students"
          value={stats?.totalStudents}
          color="text-foreground"
          subValue=""
        />
        
        <StatCard
          icon="UserCheck"
          label="Present"
          value={stats?.presentStudents}
          subValue={`${((stats?.presentStudents / stats?.totalStudents) * 100)?.toFixed(1)}%`}
          color="text-success"
          bgColor="bg-success/5"
        />
        
        <StatCard
          icon="UserX"
          label="Absent"
          value={stats?.absentStudents}
          subValue={`${((stats?.absentStudents / stats?.totalStudents) * 100)?.toFixed(1)}%`}
          color="text-error"
          bgColor="bg-error/5"
        />
        
        <StatCard
          icon="Clock"
          label="Late Arrivals"
          value={stats?.lateStudents}
          subValue={isSessionActive ? formatDuration(sessionDuration) : 'Session ended'}
          color="text-warning"
          bgColor="bg-warning/5"
        />
      </div>
      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Progress */}
        <div className="bg-surface border border-border rounded-lg p-6 card-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Attendance Progress
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="Present Students"
              current={stats?.presentStudents}
              total={stats?.totalStudents}
              color="bg-success"
            />
            <ProgressBar
              label="Recognition Accuracy"
              current={Math.round(stats?.confidenceScore)}
              total={100}
              color="bg-primary"
            />
            <ProgressBar
              label="Session Completion"
              current={isSessionActive ? 75 : 100}
              total={100}
              color="bg-warning"
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-surface border border-border rounded-lg p-6 card-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Target" size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Attendance Rate</span>
              </div>
              <span className={`text-lg font-bold ${getAttendanceRateColor(stats?.attendanceRate)}`}>
                {stats?.attendanceRate}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Zap" size={20} className="text-warning" />
                <span className="text-sm font-medium text-foreground">Avg. Recognition Time</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                {stats?.averageRecognitionTime}s
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Brain" size={20} className="text-success" />
                <span className="text-sm font-medium text-foreground">Confidence Score</span>
              </div>
              <span className="text-lg font-bold text-success">
                {stats?.confidenceScore}%
              </span>
            </div>

            {isSessionActive && (
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-3">
                  <Icon name="Activity" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Session Duration</span>
                </div>
                <span className="text-lg font-bold text-primary">
                  {formatDuration(sessionDuration)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Quick Insights */}
      <div className="bg-surface border border-border rounded-lg p-6 card-shadow">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Today's Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <Icon name="TrendingUp" size={24} className="text-success mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Attendance improved by</div>
            <div className="text-lg font-bold text-success">+5.2%</div>
            <div className="text-xs text-muted-foreground">vs yesterday</div>
          </div>

          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Fastest recognition</div>
            <div className="text-lg font-bold text-primary">1.2s</div>
            <div className="text-xs text-muted-foreground">Arjun Patel</div>
          </div>

          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <Icon name="Award" size={24} className="text-warning mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Perfect attendance</div>
            <div className="text-lg font-bold text-warning">12</div>
            <div className="text-xs text-muted-foreground">students this week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;