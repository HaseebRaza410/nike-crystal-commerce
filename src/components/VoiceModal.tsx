import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Volume2, Phone, PhoneOff, AlertCircle } from 'lucide-react';
import { useConversation } from '@elevenlabs/react';
import { supabase } from '@/integrations/supabase/client';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceModal = ({ isOpen, onClose }: VoiceModalProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to voice agent');
      setError(null);
    },
    onDisconnect: () => {
      console.log('Disconnected from voice agent');
    },
    onMessage: (message) => {
      console.log('Voice message:', message);
      // Extract text from message payload
      try {
        const messageStr = JSON.stringify(message);
        const parsed = JSON.parse(messageStr);
        if (parsed?.message?.text) {
          setTranscript(parsed.message.text);
        }
      } catch {
        // Ignore parsing errors
      }
    },
    onError: (err) => {
      console.error('Voice error:', err);
      setError('Connection error. Please try again.');
    },
  });

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get signed URL from edge function
      const { data, error: fnError } = await supabase.functions.invoke('elevenlabs-conversation-token');

      if (fnError || !data?.signed_url) {
        // Check if it's a configuration error
        if (data?.error === 'ElevenLabs integration not configured') {
          setError('Voice assistant not configured. Please set up ElevenLabs API key and Agent ID in project settings.');
        } else {
          setError('Could not connect to voice service. Please try again.');
        }
        return;
      }

      // Start conversation with WebSocket
      await conversation.startSession({
        signedUrl: data.signed_url,
      });
    } catch (err) {
      console.error('Failed to start voice conversation:', err);
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setError('Microphone access denied. Please allow microphone access to use voice chat.');
      } else {
        setError('Failed to connect. Please check your microphone and try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setTranscript('');
  }, [conversation]);

  const handleClose = () => {
    if (conversation.status === 'connected') {
      stopConversation();
    }
    onClose();
  };

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-semibold text-lg mb-2">Voice Assistant</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {isConnected 
                ? isSpeaking ? 'Agent is speaking...' : 'Listening to you...'
                : 'Tap to start a voice conversation'
              }
            </p>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive text-sm flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Voice Visualizer */}
            <div className="relative mb-6">
              {isConnected && (
                <>
                  <motion.div
                    animate={{
                      scale: isSpeaking ? [1, 1.3, 1] : [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ repeat: Infinity, duration: isSpeaking ? 0.8 : 1.5 }}
                    className={`absolute inset-0 rounded-full ${isSpeaking ? 'bg-accent/30' : 'bg-primary/20'}`}
                    style={{ margin: '-20px' }}
                  />
                  <motion.div
                    animate={{
                      scale: isSpeaking ? [1, 1.2, 1] : [1, 1.05, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ repeat: Infinity, duration: isSpeaking ? 0.8 : 1.5, delay: 0.2 }}
                    className={`absolute inset-0 rounded-full ${isSpeaking ? 'bg-accent/20' : 'bg-primary/10'}`}
                    style={{ margin: '-40px' }}
                  />
                </>
              )}
              
              <button
                onClick={isConnected ? stopConversation : startConversation}
                disabled={isConnecting}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-300 disabled:opacity-50 ${
                  isConnected 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isConnecting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : isConnected ? (
                  <PhoneOff className="w-8 h-8" />
                ) : (
                  <Phone className="w-8 h-8" />
                )}
              </button>
            </div>

            {/* Status indicator */}
            {isConnected && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-accent animate-pulse' : 'bg-green-500'}`} />
                <span className="text-xs text-muted-foreground">
                  {isSpeaking ? 'Agent speaking' : 'Listening'}
                </span>
              </div>
            )}

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
              Powered by ElevenLabs AI
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
