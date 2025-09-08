import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const CameraConfiguration = () => {
  const [selectedCamera, setSelectedCamera] = useState('');
  const [resolution, setResolution] = useState('1280x720');
  const [sensitivity, setSensitivity] = useState(75);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [cameraStatus, setCameraStatus] = useState('disconnected');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const cameraOptions = [
    { value: 'default', label: 'Default Camera (Built-in)' },
    { value: 'usb-cam-1', label: 'USB Camera 1 (External)' },
    { value: 'usb-cam-2', label: 'USB Camera 2 (External)' }
  ];

  const resolutionOptions = [
    { value: '640x480', label: '640x480 (VGA)' },
    { value: '1280x720', label: '1280x720 (HD)' },
    { value: '1920x1080', label: '1920x1080 (Full HD)' }
  ];

  useEffect(() => {
    return () => {
      if (streamRef?.current) {
        streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      }
    };
  }, []);

  const handleStartPreview = async () => {
    try {
      setCameraStatus('connecting');
      const stream = await navigator.mediaDevices?.getUserMedia({ 
        video: { 
          width: parseInt(resolution?.split('x')?.[0]),
          height: parseInt(resolution?.split('x')?.[1])
        } 
      });
      
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsPreviewActive(true);
        setCameraStatus('connected');
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraStatus('error');
    }
  };

  const handleStopPreview = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
    if (videoRef?.current) {
      videoRef.current.srcObject = null;
    }
    setIsPreviewActive(false);
    setCameraStatus('disconnected');
  };

  const handleTestRecognition = () => {
    // Mock facial recognition test
    alert('Facial recognition test completed successfully!\nDetection accuracy: 95%\nProcessing time: 0.3 seconds');
  };

  const getCameraStatusColor = () => {
    switch (cameraStatus) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getCameraStatusText = () => {
    switch (cameraStatus) {
      case 'connected': return 'Camera Connected';
      case 'connecting': return 'Connecting...';
      case 'error': return 'Connection Failed';
      default: return 'Camera Disconnected';
    }
  };

  return (
    <div className="space-y-6">
      {/* Camera Status Header */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              cameraStatus === 'connected' ? 'bg-success' : 
              cameraStatus === 'connecting' ? 'bg-warning' : 
              cameraStatus === 'error' ? 'bg-error' : 'bg-muted-foreground'
            }`} />
            <div>
              <h3 className="font-medium text-foreground">Camera Status</h3>
              <p className={`text-sm ${getCameraStatusColor()}`}>
                {getCameraStatusText()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isPreviewActive ? (
              <Button
                variant="default"
                onClick={handleStartPreview}
                iconName="Video"
                iconPosition="left"
                iconSize={16}
              >
                Start Preview
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={handleStopPreview}
                iconName="VideoOff"
                iconPosition="left"
                iconSize={16}
              >
                Stop Preview
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Camera Settings</h3>
          
          <Select
            label="Camera Device"
            description="Select the camera device for attendance capture"
            options={cameraOptions}
            value={selectedCamera}
            onChange={setSelectedCamera}
            placeholder="Choose camera device"
          />

          <Select
            label="Video Resolution"
            description="Higher resolution improves recognition accuracy but requires more processing power"
            options={resolutionOptions}
            value={resolution}
            onChange={setResolution}
          />

          <div>
            <Input
              type="range"
              label="Recognition Sensitivity"
              description={`Current sensitivity: ${sensitivity}% (Recommended: 70-80% for rural environments)`}
              min="50"
              max="100"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseInt(e?.target?.value))}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Less Strict (50%)</span>
              <span>More Strict (100%)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleTestRecognition}
              iconName="Brain"
              iconPosition="left"
              iconSize={16}
              disabled={cameraStatus !== 'connected'}
              fullWidth
            >
              Test Facial Recognition
            </Button>
          </div>
        </div>

        {/* Camera Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>
          
          <div className="bg-muted rounded-lg overflow-hidden aspect-video">
            {isPreviewActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click "Start Preview" to test camera
                  </p>
                </div>
              </div>
            )}
          </div>

          {isPreviewActive && (
            <div className="bg-surface border border-border rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Preview Quality:</span>
                <span className="text-success font-medium">Excellent</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Face Detection:</span>
                <span className="text-success font-medium">Ready</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Advanced Camera Settings */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Advanced Settings</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Frame Rate (FPS)"
            description="Higher FPS improves detection but uses more resources"
            value="30"
            min="15"
            max="60"
          />
          
          <Input
            type="number"
            label="Detection Timeout (seconds)"
            description="Time to wait for face detection before timeout"
            value="10"
            min="5"
            max="30"
          />
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Recommended Settings for Rural Schools:</p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Resolution: 1280x720 for balance of quality and performance</li>
                <li>• Sensitivity: 75% to handle varying lighting conditions</li>
                <li>• Frame Rate: 30 FPS for smooth real-time detection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraConfiguration;