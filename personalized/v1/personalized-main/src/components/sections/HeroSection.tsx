import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Music2, Heart, Sparkles } from 'lucide-react';
import { ValentineData } from '@/data/valentineData';

interface HeroSectionProps {
  data: ValentineData;
  onStart: () => void;
  isActive: boolean;
}

const HeroSection = ({ data, onStart, isActive }: HeroSectionProps) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [audio] = useState(() => {
    if (data.hero.backgroundMusic) {
      const audio = new Audio(data.hero.backgroundMusic);
      audio.loop = true;
      audio.volume = 0.3;
      return audio;
    }
    return null;
  });

  const toggleMusic = useCallback(() => {
    if (!audio) return;
    
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
    setIsMusicPlaying(!isMusicPlaying);
  }, [audio, isMusicPlaying]);

  const handleStart = useCallback(() => {
    if (data.hero.startInteraction === 'click' || data.hero.startInteraction === 'tap') {
      onStart();
    }
  }, [data.hero.startInteraction, onStart]);

  // Auto-show start button after delay
  useState(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowStartButton(true), 1500);
      return () => clearTimeout(timer);
    }
  });

  if (!isActive) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${data.theme.primaryColor}20, ${data.theme.secondaryColor}20)`,
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 animate-pulse">
          <Sparkles className="w-8 h-8 text-pink-300" />
        </div>
        <div className="absolute top-40 right-32 animate-pulse delay-1000">
          <Heart className="w-6 h-6 text-pink-400" />
        </div>
        <div className="absolute bottom-32 left-40 animate-pulse delay-500">
          <Sparkles className="w-10 h-10 text-pink-200" />
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse delay-1500">
          <Heart className="w-8 h-8 text-pink-300" />
        </div>
      </div>

      {/* Music Toggle */}
      {audio && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          onClick={toggleMusic}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors z-10"
          aria-label="Toggle music"
        >
          <AnimatePresence mode="wait">
            {isMusicPlaying ? (
              <Music2 key="playing" className="w-6 h-6 text-pink-600" />
            ) : (
              <Music key="paused" className="w-6 h-6 text-pink-400" />
            )}
          </AnimatePresence>
        </motion.button>
      )}

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ 
              color: data.theme.primaryColor,
              fontFamily: data.theme.fontFamily 
            }}
          >
            {data.hero.openingLine}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: data.theme.fontFamily }}
        >
          {data.hero.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg sm:text-xl text-gray-500 mb-8"
        >
          Created with love for <span className="font-semibold" style={{ color: data.theme.accentColor }}>
            {data.recipientName}
          </span>
          {data.nickname && (
            <span className="block text-base mt-2">
              <em>"{data.nickname}"</em>
            </span>
          )}
        </motion.div>

        {/* Start Button */}
        <AnimatePresence>
          {showStartButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleStart}
              className="px-8 py-4 rounded-full text-white font-semibold text-lg shadow-xl transition-all"
              style={{ 
                backgroundColor: data.theme.primaryColor,
                boxShadow: `0 10px 30px -10px ${data.theme.primaryColor}40`
              }}
            >
              Begin Our Story
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        {data.hero.startInteraction === 'scroll' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 rounded-full flex justify-center"
              style={{ borderColor: data.theme.accentColor }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 rounded-full"
                style={{ backgroundColor: data.theme.accentColor }}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default HeroSection;
