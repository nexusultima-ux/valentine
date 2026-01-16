import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift } from 'lucide-react';
import { useConfetti } from '@/hooks/useConfetti';
import { ValentineData } from '@/data/valentineData';

interface SurpriseSectionProps {
  data: ValentineData;
  isActive: boolean;
  onComplete: () => void;
}

const SurpriseSection = ({ data, isActive, onComplete }: SurpriseSectionProps) => {
  const [showContent, setShowContent] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
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
        setShowSurprise(true);
        // Trigger confetti for certain surprise types
        if (data.surprise.type === 'confetti' || data.surprise.type === 'heart-explosion') {
          setTimeout(() => fireConfetti(), 300);
        }
      }, data.surprise.delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [showContent, data.surprise.delay, data.surprise.type, fireConfetti]);

  useEffect(() => {
    if (showSurprise) {
      const timer = setTimeout(() => setShowContinueButton(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSurprise]);

  const handleContinue = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const handleReveal = useCallback(() => {
    setShowSurprise(true);
    if (data.surprise.type === 'confetti' || data.surprise.type === 'heart-explosion') {
      fireConfetti();
    }
  }, [data.surprise.type, fireConfetti]);

  if (!isActive) return null;

  const renderFinalMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="text-center"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
      >
        <Gift className="w-16 h-16" style={{ color: data.theme.accentColor }} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto border-2"
        style={{ borderColor: data.theme.accentColor }}
      >
        <h3 
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ 
            color: data.theme.primaryColor,
            fontFamily: data.theme.fontFamily 
          }}
        >
          One Final Thought...
        </h3>
        <p 
          className="text-xl md:text-2xl leading-relaxed text-gray-700"
          style={{ fontFamily: data.theme.fontFamily }}
        >
          {data.surprise.content}
        </p>
      </motion.div>
    </motion.div>
  );

  const renderConfetti = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="text-center"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="mb-8"
      >
        <Sparkles className="w-16 h-16" style={{ color: data.theme.accentColor }} />
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ 
          color: data.theme.primaryColor,
          fontFamily: data.theme.fontFamily 
        }}
      >
        🎉 Surprise! 🎉
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-2xl mx-auto"
        style={{ fontFamily: data.theme.fontFamily }}
      >
        {data.surprise.content}
      </motion.p>
    </motion.div>
  );

  const renderHeartExplosion = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-center relative"
    >
      {/* Floating Hearts Background */}
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
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 400,
            y: -Math.random() * 300 - 100,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute text-4xl md:text-6xl"
          style={{ 
            color: data.theme.primaryColor,
            left: '50%',
            top: '50%'
          }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10"
      >
        <Heart className="w-24 h-24 md:w-32 md:h-32" style={{ color: data.theme.primaryColor }} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 mt-8"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 max-w-xl mx-auto border-2"
          style={{ borderColor: data.theme.accentColor }}
        >
          <p 
            className="text-xl md:text-2xl leading-relaxed text-gray-700"
            style={{ fontFamily: data.theme.fontFamily }}
          >
            {data.surprise.content}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const renderAffectionateLine = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="text-center"
    >
      <motion.div
        animate={{ 
          pathLength: [0, 1],
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="mb-12"
      >
        <svg width="200" height="100" viewBox="0 0 200 100" className="mx-auto">
          <motion.path
            d="M20,50 Q50,20 100,50 T180,50"
            stroke={data.theme.primaryColor}
            strokeWidth="3"
            fill="none"
            style={{ pathLength: 1 }}
          />
        </svg>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-4 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${data.theme.accentColor}30, transparent)`
          }}
        />
        
        <motion.p
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed text-gray-800 px-8 py-6"
          style={{ 
            fontFamily: data.theme.fontFamily,
            color: data.theme.primaryColor
          }}
        >
          {data.surprise.content}
        </motion.p>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at center, ${data.theme.primaryColor}25, ${data.theme.secondaryColor}15)`,
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: data.theme.accentColor }}
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: data.theme.primaryColor }}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 0, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-8 h-8" style={{ color: data.theme.accentColor }} />
          </motion.div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: data.theme.primaryColor,
              fontFamily: data.theme.fontFamily 
            }}
          >
            A Special Surprise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            One more thing I wanted you to know...
          </p>
        </motion.div>

        {/* Surprise Content */}
        <AnimatePresence>
          {showSurprise ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {data.surprise.type === 'final-message' && renderFinalMessage()}
              {data.surprise.type === 'confetti' && renderConfetti()}
              {data.surprise.type === 'heart-explosion' && renderHeartExplosion()}
              {data.surprise.type === 'affectionate-line' && renderAffectionateLine()}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                <Gift className="w-20 h-20" style={{ color: data.theme.accentColor }} />
              </motion.div>
              <p className="text-lg text-gray-600 mt-6">
                Something special is coming...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reveal Button (if not auto-revealed) */}
        {!showSurprise && data.surprise.delay === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReveal}
              className="px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all"
              style={{ 
                backgroundColor: data.theme.accentColor,
                boxShadow: `0 8px 25px -8px ${data.theme.accentColor}40`
              }}
            >
              Reveal Surprise
            </motion.button>
          </motion.div>
        )}

        {/* Continue Button */}
        <AnimatePresence>
          {showContinueButton && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all"
                style={{ 
                  backgroundColor: data.theme.primaryColor,
                  boxShadow: `0 8px 25px -8px ${data.theme.primaryColor}40`
                }}
              >
                Final Chapter
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default SurpriseSection;
