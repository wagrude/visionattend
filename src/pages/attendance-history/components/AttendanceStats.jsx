import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStats = ({ stats, dateRange }) => {
  const statCards = [
    {
      title: 'Total Sessions',
      value: stats?.totalSessions,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: stats?.sessionChange,
      changeType: stats?.sessionChange >= 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Present Students',
      value: stats?.presentCount,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: stats?.presentChange,
      changeType: stats?.presentChange >= 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Absent Students',
      value: stats?.absentCount,
      icon: 'UserX',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      change: stats?.absentChange,
      changeType: stats?.absentChange >= 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Average Attendance',
      value: `${stats?.averageAttendance}%`,
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: stats?.attendanceChange,
      changeType: stats?.attendanceChange >= 0 ? 'increase' : 'decrease'
    }
  ];

  const getChangeIcon = (changeType) => {
    return changeType === 'increase' ? 'TrendingUp' : 'TrendingDown';
  };

  const getChangeColor = (changeType) => {
    return changeType === 'increase' ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                  <Icon name={stat?.icon} size={20} className={stat?.color} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat?.title}</p>
                  <p className="text-lg font-semibold text-foreground">{stat?.value}</p>
                </div>
              </div>
              
              {stat?.change !== undefined && (
                <div className={`flex items-center space-x-1 ${getChangeColor(stat?.changeType)}`}>
                  <Icon name={getChangeIcon(stat?.changeType)} size={14} />
                  <span className="text-xs font-medium">
                    {Math.abs(stat?.change)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance Breakdown */}
        <div className="bg-surface border border-border rounded-lg p-4 card-shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Attendance Breakdown</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-sm text-foreground">Present</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{stats?.presentCount}</span>
                <span className="text-xs text-muted-foreground">
                  ({((stats?.presentCount / (stats?.presentCount + stats?.absentCount)) * 100)?.toFixed(1)}%)
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full" />
                <span className="text-sm text-foreground">Absent</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{stats?.absentCount}</span>
                <span className="text-xs text-muted-foreground">
                  ({((stats?.absentCount / (stats?.presentCount + stats?.absentCount)) * 100)?.toFixed(1)}%)
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span className="text-sm text-foreground">Late</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{stats?.lateCount}</span>
                <span className="text-xs text-muted-foreground">
                  ({((stats?.lateCount / (stats?.presentCount + stats?.absentCount)) * 100)?.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recognition Method Stats */}
        <div className="bg-surface border border-border rounded-lg p-4 card-shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Eye" size={20} className="text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Recognition Methods</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Facial Recognition</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{stats?.facialRecognition}</span>
                <span className="text-xs text-muted-foreground">
                  ({((stats?.facialRecognition / stats?.totalRecords) * 100)?.toFixed(1)}%)
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-secondary" />
                <span className="text-sm text-foreground">Manual Entry</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{stats?.manualEntry}</span>
                <span className="text-xs text-muted-foreground">
                  ({((stats?.manualEntry / stats?.totalRecords) * 100)?.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Recognition Accuracy</span>
              <span className="font-medium text-success">{stats?.recognitionAccuracy}%</span>
            </div>
          </div>
        </div>
      </div>
      {/* Date Range Summary */}
      <div className="bg-surface border border-border rounded-lg p-4 card-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Period Summary</h3>
          </div>
          <span className="text-xs text-muted-foreground">
            {dateRange?.start} to {dateRange?.end}
          </span>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{stats?.totalDays}</div>
            <div className="text-xs text-muted-foreground">Total Days</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{stats?.schoolDays}</div>
            <div className="text-xs text-muted-foreground">School Days</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{stats?.totalRecords}</div>
            <div className="text-xs text-muted-foreground">Total Records</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{stats?.uniqueStudents}</div>
            <div className="text-xs text-muted-foreground">Unique Students</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;