import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import BrandingSection from './components/BrandingSection';
import SecurityIndicator from './components/SecurityIndicator';

const TeacherLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/attendance-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Container */}
      <div className="flex min-h-screen">
        {/* Left Section - Branding and Information */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-muted/30 p-8 lg:p-12">
          <div className="w-full max-w-lg mx-auto">
            <BrandingSection />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-1">VisionAttend</h1>
              <p className="text-muted-foreground">Smart Attendance System</p>
            </div>

            {/* Login Form Section */}
            <div className="bg-surface border border-border rounded-xl p-6 lg:p-8 card-shadow">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
                <p className="text-muted-foreground">
                  Sign in to access your attendance dashboard
                </p>
              </div>

              <LoginForm />
            </div>

            {/* Security Information - Desktop */}
            <div className="hidden lg:block">
              <SecurityIndicator />
            </div>

            {/* Mobile Security Summary */}
            <div className="lg:hidden bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Secure Connection</h3>
                  <p className="text-xs text-muted-foreground">Your data is protected and encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-sm border-t border-border p-4 lg:hidden">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} VisionAttend - Empowering Rural Education
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;