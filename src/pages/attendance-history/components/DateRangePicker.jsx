import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DateRangePicker = ({ startDate, endDate, onDateRangeChange, onQuickSelect }) => {
  const [isCustomRange, setIsCustomRange] = useState(false);

  const quickRanges = [
    { label: 'Today', value: 'today', days: 0 },
    { label: 'Yesterday', value: 'yesterday', days: 1 },
    { label: 'Last 7 days', value: 'week', days: 7 },
    { label: 'Last 30 days', value: 'month', days: 30 },
    { label: 'This semester', value: 'semester', days: 120 },
    { label: 'Custom range', value: 'custom', days: null }
  ];

  const handleQuickRangeSelect = (range) => {
    if (range?.value === 'custom') {
      setIsCustomRange(true);
      return;
    }

    setIsCustomRange(false);
    const endDate = new Date();
    const startDate = new Date();
    
    if (range?.value === 'yesterday') {
      startDate?.setDate(endDate?.getDate() - 1);
      endDate?.setDate(endDate?.getDate() - 1);
    } else if (range?.days > 0) {
      startDate?.setDate(endDate?.getDate() - range?.days + 1);
    }

    onQuickSelect(range?.value, startDate, endDate);
  };

  const handleCustomDateChange = (field, value) => {
    const newDates = {
      startDate: field === 'start' ? value : startDate,
      endDate: field === 'end' ? value : endDate
    };
    onDateRangeChange(newDates?.startDate, newDates?.endDate);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Date Range</h3>
        </div>
        {isCustomRange && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCustomRange(false)}
            iconName="X"
            iconSize={16}
          >
            Cancel
          </Button>
        )}
      </div>
      {!isCustomRange ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {quickRanges?.map((range) => (
            <Button
              key={range?.value}
              variant="outline"
              size="sm"
              onClick={() => handleQuickRangeSelect(range)}
              className="justify-start text-left micro-feedback"
            >
              {range?.label}
            </Button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => handleCustomDateChange('start', e?.target?.value)}
              max={endDate}
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => handleCustomDateChange('end', e?.target?.value)}
              min={startDate}
              max={new Date()?.toISOString()?.split('T')?.[0]}
            />
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">
              {startDate && endDate && (
                `${Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1} days selected`
              )}
            </span>
            <Button
              variant="default"
              size="sm"
              onClick={() => onDateRangeChange(startDate, endDate)}
              disabled={!startDate || !endDate}
              iconName="Check"
              iconPosition="left"
              iconSize={14}
            >
              Apply Range
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;