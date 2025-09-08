import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AttendanceFilters = ({ 
  selectedClass, 
  onClassChange, 
  searchQuery, 
  onSearchChange,
  attendanceFilter,
  onAttendanceFilterChange,
  onClearFilters,
  totalStudents,
  filteredCount
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'class-10-a', label: 'Class 10-A' },
    { value: 'class-10-b', label: 'Class 10-B' },
    { value: 'class-9-a', label: 'Class 9-A' },
    { value: 'class-9-b', label: 'Class 9-B' },
    { value: 'class-8-a', label: 'Class 8-A' },
    { value: 'class-8-b', label: 'Class 8-B' }
  ];

  const attendanceOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'present', label: 'Present Only' },
    { value: 'absent', label: 'Absent Only' },
    { value: 'late', label: 'Late Only' },
    { value: 'excused', label: 'Excused Only' }
  ];

  const percentageRanges = [
    { value: 'all', label: 'All Percentages' },
    { value: '90-100', label: '90-100%' },
    { value: '75-89', label: '75-89%' },
    { value: '60-74', label: '60-74%' },
    { value: '0-59', label: 'Below 60%' }
  ];

  const hasActiveFilters = selectedClass !== 'all' || searchQuery || attendanceFilter !== 'all';

  return (
    <div className="bg-surface border border-border rounded-lg card-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Filters</h3>
            {hasActiveFilters && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-xs text-primary font-medium">Active</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {filteredCount} of {totalStudents} records
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
            >
              {isExpanded ? 'Less' : 'More'}
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
          
          <Select
            options={classOptions}
            value={selectedClass}
            onChange={onClassChange}
            placeholder="Select class"
          />
          
          <Select
            options={attendanceOptions}
            value={attendanceFilter}
            onChange={onAttendanceFilterChange}
            placeholder="Filter by status"
          />
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Attendance Percentage"
                options={percentageRanges}
                value="all"
                onChange={() => {}}
                placeholder="Filter by percentage"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Quick Actions</label>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAttendanceFilterChange('absent')}
                    iconName="UserX"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Show Absent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAttendanceFilterChange('late')}
                    iconName="Clock"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Show Late
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceFilters;