import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkImportModal = ({ isOpen, onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const fileInputRef = useRef(null);

  const sampleData = `Name,Roll Number,Class,Email,Phone,Parent Name,Parent Phone,Address
John Smith,2025001,5th Grade,john.smith@school.edu,9876543210,Robert Smith,9876543211,123 Main Street
Sarah Johnson,2025002,5th Grade,sarah.johnson@school.edu,9876543212,Mary Johnson,9876543213,456 Oak Avenue
Michael Brown,2025003,5th Grade,michael.brown@school.edu,9876543214,David Brown,9876543215,789 Pine Road`;

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    if (file?.type !== 'text/csv' && !file?.name?.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }
    
    if (file?.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
  };

  const downloadSampleCSV = () => {
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_import_sample.csv';
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  const processImport = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setImportProgress(0);

    try {
      // Simulate file processing
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csv = e?.target?.result;
        const lines = csv?.split('\n');
        const headers = lines?.[0]?.split(',');
        
        // Validate headers
        const requiredHeaders = ['Name', 'Roll Number', 'Class', 'Email'];
        const missingHeaders = requiredHeaders?.filter(header => 
          !headers?.some(h => h?.trim()?.toLowerCase() === header?.toLowerCase())
        );

        if (missingHeaders?.length > 0) {
          alert(`Missing required columns: ${missingHeaders?.join(', ')}`);
          setIsProcessing(false);
          return;
        }

        const students = [];
        const errors = [];
        
        // Process each row
        for (let i = 1; i < lines?.length; i++) {
          if (!lines?.[i]?.trim()) continue;
          
          setImportProgress((i / (lines?.length - 1)) * 100);
          await new Promise(resolve => setTimeout(resolve, 100)); // Simulate processing time
          
          const values = lines?.[i]?.split(',');
          const student = {};
          
          headers?.forEach((header, index) => {
            student[header.trim()] = values?.[index]?.trim() || '';
          });

          // Validate required fields
          if (!student?.Name || !student?.['Roll Number'] || !student?.Class || !student?.Email) {
            errors?.push(`Row ${i + 1}: Missing required fields`);
            continue;
          }

          // Email validation
          if (!/\S+@\S+\.\S+/?.test(student?.Email)) {
            errors?.push(`Row ${i + 1}: Invalid email format`);
            continue;
          }

          students?.push({
            name: student?.Name,
            rollNumber: student?.['Roll Number'],
            class: student?.Class,
            email: student?.Email,
            phone: student?.Phone || '',
            parentName: student?.['Parent Name'] || '',
            parentPhone: student?.['Parent Phone'] || '',
            address: student?.Address || '',
            photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${student?.Name}`,
            faceDataStatus: 'pending',
            registrationDate: new Date()?.toISOString()
          });
        }

        setImportResults({
          total: lines?.length - 1,
          successful: students?.length,
          errors: errors?.length,
          errorDetails: errors
        });

        if (students?.length > 0) {
          onImport(students);
        }
      };

      reader?.readAsText(selectedFile);
    } catch (error) {
      console.error('Import error:', error);
      alert('Failed to process the CSV file. Please check the format and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setSelectedFile(null);
    setImportProgress(0);
    setImportResults(null);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden card-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Bulk Import Students</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            iconName="X"
            iconSize={20}
            className="micro-feedback"
          >
            <span className="sr-only">Close modal</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!importResults ? (
            <div className="space-y-6">
              {/* Instructions */}
              <div className="bg-muted/30 border border-border rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-2">Import Instructions:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Upload a CSV file with student information</li>
                      <li>Required columns: Name, Roll Number, Class, Email</li>
                      <li>Optional columns: Phone, Parent Name, Parent Phone, Address</li>
                      <li>Maximum file size: 5MB</li>
                      <li>Face recognition training will be scheduled after import</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sample Download */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={downloadSampleCSV}
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                >
                  Download Sample CSV
                </Button>
              </div>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-3">
                    <Icon name="FileText" size={48} className="mx-auto text-success" />
                    <div>
                      <p className="font-medium text-foreground">{selectedFile?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile?.size / 1024)?.toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                      iconName="X"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Icon name="Upload" size={48} className="mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Drop your CSV file here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef?.current?.click()}
                      iconName="FolderOpen"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              {/* Processing Progress */}
              {isProcessing && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Processing CSV...</span>
                    <span className="text-sm text-muted-foreground">{Math.round(importProgress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${importProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            /* Import Results */
            (<div className="space-y-6">
              <div className="text-center">
                <Icon 
                  name={importResults?.errors > 0 ? "AlertTriangle" : "CheckCircle"} 
                  size={48} 
                  className={`mx-auto mb-4 ${importResults?.errors > 0 ? 'text-warning' : 'text-success'}`} 
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">Import Complete</h3>
                <p className="text-muted-foreground">
                  {importResults?.successful} of {importResults?.total} students imported successfully
                </p>
              </div>
              {/* Results Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{importResults?.total}</div>
                  <div className="text-sm text-muted-foreground">Total Rows</div>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">{importResults?.successful}</div>
                  <div className="text-sm text-muted-foreground">Successful</div>
                </div>
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">{importResults?.errors}</div>
                  <div className="text-sm text-muted-foreground">Errors</div>
                </div>
              </div>
              {/* Error Details */}
              {importResults?.errorDetails?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Import Errors:</h4>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-h-40 overflow-y-auto">
                    {importResults?.errorDetails?.map((error, index) => (
                      <div key={index} className="text-sm text-destructive mb-1">
                        {error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Next Steps */}
              <div className="bg-muted/30 border border-border rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Next Steps:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Imported students will appear in the student list</li>
                      <li>Face recognition training is set to 'Pending' status</li>
                      <li>Capture photos for each student to enable attendance tracking</li>
                      <li>Use the 'Train Recognition' feature to process facial data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>)
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          {!importResults ? (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={processImport}
                disabled={!selectedFile || isProcessing}
                loading={isProcessing}
                iconName="Upload"
                iconPosition="left"
                iconSize={16}
              >
                Import Students
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              onClick={handleClose}
              iconName="Check"
              iconPosition="left"
              iconSize={16}
            >
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;