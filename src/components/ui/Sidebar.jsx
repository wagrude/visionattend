import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();

  const navigationItems = [
    {
      path: '/attendance-dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      description: 'Real-time attendance management'
    },
    {
      path: '/student-management',
      label: 'Students',
      icon: 'Users',
      description: 'Manage student roster and profiles'
    },
    {
      path: '/attendance-history',
      label: 'History',
      icon: 'Clock',
      description: 'View attendance records and reports'
    },
    {
      path: '/system-settings',
      label: 'Settings',
      icon: 'Settings',
      description: 'Configure system preferences'
    }
  ];

  const handleNavClick = (path) => {
    window.location.href = path;
  };

  const handleSignOut = () => {
    window.location.href = '/teacher-login';
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-150 lg:hidden"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-surface border-r border-border z-200 sidebar-transition ${
          isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-240'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name="Eye" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">VisionAttend</h1>
                  <p className="text-xs text-muted-foreground">Smart Attendance</p>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="micro-feedback"
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              iconSize={20}
            >
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              
              return (
                <div key={item?.path} className="relative group">
                  <button
                    onClick={() => handleNavClick(item?.path)}
                    className={`nav-item w-full ${
                      isActive ? 'nav-item-active' : 'nav-item-inactive'
                    } ${isCollapsed ? 'justify-center px-2' : 'justify-start'}`}
                    title={isCollapsed ? item?.label : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={isCollapsed ? '' : 'mr-3'} 
                    />
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item?.label}</div>
                        <div className="text-xs opacity-75 mt-0.5">{item?.description}</div>
                      </div>
                    )}
                  </button>
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover border border-border rounded text-xs text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item?.label}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleSignOut}
              className={`nav-item w-full nav-item-inactive ${
                isCollapsed ? 'justify-center px-2' : 'justify-start'
              }`}
              title={isCollapsed ? 'Sign Out' : ''}
            >
              <Icon 
                name="LogOut" 
                size={20} 
                className={isCollapsed ? '' : 'mr-3'} 
              />
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-medium">Sign Out</div>
                  <div className="text-xs opacity-75 mt-0.5">Return to login</div>
                </div>
              )}
            </button>

            {!isCollapsed && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground text-center">
                  <div>VisionAttend v1.0</div>
                  <div className="mt-1">© 2025 Educational Tech</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;