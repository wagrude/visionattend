import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import StudentTable from './components/StudentTable';
import StudentFilters from './components/StudentFilters';
import AddStudentModal from './components/AddStudentModal';
import BulkImportModal from './components/BulkImportModal';

const StudentManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Mock student data
  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        name: "Aarav Sharma",
        rollNumber: "2025001",
        class: "5th Grade",
        email: "aarav.sharma@school.edu",
        phone: "9876543210",
        parentName: "Rajesh Sharma",
        parentPhone: "9876543211",
        address: "123 Gandhi Road, Mumbai",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav",
        faceDataStatus: "trained",
        registrationDate: "2025-01-15T10:30:00Z"
      },
      {
        id: 2,
        name: "Priya Patel",
        rollNumber: "2025002",
        class: "5th Grade",
        email: "priya.patel@school.edu",
        phone: "9876543212",
        parentName: "Amit Patel",
        parentPhone: "9876543213",
        address: "456 Nehru Street, Delhi",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        faceDataStatus: "pending",
        registrationDate: "2025-01-16T09:15:00Z"
      },
      {
        id: 3,
        name: "Arjun Singh",
        rollNumber: "2025003",
        class: "6th Grade",
        email: "arjun.singh@school.edu",
        phone: "9876543214",
        parentName: "Vikram Singh",
        parentPhone: "9876543215",
        address: "789 Tagore Lane, Bangalore",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
        faceDataStatus: "trained",
        registrationDate: "2025-01-14T14:20:00Z"
      },
      {
        id: 4,
        name: "Kavya Reddy",
        rollNumber: "2025004",
        class: "6th Grade",
        email: "kavya.reddy@school.edu",
        phone: "9876543216",
        parentName: "Suresh Reddy",
        parentPhone: "9876543217",
        address: "321 Vivekananda Road, Hyderabad",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya",
        faceDataStatus: "processing",
        registrationDate: "2025-01-17T11:45:00Z"
      },
      {
        id: 5,
        name: "Rohit Kumar",
        rollNumber: "2025005",
        class: "7th Grade",
        email: "rohit.kumar@school.edu",
        phone: "9876543218",
        parentName: "Manoj Kumar",
        parentPhone: "9876543219",
        address: "654 Subhash Chowk, Pune",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit",
        faceDataStatus: "failed",
        registrationDate: "2025-01-13T16:30:00Z"
      },
      {
        id: 6,
        name: "Ananya Gupta",
        rollNumber: "2025006",
        class: "7th Grade",
        email: "ananya.gupta@school.edu",
        phone: "9876543220",
        parentName: "Deepak Gupta",
        parentPhone: "9876543221",
        address: "987 Bose Avenue, Kolkata",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
        faceDataStatus: "trained",
        registrationDate: "2025-01-12T13:10:00Z"
      },
      {
        id: 7,
        name: "Karan Joshi",
        rollNumber: "2025007",
        class: "8th Grade",
        email: "karan.joshi@school.edu",
        phone: "9876543222",
        parentName: "Ravi Joshi",
        parentPhone: "9876543223",
        address: "147 Patel Nagar, Ahmedabad",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan",
        faceDataStatus: "pending",
        registrationDate: "2025-01-18T08:45:00Z"
      },
      {
        id: 8,
        name: "Meera Iyer",
        rollNumber: "2025008",
        class: "8th Grade",
        email: "meera.iyer@school.edu",
        phone: "9876543224",
        parentName: "Krishnan Iyer",
        parentPhone: "9876543225",
        address: "258 Temple Street, Chennai",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
        faceDataStatus: "trained",
        registrationDate: "2025-01-11T15:20:00Z"
      }
    ];

    setStudents(mockStudents);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'add-student':
        setEditingStudent(null);
        setIsAddModalOpen(true);
        break;
      case 'bulk-import':
        setIsBulkImportOpen(true);
        break;
      case 'train-faces':
        handleRetrainFaces(selectedStudents);
        break;
      case 'export-roster':
        handleExportRoster();
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleAddStudent = (studentData) => {
    if (editingStudent) {
      // Update existing student
      setStudents(prev => prev?.map(student => 
        student?.id === editingStudent?.id 
          ? { ...student, ...studentData, id: editingStudent?.id }
          : student
      ));
    } else {
      // Add new student
      const newStudent = {
        ...studentData,
        id: Date.now(), // Simple ID generation
      };
      setStudents(prev => [...prev, newStudent]);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsAddModalOpen(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      setStudents(prev => prev?.filter(student => student?.id !== studentId));
      setSelectedStudents(prev => prev?.filter(id => id !== studentId));
    }
  };

  const handleRetrainFaces = (studentIds) => {
    if (studentIds?.length === 0) return;

    // Update face data status to processing
    setStudents(prev => prev?.map(student => 
      studentIds?.includes(student?.id) 
        ? { ...student, faceDataStatus: 'processing' }
        : student
    ));

    // Simulate training process
    setTimeout(() => {
      setStudents(prev => prev?.map(student => 
        studentIds?.includes(student?.id) 
          ? { ...student, faceDataStatus: Math.random() > 0.2 ? 'trained' : 'failed' }
          : student
      ));
    }, 3000);

    alert(`Face recognition training started for ${studentIds?.length} student(s). This may take a few minutes.`);
  };

  const handleBulkImport = (importedStudents) => {
    const studentsWithIds = importedStudents?.map(student => ({
      ...student,
      id: Date.now() + Math.random() // Simple ID generation
    }));
    
    setStudents(prev => [...prev, ...studentsWithIds]);
    setIsBulkImportOpen(false);
  };

  const handleExportRoster = () => {
    const csvContent = [
      ['Name', 'Roll Number', 'Class', 'Email', 'Phone', 'Parent Name', 'Parent Phone', 'Address', 'Face Data Status', 'Registration Date']?.join(','),
      ...students?.map(student => [
        student?.name,
        student?.rollNumber,
        student?.class,
        student?.email,
        student?.phone,
        student?.parentName,
        student?.parentPhone,
        student?.address,
        student?.faceDataStatus,
        new Date(student.registrationDate)?.toLocaleDateString('en-GB')
      ]?.join(','))
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_roster_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  const handleClearFilters = () => {
    setClassFilter('');
    setStatusFilter('');
    setSearchTerm('');
  };

  const filteredStudents = students?.filter(student => {
    const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         student?.rollNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         student?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesClass = !classFilter || student?.class === classFilter;
    const matchesStatus = !statusFilter || student?.faceDataStatus === statusFilter;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSidebarToggle={handleSidebarToggle}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      <main className={`pt-16 transition-all duration-200 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-240'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
              <p className="text-muted-foreground">
                Manage student records, photos, and facial recognition data
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActionToolbar
            onAction={handleQuickAction}
            selectedStudents={selectedStudents}
            canExport={students?.length > 0}
          />

          {/* Filters */}
          <StudentFilters
            classFilter={classFilter}
            onClassFilterChange={setClassFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onClearFilters={handleClearFilters}
            studentCount={filteredStudents?.length}
            totalCount={students?.length}
          />

          {/* Student Table */}
          <StudentTable
            students={students}
            selectedStudents={selectedStudents}
            onSelectionChange={setSelectedStudents}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
            onRetrainFaces={handleRetrainFaces}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            classFilter={classFilter}
            statusFilter={statusFilter}
          />
        </div>
      </main>
      {/* Modals */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleAddStudent}
        editingStudent={editingStudent}
      />
      <BulkImportModal
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onImport={handleBulkImport}
      />
    </div>
  );
};

export default StudentManagement;