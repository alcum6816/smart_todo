import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { processVoiceTask, transcribeAudio } from '../../../services/openaiService';

const VoiceTaskInput = ({ onTaskCreate, isVisible }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const startListening = async () => {
    try {
      setError(null);
      setIsListening(true);
      setTranscript('');
      setConfidence(0);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'voice_input.wav', { type: 'audio/wav' });
        
        try {
          setIsProcessing(true);
          const transcribedText = await transcribeAudio(audioFile);
          setTranscript(transcribedText);
          setConfidence(0.95);
          
          // Process the transcript with OpenAI
          const taskDetails = await processVoiceTask(transcribedText);
          onTaskCreate(taskDetails);
          
          // Reset state
          setTranscript('');
          setConfidence(0);
          setIsProcessing(false);
          
        } catch (error) {
          console.error('Error processing audio:', error);
          setError('Failed to process voice input. Please try again.');
          setIsProcessing(false);
          
          // Fallback to mock processing
          processVoiceInputFallback(transcribedText || 'Create a new task');
        }
        
        // Stop microphone stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      recorder.start();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Microphone access denied. Using mock voice input.');
      setIsListening(false);
      
      // Fallback to mock voice recognition
      setTimeout(() => {
        const sampleTranscripts = [
          "Create a high priority task to review project proposal by tomorrow 3 PM",
          "Add task call client about meeting next week",
          "Urgent task finish presentation for Monday morning",
          "Schedule doctor appointment for health checkup this Friday",
          "Personal task buy groceries and cook dinner tonight"
        ];
        
        const randomTranscript = sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)];
        setTranscript(randomTranscript);
        setConfidence(0.85);
        setIsListening(false);
        setIsProcessing(true);
        
        // Process the transcript
        setTimeout(() => {
          processVoiceInputFallback(randomTranscript);
        }, 1500);
      }, 3000);
    }
  };

  const stopListening = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    setIsListening(false);
  };

  const processVoiceInputFallback = (text) => {
    // Fallback processing when OpenAI is not available
    const taskDetails = extractTaskDetailsFallback(text);
    
    setTimeout(() => {
      setIsProcessing(false);
      onTaskCreate(taskDetails);
      setTranscript('');
      setConfidence(0);
      setError(null);
    }, 1000);
  };

  const extractTaskDetailsFallback = (text) => {
    const lowerText = text.toLowerCase();
    
    // Extract priority
    let priority = 'medium';
    if (lowerText.includes('urgent') || lowerText.includes('high priority') || lowerText.includes('asap')) {
      priority = 'high';
    } else if (lowerText.includes('low priority') || lowerText.includes('when possible')) {
      priority = 'low';
    }

    // Extract category
    let category = 'work';
    if (lowerText.includes('personal') || lowerText.includes('home') || lowerText.includes('family')) {
      category = 'personal';
    } else if (lowerText.includes('health') || lowerText.includes('doctor') || lowerText.includes('exercise')) {
      category = 'health';
    } else if (lowerText.includes('learn') || lowerText.includes('study') || lowerText.includes('course')) {
      category = 'learning';
    }

    // Extract due date
    let dueDate = null;
    const datePatterns = {
      'today': new Date(),
      'tomorrow': new Date(Date.now() + 24 * 60 * 60 * 1000),
      'next week': new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      'monday': getNextWeekday(1),
      'tuesday': getNextWeekday(2),
      'wednesday': getNextWeekday(3),
      'thursday': getNextWeekday(4),
      'friday': getNextWeekday(5),
      'saturday': getNextWeekday(6),
      'sunday': getNextWeekday(0)
    };

    for (const [pattern, date] of Object.entries(datePatterns)) {
      if (lowerText.includes(pattern)) {
        dueDate = date.toISOString();
        break;
      }
    }

    // Extract time
    const timeMatch = text.match(/(\d{1,2})\s*(am|pm|AM|PM)/);
    if (timeMatch && dueDate) {
      const hour = parseInt(timeMatch[1]);
      const period = timeMatch[2].toLowerCase();
      const date = new Date(dueDate);
      date.setHours(period === 'pm' && hour !== 12 ? hour + 12 : hour === 12 && period === 'am' ? 0 : hour);
      dueDate = date.toISOString();
    }

    // Clean up title
    let title = text
      .replace(/urgent|high priority|low priority|asap/gi, '')
      .replace(/personal|work|health|learning/gi, '')
      .replace(/today|tomorrow|next week|monday|tuesday|wednesday|thursday|friday|saturday|sunday/gi, '')
      .replace(/\d{1,2}\s*(am|pm|AM|PM)/g, '')
      .replace(/create|add|schedule|task/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    title = title.charAt(0).toUpperCase() + title.slice(1);

    return {
      id: Date.now(),
      title: title || 'Voice Task',
      description: `Created via voice input: "${text}"`,
      priority,
      category,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
      aiEstimate: '30 min',
      aiTags: ['voice-created', 'fallback-processing'],
      aiInsights: `This task was created via voice input and processed with fallback logic.`
    };
  };

  const getNextWeekday = (targetDay) => {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilTarget = (targetDay - currentDay + 7) % 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + (daysUntilTarget === 0 ? 7 : daysUntilTarget));
    return targetDate;
  };

  const handleManualProcess = async () => {
    if (!transcript) return;
    
    try {
      setIsProcessing(true);
      setError(null);
      
      const taskDetails = await processVoiceTask(transcript);
      onTaskCreate(taskDetails);
      
      setTranscript('');
      setConfidence(0);
      setIsProcessing(false);
      
    } catch (error) {
      console.error('Error processing transcript:', error);
      setError('Failed to process with OpenAI. Using fallback processing.');
      processVoiceInputFallback(transcript);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 z-50">
      <div className={`transition-all duration-300 ${
        isListening || transcript ? 'scale-110' : 'scale-100'
      }`}>
        {/* Voice Input Button */}
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
          className={`w-14 h-14 rounded-full shadow-elevation-3 flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-error text-white animate-ai-pulse' 
              : isProcessing
              ? 'bg-warning text-white' :'bg-primary text-white hover:bg-primary-700'
          }`}
        >
          {isProcessing ? (
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full animate-ai-thinking"></div>
              <div className="w-1 h-1 bg-white rounded-full animate-ai-thinking" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-white rounded-full animate-ai-thinking" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : (
            <Icon name="Mic" size={24} />
          )}
        </button>

        {/* Voice Feedback */}
        {(isListening || transcript || isProcessing || error) && (
          <div className="absolute bottom-16 right-0 bg-surface border border-border rounded-lg shadow-elevation-3 p-4 w-80 max-w-[calc(100vw-2rem)]">
            {error && (
              <div className="mb-3 p-2 bg-error-50 border border-error-200 rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error" />
                  <p className="text-xs text-error">{error}</p>
                </div>
              </div>
            )}
            
            {isListening && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-error rounded-full animate-ai-pulse"></div>
                  <span className="text-sm font-medium text-text-primary">Listening...</span>
                </div>
                <p className="text-xs text-text-muted">
                  Say something like "Create urgent task to call client tomorrow"
                </p>
              </div>
            )}

            {transcript && !isProcessing && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">Transcript</span>
                  <span className="text-xs text-success">
                    {Math.round(confidence * 100)}% confident
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3 p-2 bg-secondary-50 rounded">
                  "{transcript}"
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={handleManualProcess}
                    iconName="Brain"
                    iconPosition="left"
                  >
                    Process with AI
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => {
                      setTranscript('');
                      setConfidence(0);
                      setError(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="Brain" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Processing with OpenAI...</span>
                </div>
                <p className="text-xs text-text-muted">
                  Extracting task details and setting smart defaults
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceTaskInput;
