import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const StudentFilters = ({ 
  classFilter, 
  onClassFilterChange, 
  statusFilter, 
  onStatusFilterChange,
  onClearFilters,
  studentCount,
  totalCount 
}) => {
  const classOptions = [
    { value: '', label: 'All Classes' },
    { value: '1st Grade', label: '1st Grade' },
    { value: '2nd Grade', label: '2nd Grade' },
    { value: '3rd Grade', label: '3rd Grade' },
    { value: '4th Grade', label: '4th Grade' },
    { value: '5th Grade', label: '5th Grade' },
    { value: '6th Grade', label: '6th Grade' },
    { value: '7th Grade', label: '7th Grade' },
    { value: '8th Grade', label: '8th Grade' },
    { value: '9th Grade', label: '9th Grade' },
    { value: '10th Grade', label: '10th Grade' },
    { value: '11th Grade', label: '11th Grade' },
    { value: '12th Grade', label: '12th Grade' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'trained', label: 'Face Data Trained' },
    { value: 'pending', label: 'Training Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'failed', label: 'Training Failed' }
  ];

  const hasActiveFilters = classFilter || statusFilter;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 card-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Left Section - Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-3">
            <Select
              options={classOptions}
              value={classFilter}
              onChange={onClassFilterChange}
              placeholder="Filter by class"
              className="w-40"
            />
            
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusFilterChange}
              placeholder="Filter by status"
              className="w-44"
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              className="micro-feedback"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Right Section - Results Count */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{studentCount}</span> of{' '}
            <span className="font-medium text-foreground">{totalCount}</span> students
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            
            {classFilter && (
              <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <span>Class: {classFilter}</span>
                <button
                  onClick={() => onClassFilterChange('')}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                >
                  <span className="sr-only">Remove class filter</span>
                  ×
                </button>
              </div>
            )}
            
            {statusFilter && (
              <div className="inline-flex items-center space-x-1 px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs">
                <span>Status: {statusOptions?.find(opt => opt?.value === statusFilter)?.label}</span>
                <button
                  onClick={() => onStatusFilterChange('')}
                  className="hover:bg-secondary/20 rounded-full p-0.5 transition-colors"
                >
                  <span className="sr-only">Remove status filter</span>
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFilters;