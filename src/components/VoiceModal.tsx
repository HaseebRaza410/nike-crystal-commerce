import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceModal = ({ isOpen, onClose }: VoiceModalProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleListening = () => {
    if (!isListening) {
      // Start listening simulation
      setIsListening(true);
      setTranscript('Listening...');
      
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript('How can I help you find the perfect Nike shoes today?');
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
      setTranscript('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 w-[320px] max-w-[calc(100vw-3rem)] glass-card z-50 p-6 text-center"
          >
            {/* Header */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-semibold text-lg mb-2">Voice Assistant</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Tap the mic to start speaking
            </p>

            {/* Voice Visualizer */}
            <div className="relative mb-6">
              <motion.div
                animate={isListening ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full bg-primary/20"
                style={{ margin: '-20px' }}
              />
              <motion.div
                animate={isListening ? {
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                } : {}}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                className="absolute inset-0 rounded-full bg-primary/10"
                style={{ margin: '-40px' }}
              />
              
              <button
                onClick={toggleListening}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>
            </div>

            {/* Transcript */}
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-4 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Response</span>
                </div>
                <p className="text-sm">{transcript}</p>
              </motion.div>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              Voice feature coming soon with ElevenLabs integration
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
