import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentTable = ({ 
  students, 
  selectedStudents, 
  onSelectionChange, 
  onEditStudent, 
  onDeleteStudent, 
  onRetrainFaces,
  searchTerm,
  onSearchChange,
  classFilter,
  statusFilter 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students?.filter(student => {
      const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           student?.rollNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           student?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesClass = !classFilter || student?.class === classFilter;
      const matchesStatus = !statusFilter || student?.faceDataStatus === statusFilter;
      
      return matchesSearch && matchesClass && matchesStatus;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];
        
        if (sortConfig?.key === 'registrationDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [students, searchTerm, classFilter, statusFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(filteredAndSortedStudents?.map(s => s?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      onSelectionChange([...selectedStudents, studentId]);
    } else {
      onSelectionChange(selectedStudents?.filter(id => id !== studentId));
    }
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'trained': { color: 'bg-success text-success-foreground', label: 'Trained', icon: 'CheckCircle' },
      'pending': { color: 'bg-warning text-warning-foreground', label: 'Pending', icon: 'Clock' },
      'failed': { color: 'bg-destructive text-destructive-foreground', label: 'Failed', icon: 'XCircle' },
      'processing': { color: 'bg-muted text-muted-foreground', label: 'Processing', icon: 'Loader' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const isAllSelected = filteredAndSortedStudents?.length > 0 && 
    filteredAndSortedStudents?.every(student => selectedStudents?.includes(student?.id));

  const isSomeSelected = selectedStudents?.length > 0 && !isAllSelected;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden card-shadow">
      {/* Table Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-foreground">Student Records</h3>
            <span className="text-sm text-muted-foreground">
              {filteredAndSortedStudents?.length} of {students?.length} students
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-64"
            />
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Photo</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('rollNumber')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Roll Number</span>
                  <Icon name={getSortIcon('rollNumber')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('class')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Class</span>
                  <Icon name={getSortIcon('class')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('registrationDate')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Registered</span>
                  <Icon name={getSortIcon('registrationDate')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Face Data</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStudents?.map((student) => (
              <tr key={student?.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                <td className="p-4">
                  <Checkbox
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={(e) => handleSelectStudent(student?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={student?.photo}
                      alt={student?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{student?.name}</div>
                </td>
                <td className="p-4">
                  <div className="font-mono text-sm text-foreground">{student?.rollNumber}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{student?.class}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground">{student?.email}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground">
                    {new Date(student.registrationDate)?.toLocaleDateString('en-GB')}
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(student?.faceDataStatus)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditStudent(student)}
                      iconName="Edit"
                      iconSize={16}
                      className="micro-feedback"
                    >
                      <span className="sr-only">Edit student</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRetrainFaces([student?.id])}
                      disabled={student?.faceDataStatus === 'processing'}
                      iconName="Brain"
                      iconSize={16}
                      className="micro-feedback"
                    >
                      <span className="sr-only">Retrain face data</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteStudent(student?.id)}
                      iconName="Trash2"
                      iconSize={16}
                      className="micro-feedback text-destructive hover:text-destructive"
                    >
                      <span className="sr-only">Delete student</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden">
        {filteredAndSortedStudents?.map((student) => (
          <div key={student?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedStudents?.includes(student?.id)}
                onChange={(e) => handleSelectStudent(student?.id, e?.target?.checked)}
                className="mt-1"
              />
              
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={student?.photo}
                  alt={student?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-foreground truncate">{student?.name}</h4>
                    <p className="text-sm text-muted-foreground font-mono">{student?.rollNumber}</p>
                    <p className="text-sm text-muted-foreground">{student?.class}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditStudent(student)}
                      iconName="Edit"
                      iconSize={16}
                      className="micro-feedback"
                    >
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteStudent(student?.id)}
                      iconName="Trash2"
                      iconSize={16}
                      className="micro-feedback text-destructive"
                    >
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  {getStatusBadge(student?.faceDataStatus)}
                  <span className="text-xs text-muted-foreground">
                    {new Date(student.registrationDate)?.toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredAndSortedStudents?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || classFilter || statusFilter 
              ? "Try adjusting your search or filter criteria" :"Get started by adding your first student to the system"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;