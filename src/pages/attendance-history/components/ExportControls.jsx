import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportControls = ({ 
  selectedRecords, 
  totalRecords, 
  onExport, 
  isExporting = false,
  dateRange 
}) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportScope, setExportScope] = useState('filtered');
  const [includeStats, setIncludeStats] = useState(true);
  const [includeCharts, setIncludeCharts] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV File', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
    { value: 'pdf', label: 'PDF Report', icon: 'FileText' }
  ];

  const scopeOptions = [
    { value: 'selected', label: `Selected Records (${selectedRecords?.length})`, disabled: selectedRecords?.length === 0 },
    { value: 'filtered', label: `Filtered Results (${totalRecords})` },
    { value: 'all', label: 'All Records' },
    { value: 'date-range', label: 'Custom Date Range' }
  ];

  const handleExport = () => {
    const exportConfig = {
      format: exportFormat,
      scope: exportScope,
      includeStats,
      includeCharts,
      selectedRecords,
      dateRange
    };
    onExport(exportConfig);
  };

  const getFormatIcon = (format) => {
    const option = formatOptions?.find(opt => opt?.value === format);
    return option ? option?.icon : 'FileText';
  };

  return (
    <div className="bg-surface border border-border rounded-lg card-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={20} className="text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Export Data</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
            >
              {isExpanded ? 'Less Options' : 'More Options'}
            </Button>
            
            <Button
              variant="default"
              onClick={handleExport}
              disabled={isExporting || (exportScope === 'selected' && selectedRecords?.length === 0)}
              loading={isExporting}
              iconName={getFormatIcon(exportFormat)}
              iconPosition="left"
              iconSize={16}
              className="micro-feedback"
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Export Format"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
          />
          
          <Select
            label="Export Scope"
            options={scopeOptions}
            value={exportScope}
            onChange={setExportScope}
          />
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Include Additional Data</h4>
              <div className="space-y-2">
                <Checkbox
                  label="Include attendance statistics"
                  description="Add summary statistics and percentages"
                  checked={includeStats}
                  onChange={(e) => setIncludeStats(e?.target?.checked)}
                />
                
                <Checkbox
                  label="Include charts and graphs"
                  description="Add visual representations (PDF only)"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e?.target?.checked)}
                  disabled={exportFormat !== 'pdf'}
                />
              </div>
            </div>

            {exportScope === 'selected' && selectedRecords?.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Info" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {selectedRecords?.length} record{selectedRecords?.length !== 1 ? 's' : ''} selected for export
                  </span>
                </div>
              </div>
            )}

            {exportScope === 'date-range' && (
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Export range: {dateRange?.start} to {dateRange?.end}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Export Buttons */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quick Export</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setExportFormat('csv');
                  setExportScope('filtered');
                  handleExport();
                }}
                disabled={isExporting}
                iconName="FileText"
                iconPosition="left"
                iconSize={14}
                className="micro-feedback"
              >
                CSV
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setExportFormat('excel');
                  setExportScope('filtered');
                  handleExport();
                }}
                disabled={isExporting}
                iconName="FileSpreadsheet"
                iconPosition="left"
                iconSize={14}
                className="micro-feedback"
              >
                Excel
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setExportFormat('pdf');
                  setExportScope('filtered');
                  setIncludeStats(true);
                  handleExport();
                }}
                disabled={isExporting}
                iconName="FileText"
                iconPosition="left"
                iconSize={14}
                className="micro-feedback"
              >
                PDF Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;