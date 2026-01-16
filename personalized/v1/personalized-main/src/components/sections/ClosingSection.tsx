import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Home } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';
import { ValentineData } from '@/data/valentineData';

interface ClosingSectionProps {
  data: ValentineData;
  isActive: boolean;
  onComplete?: () => void;
}

const ClosingSection = ({ data, isActive, onComplete }: ClosingSectionProps) => {
  const [showContent, setShowContent] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showRestartButton, setShowRestartButton] = useState(false);
  const { fireConfetti } = useConfetti();

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        setShowFinalMessage(true);
        // Trigger celebration effects
        if (data.closing.endingAnimation === 'hearts' || data.closing.endingAnimation === 'sparkles') {
          setTimeout(() => fireConfetti(), 500);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showContent, data.closing.endingAnimation, fireConfetti]);

  useEffect(() => {
    if (showFinalMessage) {
      const timer = setTimeout(() => setShowRestartButton(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [showFinalMessage]);

  const handleRestart = useCallback(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  const renderHeartsAnimation = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: 0,
            y: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 600,
            y: -Math.random() * 400 - 200,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute text-2xl md:text-4xl"
          style={{ 
            color: data.theme.primaryColor,
            left: '50%',
            top: '50%'
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );

  const renderSparklesAnimation = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: 0,
            y: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: (Math.random() - 0.5) * 500,
            y: -Math.random() * 300 - 150,
            rotate: Math.random() * 720
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute"
          style={{ 
            left: '50%',
            top: '50%'
          }}
        >
          <Sparkles 
            className="w-6 h-6 md:w-8 md:h-8" 
            style={{ color: data.theme.accentColor }} 
          />
        </motion.div>
      ))}
    </div>
  );

  if (!isActive) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at center, ${data.theme.primaryColor}30, ${data.theme.secondaryColor}20, transparent)`,
      }}
    >
      {/* Background Animation */}
      <AnimatePresence>
        {showFinalMessage && data.closing.endingAnimation === 'hearts' && renderHeartsAnimation()}
        {showFinalMessage && data.closing.endingAnimation === 'sparkles' && renderSparklesAnimation()}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-5"
          style={{ backgroundColor: data.theme.primaryColor }}
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-5"
          style={{ backgroundColor: data.theme.accentColor }}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-6"
          >
            <Heart className="w-12 h-12 md:w-16 md:h-16" style={{ color: data.theme.primaryColor }} />
          </motion.div>
          
          <AnimatePresence>
            {showFinalMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
                  style={{ 
                    color: data.theme.primaryColor,
                    fontFamily: data.theme.fontFamily 
                  }}
                >
                  {data.closing.finalAffirmation}
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Signature Card */}
        <AnimatePresence>
          {showFinalMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 relative overflow-hidden"
                style={{ 
                  borderColor: data.theme.accentColor,
                  fontFamily: data.theme.fontFamily 
                }}
              >
                {/* Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute top-4 left-4 text-6xl"
                >
                  <Heart style={{ color: data.theme.primaryColor }} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="absolute bottom-4 right-4 text-6xl"
                >
                  <Heart style={{ color: data.theme.primaryColor }} />
                </motion.div>

                {/* Message Content */}
                <div className="relative z-10 text-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed"
                  >
                    {data.closing.senderSignature}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="inline-block"
                  >
                    <motion.p
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-2xl md:text-3xl font-bold italic"
                      style={{ color: data.theme.primaryColor }}
                    >
                      {data.senderName}
                    </motion.p>
                  </motion.div>
                </div>

                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 rounded-3xl pointer-events-none"
                     style={{ 
                       borderColor: data.theme.accentColor,
                       opacity: 0.3
                     }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <AnimatePresence>
          {showRestartButton && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all flex items-center gap-2"
                style={{ 
                  backgroundColor: data.theme.accentColor,
                  boxShadow: `0 8px 25px -8px ${data.theme.accentColor}40`
                }}
              >
                <Home className="w-5 h-5" />
                Start Over
              </motion.button>
              
              {onComplete && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.close()}
                  className="px-6 py-3 rounded-full border-2 font-semibold transition-all flex items-center gap-2"
                  style={{ 
                    borderColor: data.theme.primaryColor,
                    color: data.theme.primaryColor
                  }}
                >
                  <Heart className="w-5 h-5" />
                  Close This Memory
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default ClosingSection;
