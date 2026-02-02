import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mic, X } from 'lucide-react';

export const ChatVoiceButtons = forwardRef<HTMLDivElement>((_, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence mode="popLayout">
        {isExpanded && (
          <>
            <motion.button
              key="voice-btn"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ delay: 0.1 }}
              className="glass-panel w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 glow-border"
              aria-label="Voice Assistant"
            >
              <Mic className="w-6 h-6 text-primary" />
            </motion.button>
            
            <motion.button
              key="chat-btn"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="glass-panel w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 glow-border"
              aria-label="Chat Assistant"
            >
              <MessageCircle className="w-6 h-6 text-primary" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 rounded-full flex items-center justify-center btn-glow shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isExpanded ? "Close menu" : "Open assistant menu"}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isExpanded ? (
            <X className="w-7 h-7" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
});

ChatVoiceButtons.displayName = 'ChatVoiceButtons';
