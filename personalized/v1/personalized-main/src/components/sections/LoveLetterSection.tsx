import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, PenTool } from 'lucide-react';
import Typewriter from '@/components/Typewriter';
import { ValentineData } from '@/data/valentineData';

interface LoveLetterSectionProps {
  data: ValentineData;
  isActive: boolean;
  onComplete: () => void;
}

const LoveLetterSection = ({ data, isActive, onComplete }: LoveLetterSectionProps) => {
  const [showContent, setShowContent] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleLetterComplete = useCallback(() => {
    setShowContinueButton(true);
    setLetterRevealed(true);
  }, []);

  const handleContinue = useCallback(() => {
    onComplete();
  }, [onComplete]);

  if (!isActive) return null;

  const messageLines = data.loveLetter.message.split('\n');

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
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <PenTool 
              className="w-8 h-8" 
              style={{ color: data.theme.accentColor }} 
            />
          </motion.div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ 
              color: data.theme.primaryColor,
              fontFamily: data.theme.fontFamily 
            }}
          >
            A Letter From My Heart
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" 
               style={{ backgroundColor: data.theme.accentColor }} />
        </motion.div>

        {/* Letter Content */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -top-8 -left-8 text-6xl opacity-20"
              >
                <Heart style={{ color: data.theme.primaryColor }} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute -bottom-8 -right-8 text-6xl opacity-20"
              >
                <Heart style={{ color: data.theme.primaryColor }} />
              </motion.div>

              {/* Letter Paper */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border-2 relative overflow-hidden"
                style={{ 
                  borderColor: data.theme.accentColor,
                  fontFamily: data.theme.fontFamily 
                }}
              >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" 
                       style={{ 
                         backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, ${data.theme.primaryColor}20 35px, ${data.theme.primaryColor}20 70px)` 
                       }} 
                  />
                </div>

                {/* Letter Content */}
                <div className="relative z-10">
                  {data.loveLetter.revealAnimation === 'typewriter' ? (
                    <div className="space-y-4">
                      {messageLines.map((line, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700"
                        >
                          {line.trim() === '' ? (
                            <br />
                          ) : (
                            <Typewriter
                              text={line}
                              speed={30}
                              delay={index * 200}
                              onComplete={index === messageLines.length - 1 ? handleLetterComplete : undefined}
                            />
                          )}
                        </motion.p>
                      ))}
                    </div>
                  ) : data.loveLetter.revealAnimation === 'fade' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="space-y-4"
                    >
                      {messageLines.map((line, index) => (
                        <p key={index} className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700">
                          {line || <br />}
                        </p>
                      ))}
                    </motion.div>
                  ) : (
                    // slide animation
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      className="space-y-4"
                    >
                      {messageLines.map((line, index) => (
                        <motion.p
                          key={index}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                          className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700"
                        >
                          {line || <br />}
                        </motion.p>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Signature */}
                <AnimatePresence>
                  {letterRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="mt-8 text-right"
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
                        className="inline-block"
                      >
                        <p 
                          className="text-xl sm:text-2xl font-semibold italic"
                          style={{ color: data.theme.primaryColor }}
                        >
                          {data.senderName}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
              className="text-center mt-12"
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

export default LoveLetterSection;
