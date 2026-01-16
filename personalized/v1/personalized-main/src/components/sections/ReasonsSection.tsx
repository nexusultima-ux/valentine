import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { ValentineData, Reason } from '@/data/valentineData';

interface ReasonsSectionProps {
  data: ValentineData;
  isActive: boolean;
  onComplete: () => void;
}

const ReasonsSection = ({ data, isActive, onComplete }: ReasonsSectionProps) => {
  const [showContent, setShowContent] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [visibleReasons, setVisibleReasons] = useState(0);
  
  const reasons = data.reasons.items;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // One-by-one reveal
  useEffect(() => {
    if (showContent && data.reasons.revealStyle === 'one-by-one' && reasons.length > 0) {
      const timer = setTimeout(() => {
        if (visibleReasons < reasons.length) {
          setVisibleReasons(prev => prev + 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showContent, visibleReasons, reasons.length, data.reasons.revealStyle]);

  // Scroll-based reveal
  useEffect(() => {
    if (isInView && data.reasons.revealStyle === 'scroll-based' && reasons.length > 0) {
      const timer = setTimeout(() => {
        setVisibleReasons(prev => Math.min(prev + 1, reasons.length));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, visibleReasons, reasons.length, data.reasons.revealStyle]);

  useEffect(() => {
    if (visibleReasons === reasons.length && reasons.length > 0) {
      const timer = setTimeout(() => setShowContinueButton(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [visibleReasons, reasons.length]);

  const handleContinue = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // If no reasons, skip this section
  if (reasons.length === 0) {
    if (isActive) {
      onComplete();
    }
    return null;
  }

  if (!isActive) return null;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'heart':
        return <Heart className="w-5 h-5" />;
      default:
        return <ArrowRight className="w-5 h-5" />;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{
        background: `linear-gradient(135deg, ${data.theme.primaryColor}20, ${data.theme.secondaryColor}20)`,
      }}
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4"
          >
            <Heart 
              className="w-8 h-8" 
              style={{ color: data.theme.accentColor }} 
            />
          </motion.div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: data.theme.primaryColor,
              fontFamily: data.theme.fontFamily 
            }}
          >
            Reasons I Love You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every day I discover new reasons to fall deeper in love with you
          </p>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" 
               style={{ backgroundColor: data.theme.accentColor }} />
        </motion.div>

        {/* Reasons List */}
        <div ref={containerRef} className="space-y-6">
          <AnimatePresence>
            {showContent && reasons.slice(0, visibleReasons).map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ 
                  duration: 0.6, 
                  delay: data.reasons.revealStyle === 'one-by-one' ? index * 0.2 : 0,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02, 
                  x: 10,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4"
                style={{ 
                  borderColor: data.theme.accentColor,
                  fontFamily: data.theme.fontFamily 
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: data.reasons.revealStyle === 'one-by-one' ? index * 0.2 + 0.3 : 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${data.theme.accentColor}20`,
                      color: data.theme.accentColor 
                    }}
                  >
                    {getIcon(reason.icon)}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: data.reasons.revealStyle === 'one-by-one' ? index * 0.2 + 0.4 : 0.4 
                      }}
                      className="text-xl font-bold mb-2"
                      style={{ color: data.theme.primaryColor }}
                    >
                      Reason #{index + 1}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: data.reasons.revealStyle === 'one-by-one' ? index * 0.2 + 0.5 : 0.5 
                      }}
                      className="text-gray-700 leading-relaxed text-lg"
                    >
                      {reason.text}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Scroll Indicator for scroll-based reveal */}
        {data.reasons.revealStyle === 'scroll-based' && visibleReasons < reasons.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 text-gray-500"
            >
              <span>Keep scrolling</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
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
                One More Surprise
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default ReasonsSection;
