import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AttendanceTable = ({ 
  attendanceData, 
  selectedRecords, 
  onRecordSelect, 
  onSelectAll,
  onStatusChange,
  onSort,
  sortField,
  sortDirection 
}) => {
  const [editingRecord, setEditingRecord] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'text-success bg-success/10';
      case 'absent':
        return 'text-destructive bg-destructive/10';
      case 'late':
        return 'text-warning bg-warning/10';
      case 'excused':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return 'CheckCircle';
      case 'absent':
        return 'XCircle';
      case 'late':
        return 'Clock';
      case 'excused':
        return 'Shield';
      default:
        return 'Circle';
    }
  };

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
  };

  const handleStatusEdit = (recordId, newStatus) => {
    onStatusChange(recordId, newStatus);
    setEditingRecord(null);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const statusOptions = [
    { value: 'present', label: 'Present', icon: 'CheckCircle' },
    { value: 'absent', label: 'Absent', icon: 'XCircle' },
    { value: 'late', label: 'Late', icon: 'Clock' },
    { value: 'excused', label: 'Excused', icon: 'Shield' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg card-shadow overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-3">
                <Checkbox
                  checked={selectedRecords?.length === attendanceData?.length && attendanceData?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('date')}
                  iconName={getSortIcon('date')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Date
                </Button>
              </th>
              <th className="text-left p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('studentName')}
                  iconName={getSortIcon('studentName')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Student
                </Button>
              </th>
              <th className="text-left p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('class')}
                  iconName={getSortIcon('class')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Class
                </Button>
              </th>
              <th className="text-left p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('status')}
                  iconName={getSortIcon('status')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Status
                </Button>
              </th>
              <th className="text-left p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('timestamp')}
                  iconName={getSortIcon('timestamp')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Time
                </Button>
              </th>
              <th className="text-left p-3">Method</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData?.map((record) => (
              <tr key={record?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="p-3">
                  <Checkbox
                    checked={selectedRecords?.includes(record?.id)}
                    onChange={(e) => onRecordSelect(record?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-3">
                  <div className="text-sm font-medium text-foreground">
                    {formatDate(record?.date)}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {record?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{record?.studentName}</div>
                      <div className="text-xs text-muted-foreground">ID: {record?.studentId}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground">{record?.class}</span>
                </td>
                <td className="p-3">
                  {editingRecord === record?.id ? (
                    <div className="flex items-center space-x-2">
                      <select
                        className="text-xs border border-border rounded px-2 py-1 bg-surface"
                        defaultValue={record?.status}
                        onChange={(e) => handleStatusEdit(record?.id, e?.target?.value)}
                        onBlur={() => setEditingRecord(null)}
                        autoFocus
                      >
                        {statusOptions?.map(option => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingRecord(record?.id)}
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record?.status)} hover:opacity-80 transition-opacity`}
                    >
                      <Icon name={getStatusIcon(record?.status)} size={12} />
                      <span className="capitalize">{record?.status}</span>
                    </button>
                  )}
                </td>
                <td className="p-3">
                  <div className="text-sm text-foreground">{formatTime(record?.timestamp)}</div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={record?.method === 'facial' ? 'Eye' : 'User'} 
                      size={14} 
                      className="text-muted-foreground" 
                    />
                    <span className="text-xs text-muted-foreground capitalize">{record?.method}</span>
                  </div>
                </td>
                <td className="p-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingRecord(record?.id)}
                    iconName="Edit"
                    iconSize={14}
                    className="micro-feedback"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 p-4">
        {attendanceData?.map((record) => (
          <div key={record?.id} className="border border-border rounded-lg p-4 bg-surface">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedRecords?.includes(record?.id)}
                  onChange={(e) => onRecordSelect(record?.id, e?.target?.checked)}
                />
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {record?.studentName?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{record?.studentName}</div>
                  <div className="text-xs text-muted-foreground">{record?.class}</div>
                </div>
              </div>
              
              <button
                onClick={() => setEditingRecord(record?.id)}
                className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record?.status)}`}
              >
                <Icon name={getStatusIcon(record?.status)} size={12} />
                <span className="capitalize">{record?.status}</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Date:</span>
                <div className="font-medium text-foreground">{formatDate(record?.date)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Time:</span>
                <div className="font-medium text-foreground">{formatTime(record?.timestamp)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Method:</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={record?.method === 'facial' ? 'Eye' : 'User'} 
                    size={12} 
                    className="text-muted-foreground" 
                  />
                  <span className="font-medium text-foreground capitalize">{record?.method}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">ID:</span>
                <div className="font-medium text-foreground">{record?.studentId}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {attendanceData?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Records Found</h3>
          <p className="text-muted-foreground">No attendance records match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;