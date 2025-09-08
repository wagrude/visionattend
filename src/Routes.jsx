import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AttendanceHistory from './pages/attendance-history';
import StudentManagement from './pages/student-management';
import SystemSettings from './pages/system-settings';
import TeacherLogin from './pages/teacher-login';
import AttendanceDashboard from './pages/attendance-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AttendanceDashboard />} />
        <Route path="/attendance-history" element={<AttendanceHistory />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="/system-settings" element={<SystemSettings />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/attendance-dashboard" element={<AttendanceDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
