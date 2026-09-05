import { useState, useRef, useCallback } from 'react';

export function useVoiceRecorder({ onSpeechRecorded }) {
  const [recorderState, setRecorderState] = useState('IDLE'); // IDLE, LISTENING, PROCESSING, SUCCESS, ERROR
  const [errorMessage, setErrorMessage] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startListening = useCallback(async () => {
    setErrorMessage(null);
    setRecorderState('LISTENING');
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setRecorderState('PROCESSING');
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Stop stream tracks to release microphone
        stream.getTracks().forEach(track => track.stop());

        try {
          if (onSpeechRecorded) {
            await onSpeechRecorded(audioBlob);
          }
          setRecorderState('SUCCESS');
          setTimeout(() => setRecorderState('IDLE'), 2000);
        } catch (err) {
          console.error(err);
          setRecorderState('ERROR');
          setErrorMessage('Could not understand. Please try again or type.');
        }
      };

      mediaRecorder.start();
    } catch (err) {
      console.error(err);
      setRecorderState('ERROR');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Microphone access permission denied.');
      } else {
        setErrorMessage(err.message || 'Microphone access unavailable.');
      }
    }
  }, [onSpeechRecorded]);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const resetState = useCallback(() => {
    setRecorderState('IDLE');
    setErrorMessage(null);
  }, []);

  return {
    recorderState,
    errorMessage,
    startListening,
    stopListening,
    resetState
  };
}
