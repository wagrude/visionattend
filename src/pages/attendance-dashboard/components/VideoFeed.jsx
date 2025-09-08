import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoFeed = ({ 
  isSessionActive = false, 
  cameraStatus = 'disconnected',
  onCameraToggle,
  onDeviceChange,
  recognizedStudents = [],
  selectedDevice = null
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock camera devices
  const mockDevices = [
    { deviceId: 'default', label: 'Default Camera' },
    { deviceId: 'usb-cam-1', label: 'USB Camera 1' },
    { deviceId: 'integrated', label: 'Integrated Webcam' }
  ];

  useEffect(() => {
    setAvailableDevices(mockDevices);
  }, []);

  // Mock facial recognition overlay
  const mockFaceDetections = [
    { id: 1, x: 120, y: 80, width: 100, height: 120, studentName: 'Arjun Patel', confidence: 0.95 },
    { id: 2, x: 280, y: 150, width: 95, height: 115, studentName: 'Priya Sharma', confidence: 0.92 }
  ];

  const handleDeviceSelect = (deviceId) => {
    if (onDeviceChange) {
      onDeviceChange(deviceId);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getCameraStatusDisplay = () => {
    switch (cameraStatus) {
      case 'connected':
        return { text: 'Camera Active', color: 'text-success', icon: 'Video' };
      case 'connecting':
        return { text: 'Connecting...', color: 'text-warning', icon: 'Loader' };
      case 'error':
        return { text: 'Camera Error', color: 'text-error', icon: 'VideoOff' };
      default:
        return { text: 'Camera Off', color: 'text-muted-foreground', icon: 'VideoOff' };
    }
  };

  const statusDisplay = getCameraStatusDisplay();

  return (
    <div className={`bg-surface border border-border rounded-lg overflow-hidden card-shadow ${
      isFullscreen ? 'fixed inset-4 z-50' : 'h-96 lg:h-[500px]'
    }`}>
      {/* Video Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <Icon name={statusDisplay?.icon} size={20} className={statusDisplay?.color} />
          <span className={`text-sm font-medium ${statusDisplay?.color}`}>
            {statusDisplay?.text}
          </span>
          {isSessionActive && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs text-success font-medium">LIVE</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Camera Device Selector */}
          <select
            value={selectedDevice || 'default'}
            onChange={(e) => handleDeviceSelect(e?.target?.value)}
            className="text-xs bg-background border border-border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isSessionActive}
          >
            {availableDevices?.map((device) => (
              <option key={device?.deviceId} value={device?.deviceId}>
                {device?.label}
              </option>
            ))}
          </select>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            iconName={isFullscreen ? "Minimize2" : "Maximize2"}
            iconSize={16}
          >
            <span className="sr-only">Toggle fullscreen</span>
          </Button>
        </div>
      </div>
      {/* Video Content */}
      <div className="relative h-full bg-gray-900">
        {cameraStatus === 'connected' ? (
          <>
            {/* Mock Video Feed */}
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
              {/* Simulated classroom background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-b from-transparent to-black/30" />
              </div>

              {/* Mock students in frame */}
              <div className="relative w-full h-full">
                {/* Student silhouettes */}
                <div className="absolute top-1/4 left-1/4 w-16 h-20 bg-gray-600 rounded-full opacity-60" />
                <div className="absolute top-1/3 right-1/3 w-14 h-18 bg-gray-500 rounded-full opacity-50" />
                <div className="absolute bottom-1/3 left-1/2 w-12 h-16 bg-gray-700 rounded-full opacity-40" />

                {/* Facial recognition overlays */}
                {isSessionActive && mockFaceDetections?.map((detection) => (
                  <div
                    key={detection?.id}
                    className="absolute border-2 border-success rounded-lg"
                    style={{
                      left: `${detection?.x}px`,
                      top: `${detection?.y}px`,
                      width: `${detection?.width}px`,
                      height: `${detection?.height}px`
                    }}
                  >
                    <div className="absolute -top-8 left-0 bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
                      {detection?.studentName}
                      <div className="text-xs opacity-75">
                        {Math.round(detection?.confidence * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recognition status overlay */}
              {isSessionActive && (
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Eye" size={16} className="text-success" />
                    <span className="text-sm">
                      {mockFaceDetections?.length} faces detected
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Hidden video and canvas elements for real implementation */}
            <video
              ref={videoRef}
              className="hidden"
              autoPlay
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className="hidden"
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
            <Icon name="VideoOff" size={48} className="mb-4" />
            <h3 className="text-lg font-medium mb-2">Camera Not Active</h3>
            <p className="text-sm text-center max-w-md mb-4">
              {cameraStatus === 'error' ?'Unable to access camera. Please check permissions and connection.' :'Click the camera button to start video feed for attendance monitoring.'
              }
            </p>
            {cameraStatus !== 'connecting' && (
              <Button
                variant="outline"
                onClick={onCameraToggle}
                iconName="Video"
                iconPosition="left"
                iconSize={16}
              >
                Enable Camera
              </Button>
            )}
          </div>
        )}
      </div>
      {/* Recognition Statistics */}
      {isSessionActive && cameraStatus === 'connected' && (
        <div className="p-3 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">
                Processing: <span className="text-foreground font-medium">30 FPS</span>
              </span>
              <span className="text-muted-foreground">
                Detected: <span className="text-success font-medium">{mockFaceDetections?.length}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-success font-medium">Recognition Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;