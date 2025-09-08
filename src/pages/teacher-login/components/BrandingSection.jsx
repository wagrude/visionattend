import React from 'react';
import Icon from '../../../components/AppIcon';

const BrandingSection = () => {
  const benefits = [
    {
      icon: 'Clock',
      title: 'Save 20-25 Minutes Daily',
      description: 'Automated attendance eliminates manual roll calls'
    },
    {
      icon: 'Eye',
      title: 'Facial Recognition',
      description: 'Advanced AI technology for accurate identification'
    },
    {
      icon: 'Volume2',
      title: 'Voice Feedback',
      description: 'Audio confirmation for visually impaired students'
    },
    {
      icon: 'FileText',
      title: 'Instant Reports',
      description: 'Generate attendance sheets in CSV/Excel format'
    }
  ];

  const trustSignals = [
    {
      icon: 'Shield',
      text: 'Educational Compliance'
    },
    {
      icon: 'Award',
      text: 'Rural School Certified'
    },
    {
      icon: 'Lock',
      text: 'Secure Data Storage'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Logo and Title */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl">
            <Icon name="Eye" size={32} color="white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">VisionAttend</h1>
        <p className="text-lg text-muted-foreground">Smart Attendance Management System</p>
      </div>
      {/* System Description */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Revolutionizing Rural Education
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Designed specifically for rural schools, VisionAttend uses cutting-edge facial recognition 
          technology to automate attendance tracking, saving valuable teaching time while ensuring 
          accurate record-keeping and accessibility for all students.
        </p>
      </div>
      {/* Key Benefits */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Key Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-surface rounded-lg border border-border">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={benefit?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{benefit?.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Signals */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Trusted by Educational Institutions</h3>
        <div className="flex flex-wrap gap-3">
          {trustSignals?.map((signal, index) => (
            <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-full border border-success/20">
              <Icon name={signal?.icon} size={14} className="text-success" />
              <span className="text-xs font-medium text-success">{signal?.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* System Requirements */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">System Requirements</h3>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Monitor" size={12} />
            <span>Desktop/Laptop with webcam</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Wifi" size={12} />
            <span>Internet connection (optional for sync)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Chrome" size={12} />
            <span>Modern web browser (Chrome, Firefox, Safari)</span>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} VisionAttend. Empowering rural education through technology.
        </p>
      </div>
    </div>
  );
};

export default BrandingSection;