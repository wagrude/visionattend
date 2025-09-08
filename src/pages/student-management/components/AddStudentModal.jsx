import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddStudentModal = ({ isOpen, onClose, onSave, editingStudent = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    class: '',
    email: '',
    phone: '',
    parentName: '',
    parentPhone: '',
    address: ''
  });
  
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [captureStep, setCaptureStep] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const classOptions = [
    { value: '1st Grade', label: '1st Grade' },
    { value: '2nd Grade', label: '2nd Grade' },
    { value: '3rd Grade', label: '3rd Grade' },
    { value: '4th Grade', label: '4th Grade' },
    { value: '5th Grade', label: '5th Grade' },
    { value: '6th Grade', label: '6th Grade' },
    { value: '7th Grade', label: '7th Grade' },
    { value: '8th Grade', label: '8th Grade' },
    { value: '9th Grade', label: '9th Grade' },
    { value: '10th Grade', label: '10th Grade' },
    { value: '11th Grade', label: '11th Grade' },
    { value: '12th Grade', label: '12th Grade' }
  ];

  const captureSteps = [
    { title: 'Front View', instruction: 'Look directly at the camera' },
    { title: 'Left Profile', instruction: 'Turn your head slightly to the left' },
    { title: 'Right Profile', instruction: 'Turn your head slightly to the right' }
  ];

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent?.name || '',
        rollNumber: editingStudent?.rollNumber || '',
        class: editingStudent?.class || '',
        email: editingStudent?.email || '',
        phone: editingStudent?.phone || '',
        parentName: editingStudent?.parentName || '',
        parentPhone: editingStudent?.parentPhone || '',
        address: editingStudent?.address || ''
      });
      setPhotoPreview(editingStudent?.photo);
    } else {
      resetForm();
    }
  }, [editingStudent, isOpen]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      rollNumber: '',
      class: '',
      email: '',
      phone: '',
      parentName: '',
      parentPhone: '',
      address: ''
    });
    setPhoto(null);
    setPhotoPreview(null);
    setCaptureStep(0);
    setCapturedPhotos([]);
    setErrors({});
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });
      
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef?.current || !canvasRef?.current) return;

    const canvas = canvasRef?.current;
    const video = videoRef?.current;
    const context = canvas?.getContext('2d');

    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;
    context?.drawImage(video, 0, 0);

    const photoData = canvas?.toDataURL('image/jpeg', 0.8);
    const newCapturedPhotos = [...capturedPhotos, photoData];
    setCapturedPhotos(newCapturedPhotos);

    if (captureStep < captureSteps?.length - 1) {
      setCaptureStep(captureStep + 1);
    } else {
      // All photos captured, use the first one as preview
      setPhotoPreview(newCapturedPhotos?.[0]);
      setPhoto(newCapturedPhotos?.[0]);
      stopCamera();
      setCaptureStep(0);
    }
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e?.target?.result);
        setPhoto(e?.target?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.rollNumber?.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!formData?.class) newErrors.class = 'Class is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
    
    if (!photo && !editingStudent) newErrors.photo = 'Photo is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate face data processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const studentData = {
        ...formData,
        photo: photo || photoPreview,
        capturedPhotos: capturedPhotos?.length > 0 ? capturedPhotos : null,
        faceDataStatus: 'processing',
        registrationDate: new Date()?.toISOString()
      };

      onSave(studentData);
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Failed to save student. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden card-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {editingStudent ? 'Edit Student' : 'Add New Student'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
            className="micro-feedback"
          >
            <span className="sr-only">Close modal</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Student Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground mb-4">Student Information</h3>
                
                <Input
                  label="Full Name"
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                  placeholder="Enter student's full name"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Roll Number"
                    type="text"
                    value={formData?.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e?.target?.value)}
                    error={errors?.rollNumber}
                    required
                    placeholder="e.g., 2025001"
                  />

                  <Select
                    label="Class"
                    options={classOptions}
                    value={formData?.class}
                    onChange={(value) => handleInputChange('class', value)}
                    error={errors?.class}
                    required
                    placeholder="Select class"
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  required
                  placeholder="student@school.edu"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  placeholder="Student's phone number (optional)"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Parent/Guardian Name"
                    type="text"
                    value={formData?.parentName}
                    onChange={(e) => handleInputChange('parentName', e?.target?.value)}
                    placeholder="Parent's full name"
                  />

                  <Input
                    label="Parent Phone"
                    type="tel"
                    value={formData?.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e?.target?.value)}
                    placeholder="Parent's phone number"
                  />
                </div>

                <Input
                  label="Address"
                  type="text"
                  value={formData?.address}
                  onChange={(e) => handleInputChange('address', e?.target?.value)}
                  placeholder="Student's address (optional)"
                />
              </div>

              {/* Right Column - Photo Capture */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground mb-4">Photo & Face Recognition</h3>
                
                {errors?.photo && (
                  <div className="text-sm text-destructive">{errors?.photo}</div>
                )}

                {/* Photo Preview */}
                {photoPreview && (
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden bg-muted border border-border">
                      <img
                        src={photoPreview}
                        alt="Student preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Current photo</p>
                  </div>
                )}

                {/* Camera Interface */}
                {cameraActive && (
                  <div className="text-center space-y-4">
                    <div className="relative w-full max-w-md mx-auto">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg border border-border"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                        Step {captureStep + 1} of {captureSteps?.length}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="font-medium text-foreground">{captureSteps?.[captureStep]?.title}</h4>
                      <p className="text-sm text-muted-foreground">{captureSteps?.[captureStep]?.instruction}</p>
                    </div>

                    <div className="flex justify-center space-x-3">
                      <Button
                        type="button"
                        variant="default"
                        onClick={capturePhoto}
                        iconName="Camera"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Capture Photo
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={stopCamera}
                        iconName="X"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Photo Options */}
                {!cameraActive && (
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={startCamera}
                      iconName="Camera"
                      iconPosition="left"
                      iconSize={16}
                      fullWidth
                    >
                      Capture with Camera
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef?.current?.click()}
                      iconName="Upload"
                      iconPosition="left"
                      iconSize={16}
                      fullWidth
                    >
                      Upload Photo
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                )}

                {/* Captured Photos Preview */}
                {capturedPhotos?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Captured Angles</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {capturedPhotos?.map((photo, index) => (
                        <div key={index} className="w-full h-20 rounded border border-border overflow-hidden">
                          <img
                            src={photo}
                            alt={`Capture ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Face Recognition Info */}
                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium mb-1">Face Recognition Training</p>
                      <p>Multiple angles help improve recognition accuracy. The system will process the facial data after registration.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                loading={isProcessing}
                iconName={editingStudent ? "Save" : "UserPlus"}
                iconPosition="left"
                iconSize={16}
              >
                {isProcessing 
                  ? 'Processing...' 
                  : editingStudent 
                    ? 'Update Student' :'Add Student'
                }
              </Button>
            </div>
          </form>
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default AddStudentModal;