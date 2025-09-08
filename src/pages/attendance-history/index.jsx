import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DateRangePicker from './components/DateRangePicker';
import AttendanceFilters from './components/AttendanceFilters';
import AttendanceTable from './components/AttendanceTable';
import AttendanceStats from './components/AttendanceStats';
import ExportControls from './components/ExportControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AttendanceHistory = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isExporting, setIsExporting] = useState(false);
  
  // Filter states
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0],
    end: new Date()?.toISOString()?.split('T')?.[0]
  });
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('all');

  // Mock attendance data
  const mockAttendanceData = [
    {
      id: 'att_001',
      date: '2025-01-08',
      studentId: 'STU001',
      studentName: 'Aarav Sharma',
      class: 'Class 10-A',
      status: 'present',
      timestamp: new Date('2025-01-08T09:15:00'),
      method: 'facial',
      confidence: 95.2
    },
    {
      id: 'att_002',
      date: '2025-01-08',
      studentId: 'STU002',
      studentName: 'Priya Patel',
      class: 'Class 10-A',
      status: 'present',
      timestamp: new Date('2025-01-08T09:16:30'),
      method: 'facial',
      confidence: 92.8
    },
    {
      id: 'att_003',
      date: '2025-01-08',
      studentId: 'STU003',
      studentName: 'Rahul Kumar',
      class: 'Class 10-A',
      status: 'late',
      timestamp: new Date('2025-01-08T09:25:15'),
      method: 'manual',
      confidence: null
    },
    {
      id: 'att_004',
      date: '2025-01-08',
      studentId: 'STU004',
      studentName: 'Sneha Gupta',
      class: 'Class 10-B',
      status: 'absent',
      timestamp: null,
      method: 'system',
      confidence: null
    },
    {
      id: 'att_005',
      date: '2025-01-07',
      studentId: 'STU001',
      studentName: 'Aarav Sharma',
      class: 'Class 10-A',
      status: 'present',
      timestamp: new Date('2025-01-07T09:12:45'),
      method: 'facial',
      confidence: 96.1
    },
    {
      id: 'att_006',
      date: '2025-01-07',
      studentId: 'STU002',
      studentName: 'Priya Patel',
      class: 'Class 10-A',
      status: 'present',
      timestamp: new Date('2025-01-07T09:14:20'),
      method: 'facial',
      confidence: 94.3
    },
    {
      id: 'att_007',
      date: '2025-01-07',
      studentId: 'STU005',
      studentName: 'Arjun Singh',
      class: 'Class 9-A',
      status: 'excused',
      timestamp: null,
      method: 'manual',
      confidence: null
    },
    {
      id: 'att_008',
      date: '2025-01-06',
      studentId: 'STU006',
      studentName: 'Kavya Reddy',
      class: 'Class 9-B',
      status: 'present',
      timestamp: new Date('2025-01-06T09:18:10'),
      method: 'facial',
      confidence: 91.7
    },
    {
      id: 'att_009',
      date: '2025-01-06',
      studentId: 'STU007',
      studentName: 'Vikram Joshi',
      class: 'Class 8-A',
      status: 'late',
      timestamp: new Date('2025-01-06T09:28:30'),
      method: 'facial',
      confidence: 89.4
    },
    {
      id: 'att_010',
      date: '2025-01-05',
      studentId: 'STU008',
      studentName: 'Ananya Nair',
      class: 'Class 8-B',
      status: 'present',
      timestamp: new Date('2025-01-05T09:11:25'),
      method: 'facial',
      confidence: 97.2
    }
  ];

  // Mock statistics
  const mockStats = {
    totalSessions: 15,
    presentCount: 142,
    absentCount: 18,
    lateCount: 8,
    averageAttendance: 88.7,
    sessionChange: 12,
    presentChange: 8,
    absentChange: -15,
    attendanceChange: 5.2,
    facialRecognition: 156,
    manualEntry: 12,
    totalRecords: 168,
    recognitionAccuracy: 94.3,
    totalDays: 7,
    schoolDays: 5,
    uniqueStudents: 45
  };

  // Filter attendance data
  const filteredData = mockAttendanceData?.filter(record => {
    const matchesClass = selectedClass === 'all' || record?.class?.toLowerCase()?.includes(selectedClass?.replace('-', ' '));
    const matchesSearch = !searchQuery || 
      record?.studentName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      record?.studentId?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = attendanceFilter === 'all' || record?.status === attendanceFilter;
    const recordDate = new Date(record.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    const matchesDateRange = recordDate >= startDate && recordDate <= endDate;

    return matchesClass && matchesSearch && matchesStatus && matchesDateRange;
  });

  // Sort filtered data
  const sortedData = [...filteredData]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'timestamp') {
      aValue = a?.timestamp ? new Date(a.timestamp) : new Date(0);
      bValue = b?.timestamp ? new Date(b.timestamp) : new Date(0);
    } else if (sortField === 'date') {
      aValue = new Date(a.date);
      bValue = new Date(b.date);
    } else if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end });
  };

  const handleQuickDateSelect = (type, start, end) => {
    setDateRange({
      start: start?.toISOString()?.split('T')?.[0],
      end: end?.toISOString()?.split('T')?.[0]
    });
  };

  const handleRecordSelect = (recordId, isSelected) => {
    if (isSelected) {
      setSelectedRecords([...selectedRecords, recordId]);
    } else {
      setSelectedRecords(selectedRecords?.filter(id => id !== recordId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedRecords(sortedData?.map(record => record?.id));
    } else {
      setSelectedRecords([]);
    }
  };

  const handleStatusChange = (recordId, newStatus) => {
    // In a real app, this would update the database
    console.log(`Changing status of record ${recordId} to ${newStatus}`);
  };

  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handleClearFilters = () => {
    setSelectedClass('all');
    setSearchQuery('');
    setAttendanceFilter('all');
    setDateRange({
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0],
      end: new Date()?.toISOString()?.split('T')?.[0]
    });
  };

  const handleExport = async (exportConfig) => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Exporting with config:', exportConfig);
    
    // In a real app, this would generate and download the file
    const filename = `attendance_history_${dateRange?.start}_to_${dateRange?.end}.${exportConfig?.format}`;
    console.log(`Would download: ${filename}`);
    
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarCollapsed={isSidebarCollapsed} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-200 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Attendance History</h1>
              <p className="text-muted-foreground">
                View and analyze attendance records across different time periods
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
                onClick={() => window.location?.reload()}
                className="micro-feedback"
              >
                Refresh
              </Button>
              
              <Button
                variant="default"
                iconName="FileText"
                iconPosition="left"
                iconSize={16}
                onClick={() => handleExport({ format: 'csv', scope: 'filtered' })}
                className="micro-feedback"
              >
                Quick Export
              </Button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DateRangePicker
                startDate={dateRange?.start}
                endDate={dateRange?.end}
                onDateRangeChange={handleDateRangeChange}
                onQuickSelect={handleQuickDateSelect}
              />
            </div>
            
            <div className="lg:col-span-2">
              <AttendanceFilters
                selectedClass={selectedClass}
                onClassChange={setSelectedClass}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                attendanceFilter={attendanceFilter}
                onAttendanceFilterChange={setAttendanceFilter}
                onClearFilters={handleClearFilters}
                totalStudents={mockAttendanceData?.length}
                filteredCount={filteredData?.length}
              />
            </div>
          </div>

          {/* Statistics Section */}
          <AttendanceStats 
            stats={mockStats} 
            dateRange={{
              start: new Date(dateRange.start)?.toLocaleDateString('en-GB'),
              end: new Date(dateRange.end)?.toLocaleDateString('en-GB')
            }}
          />

          {/* Export Controls */}
          <ExportControls
            selectedRecords={selectedRecords}
            totalRecords={filteredData?.length}
            onExport={handleExport}
            isExporting={isExporting}
            dateRange={dateRange}
          />

          {/* Attendance Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Table" size={20} className="text-muted-foreground" />
                <h2 className="text-lg font-medium text-foreground">Attendance Records</h2>
                <span className="text-sm text-muted-foreground">
                  ({filteredData?.length} records)
                </span>
              </div>
              
              {selectedRecords?.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedRecords?.length} selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRecords([])}
                    iconName="X"
                    iconSize={14}
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>

            <AttendanceTable
              attendanceData={sortedData}
              selectedRecords={selectedRecords}
              onRecordSelect={handleRecordSelect}
              onSelectAll={handleSelectAll}
              onStatusChange={handleStatusChange}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          </div>

          {/* Summary Footer */}
          <div className="bg-surface border border-border rounded-lg p-4 card-shadow">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">
                  Showing {filteredData?.length} of {mockAttendanceData?.length} records
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  Period: {new Date(dateRange.start)?.toLocaleDateString('en-GB')} - {new Date(dateRange.end)?.toLocaleDateString('en-GB')}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceHistory;