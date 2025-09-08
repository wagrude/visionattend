import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const VoiceSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [volume, setVolume] = useState(80);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [enableVoice, setEnableVoice] = useState(true);
  const [enableSuccessSound, setEnableSuccessSound] = useState(true);
  const [enableErrorSound, setEnableErrorSound] = useState(true);
  const [customMessage, setCustomMessage] = useState("Attendance marked successfully for");

  const languageOptions = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-IN', label: 'English (India)' },
    { value: 'hi-IN', label: 'Hindi (हिंदी)' },
    { value: 'bn-IN', label: 'Bengali (বাংলা)' },
    { value: 'te-IN', label: 'Telugu (తెలుగు)' },
    { value: 'ta-IN', label: 'Tamil (தமிழ்)' },
    { value: 'mr-IN', label: 'Marathi (मराठी)' },
    { value: 'gu-IN', label: 'Gujarati (ગુજરાતી)' }
  ];

  const voiceTypeOptions = [
    { value: 'female', label: 'Female Voice' },
    { value: 'male', label: 'Male Voice' }
  ];

  const handleTestVoice = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${customMessage} John Smith. Welcome to class.`
      );
      utterance.lang = selectedLanguage;
      utterance.volume = volume / 100;
      utterance.rate = speechRate;
      speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis not supported in this browser');
    }
  };

  const handlePlaySuccessSound = () => {
    // Mock success sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext?.createOscillator();
    const gainNode = audioContext?.createGain();
    
    oscillator?.connect(gainNode);
    gainNode?.connect(audioContext?.destination);
    
    oscillator?.frequency?.setValueAtTime(800, audioContext?.currentTime);
    oscillator?.frequency?.setValueAtTime(1000, audioContext?.currentTime + 0.1);
    
    gainNode?.gain?.setValueAtTime(0.3, audioContext?.currentTime);
    gainNode?.gain?.exponentialRampToValueAtTime(0.01, audioContext?.currentTime + 0.3);
    
    oscillator?.start(audioContext?.currentTime);
    oscillator?.stop(audioContext?.currentTime + 0.3);
  };

  const handlePlayErrorSound = () => {
    // Mock error sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext?.createOscillator();
    const gainNode = audioContext?.createGain();
    
    oscillator?.connect(gainNode);
    gainNode?.connect(audioContext?.destination);
    
    oscillator?.frequency?.setValueAtTime(400, audioContext?.currentTime);
    oscillator?.frequency?.setValueAtTime(300, audioContext?.currentTime + 0.1);
    
    gainNode?.gain?.setValueAtTime(0.3, audioContext?.currentTime);
    gainNode?.gain?.exponentialRampToValueAtTime(0.01, audioContext?.currentTime + 0.4);
    
    oscillator?.start(audioContext?.currentTime);
    oscillator?.stop(audioContext?.currentTime + 0.4);
  };

  return (
    <div className="space-y-6">
      {/* Voice Enable/Disable */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">Voice Announcements</h3>
            <p className="text-sm text-muted-foreground">
              Enable voice feedback for attendance confirmations
            </p>
          </div>
          <Checkbox
            checked={enableVoice}
            onChange={(e) => setEnableVoice(e?.target?.checked)}
            label=""
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Voice Configuration</h3>
          
          <Select
            label="Language"
            description="Select the language for voice announcements"
            options={languageOptions}
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            disabled={!enableVoice}
          />

          <Select
            label="Voice Type"
            description="Choose between male or female voice"
            options={voiceTypeOptions}
            value="female"
            onChange={() => {}}
            disabled={!enableVoice}
          />

          <div>
            <Input
              type="range"
              label="Volume Level"
              description={`Current volume: ${volume}%`}
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e?.target?.value))}
              disabled={!enableVoice}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Silent (0%)</span>
              <span>Maximum (100%)</span>
            </div>
          </div>

          <div>
            <Input
              type="range"
              label="Speech Rate"
              description={`Current rate: ${speechRate}x (Normal: 1.0x)`}
              min="0.5"
              max="2.0"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e?.target?.value))}
              disabled={!enableVoice}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Slow (0.5x)</span>
              <span>Fast (2.0x)</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleTestVoice}
            iconName="Volume2"
            iconPosition="left"
            iconSize={16}
            disabled={!enableVoice}
            fullWidth
          >
            Test Voice Settings
          </Button>
        </div>

        {/* Message Customization */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Message Customization</h3>
          
          <Input
            type="text"
            label="Success Message Template"
            description="Message announced when attendance is marked successfully"
            value={customMessage}
            onChange={(e) => setCustomMessage(e?.target?.value)}
            placeholder="Enter custom success message"
            disabled={!enableVoice}
          />

          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-2">Preview:</p>
            <p className="text-sm text-foreground font-medium">
              "{customMessage} [Student Name]. Welcome to class."
            </p>
          </div>

          {/* Sound Effects */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Sound Effects</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Checkbox
                  checked={enableSuccessSound}
                  onChange={(e) => setEnableSuccessSound(e?.target?.checked)}
                  label="Success Sound"
                  description="Play sound when attendance is marked"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePlaySuccessSound}
                  iconName="Play"
                  iconSize={14}
                  disabled={!enableSuccessSound}
                >
                  Test
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <Checkbox
                  checked={enableErrorSound}
                  onChange={(e) => setEnableErrorSound(e?.target?.checked)}
                  label="Error Sound"
                  description="Play sound when recognition fails"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePlayErrorSound}
                  iconName="Play"
                  iconSize={14}
                  disabled={!enableErrorSound}
                >
                  Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Accessibility Features */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Accessibility Features</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            checked
            onChange={() => {}}
            label="Repeat Announcements"
            description="Repeat voice announcements twice for clarity"
          />
          
          <Checkbox
            checked
            onChange={() => {}}
            label="Visual Feedback"
            description="Show visual indicators along with voice feedback"
          />
          
          <Checkbox
           
            onChange={() => {}}
            label="Announce Student Count"
            description="Announce total present students periodically"
          />
          
          <Checkbox
            checked
            onChange={() => {}}
            label="Error Descriptions"
            description="Provide detailed voice descriptions for errors"
          />
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Heart" size={16} className="text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Designed for Inclusivity:</p>
              <p className="mt-1 text-xs">
                Voice features help visually impaired students and teachers navigate the attendance system effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettings;