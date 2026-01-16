import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, Star } from 'lucide-react';
import { ValentineData, SpecialMoment } from '@/data/valentineData';

interface SpecialMomentsSectionProps {
  data: ValentineData;
  isActive: boolean;
  onComplete: () => void;
}

const SpecialMomentsSection = ({ data, isActive, onComplete }: SpecialMomentsSectionProps) => {
  const [showContent, setShowContent] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [visibleMoments, setVisibleMoments] = useState(0);

  const moments = data.specialMoments.moments;

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (showContent && moments.length > 0) {
      const timer = setTimeout(() => {
        if (visibleMoments < moments.length) {
          setVisibleMoments(prev => prev + 1);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showContent, visibleMoments, moments.length]);

  useEffect(() => {
    if (visibleMoments === moments.length && moments.length > 0) {
      const timer = setTimeout(() => setShowContinueButton(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [visibleMoments, moments.length]);

  const handleContinue = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // If no moments or timeline disabled, skip this section
  if (moments.length === 0 || !data.specialMoments.showTimeline) {
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
      case 'star':
        return <Star className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
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
        background: `linear-gradient(180deg, ${data.theme.secondaryColor}10, ${data.theme.primaryColor}10)`,
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
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <Calendar 
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
            Our Special Moments
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each milestone in our journey together is a memory I cherish forever
          </p>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" 
               style={{ backgroundColor: data.theme.accentColor }} />
        </motion.div>

        {/* Timeline */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-0.5"
                   style={{ backgroundColor: data.theme.accentColor }} />

              {/* Timeline Items */}
              <div className="space-y-12">
                {moments.slice(0, visibleMoments).map((moment, index) => (
                  <motion.div
                    key={moment.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.2 + 0.3,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 bg-white flex items-center justify-center z-10"
                      style={{ 
                        borderColor: data.theme.accentColor,
                        color: data.theme.accentColor 
                      }}
                    >
                      {getIcon(moment.icon)}
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + 0.4 
                      }}
                      className={`ml-20 md:ml-0 md:w-5/12 ${
                        index % 2 === 0 ? 'md:mr-auto md:ml-8' : 'md:ml-auto md:mr-8'
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 h-full"
                        style={{ borderColor: data.theme.accentColor }}
                      >
                        <h3 
                          className="text-xl font-bold mb-2"
                          style={{ 
                            color: data.theme.primaryColor,
                            fontFamily: data.theme.fontFamily 
                          }}
                        >
                          {moment.title}
                        </h3>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {moment.description}
                        </p>
                        {moment.date && (
                          <p 
                            className="text-sm font-medium"
                            style={{ color: data.theme.accentColor }}
                          >
                            {moment.date}
                          </p>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContinueButton && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="text-center mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all"
                style={{ 
                  backgroundColor: data.theme.accentColor,
                  boxShadow: `0 8px 25px -8px ${data.theme.accentColor}40`
                }}
              >
                Continue Our Journey
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default SpecialMomentsSection;
