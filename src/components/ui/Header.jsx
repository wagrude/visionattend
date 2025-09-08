import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onSidebarToggle, isSidebarCollapsed = false }) => {
  const location = useLocation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const getPageTitle = () => {
    switch (location?.pathname) {
      case '/attendance-dashboard':
        return 'Attendance Dashboard';
      case '/student-management':
        return 'Student Management';
      case '/attendance-history':
        return 'Attendance History';
      case '/system-settings':
        return 'System Settings';
      case '/teacher-login':
        return 'Teacher Login';
      default:
        return 'VisionAttend';
    }
  };

  const primaryNavItems = [
    { path: '/attendance-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/student-management', label: 'Students', icon: 'Users' },
    { path: '/attendance-history', label: 'History', icon: 'Clock' },
  ];

  const secondaryNavItems = [
    { path: '/system-settings', label: 'Settings', icon: 'Settings' },
  ];

  const handleMoreMenuToggle = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const handleNavClick = (path) => {
    window.location.href = path;
    setIsMoreMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border card-shadow">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="lg:hidden"
            iconName="Menu"
            iconSize={20}
          >
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Eye" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">VisionAttend</h1>
              <p className="text-xs text-muted-foreground">Smart Attendance System</p>
            </div>
          </div>
        </div>

        {/* Center Section - Page Title (Desktop) */}
        <div className="hidden md:block">
          <h2 className="text-base font-medium text-foreground">{getPageTitle()}</h2>
        </div>

        {/* Right Section - Navigation and Actions */}
        <div className="flex items-center space-x-2">
          {/* Primary Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="micro-feedback"
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMoreMenuToggle}
              iconName="MoreHorizontal"
              iconSize={16}
              className="micro-feedback"
            >
              <span className="hidden sm:inline">More</span>
            </Button>

            {isMoreMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-150" 
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md card-shadow z-200 animate-fade-in">
                  <div className="py-1">
                    {secondaryNavItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavClick(item?.path)}
                        className={`w-full flex items-center px-3 py-2 text-sm transition-colors duration-200 ${
                          location?.pathname === item?.path
                            ? 'bg-primary text-primary-foreground'
                            : 'text-popover-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} className="mr-3" />
                        {item?.label}
                      </button>
                    ))}
                    
                    <div className="border-t border-border my-1" />
                    
                    <button
                      onClick={() => handleNavClick('/teacher-login')}
                      className="w-full flex items-center px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;