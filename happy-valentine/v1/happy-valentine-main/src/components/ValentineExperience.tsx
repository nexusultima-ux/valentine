import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Sparkles from './Sparkles';
import BackgroundMusic from './BackgroundMusic';
import Typewriter from './Typewriter';
import Doodles from './Doodles';
import FoldedCorner from './FoldedCorner';
import AnimatedImage from './AnimatedImage';
import { useConfetti } from '@/hooks/useConfetti';
import { RotateCcw } from 'lucide-react';
import { valentineRevealConfig } from '@/config/valentineReveal.config';

interface ValentineExperienceProps {
  onComplete?: () => void;
}

type Moment = 'greeting' | 'message' | 'closing';

const ValentineExperience = ({ onComplete }: ValentineExperienceProps) => {
  const [moment, setMoment] = useState<Moment>('greeting');
  const [showButton, setShowButton] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const { fireConfetti } = useConfetti();

  const goToNext = (next: Moment) => {
    setShowButton(false);
    setMessageIndex(0);
    setMoment(next);
  };

  const handleRestart = useCallback(() => {
    setShowButton(false);
    setMessageIndex(0);
    setMoment('greeting');
  }, []);

  const handleComplete = useCallback(() => {
    fireConfetti();
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
  }, [fireConfetti, onComplete]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Paper texture background */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url(/paper-texture.jpg)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          opacity: 0.85,
        }}
      />
      <div className="absolute inset-0 bg-background/30" />
      
      <FoldedCorner />
      <BackgroundMusic />
      <Doodles />
      <FloatingHearts />
      <Sparkles />
      
      
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {moment === 'greeting' && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-8 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[15%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-2deg]">
                <AnimatedImage
                  src={valentineRevealConfig.greetingImage || ''}
                  alt="Valentine greeting"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4"
                  animationType="scale"
                  delay={0.3}
                />
              </div>

              <div className="md:absolute md:top-[35%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-2deg]">
                <h1 className="valentine-text text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                  <Typewriter 
                    text={`Hi ${valentineRevealConfig.receiverName} 💌`}
                    speed={60}
                    onComplete={() => setShowButton(true)}
                  />
                </h1>
              </div>
              
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, rotate: -5, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 3, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    className="md:absolute md:bottom-[25%] md:left-[50%] md:-translate-x-1/2"
                  >
                    <button
                      onClick={() => goToNext('message')}
                      className="childish-button min-h-[48px] min-w-[140px] text-lg"
                      style={{ 
                        backgroundColor: valentineRevealConfig.themeColors.primary,
                        borderColor: valentineRevealConfig.themeColors.secondary
                      }}
                    >
                      Open My Heart
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'message' && (
            <motion.div
              key="message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-6 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[10%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[1deg] md:max-w-[80%]">
                <h2 className="valentine-text text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold mb-4" 
                    style={{ color: valentineRevealConfig.themeColors.primary }}>
                  {valentineRevealConfig.headline}
                </h2>
              </div>

              <div className="md:absolute md:top-[20%] md:right-[15%] transform md:rotate-[-3deg]">
                <AnimatedImage
                  src={valentineRevealConfig.messageImage || ''}
                  alt="Valentine message"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
                  animationType="glow"
                  delay={0.5}
                />
              </div>

              {valentineRevealConfig.mainMessage.slice(0, messageIndex + 1).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                  className={`md:absolute md:left-[50%] md:-translate-x-1/2 transform ${
                    index === 0 ? 'md:top-[30%] md:rotate-[-2deg]' :
                    index === 1 ? 'md:top-[38%] md:rotate-[1deg]' :
                    index === 2 ? 'md:top-[46%] md:rotate-[-1deg]' :
                    index === 3 ? 'md:top-[54%] md:rotate-[2deg]' :
                    index === 4 ? 'md:top-[62%] md:rotate-[-2deg]' :
                    'md:top-[70%] md:rotate-[1deg]'
                  }`}
                >
                  <p className="valentine-text text-lg sm:text-xl md:text-3xl lg:text-4xl text-foreground italic">
                    {index === messageIndex ? (
                      <Typewriter 
                        text={line}
                        speed={50}
                        onComplete={() => {
                          if (messageIndex < valentineRevealConfig.mainMessage.length - 1) {
                            setTimeout(() => setMessageIndex(prev => prev + 1), 800);
                          } else {
                            setShowButton(true);
                          }
                        }}
                      />
                    ) : (
                      line
                    )}
                  </p>
                </motion.div>
              ))}
              
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 4 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    className="md:absolute md:bottom-[15%] md:left-[50%] md:-translate-x-1/2"
                  >
                    <button
                      onClick={() => goToNext('closing')}
                      className="childish-button-alt min-h-[48px] min-w-[120px] text-lg"
                      style={{ 
                        backgroundColor: valentineRevealConfig.themeColors.accent,
                        borderColor: valentineRevealConfig.themeColors.secondary
                      }}
                    >
                      Forever Yours
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'closing' && (
            <motion.div
              key="closing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              className="flex flex-col items-center justify-center gap-8 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[15%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[2deg]">
                <AnimatedImage
                  src={valentineRevealConfig.celebrationImage || ''}
                  alt="Valentine celebration"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-4"
                  animationType="scale"
                  delay={0.2}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4"
                >
                  💕
                </motion.div>
                <h2 className="valentine-text text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold" 
                    style={{ color: valentineRevealConfig.themeColors.primary }}>
                  <Typewriter 
                    text={valentineRevealConfig.closingLine}
                    speed={70}
                    onComplete={handleComplete}
                  />
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="md:absolute md:top-[50%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-1deg]"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2"
                  style={{ borderColor: valentineRevealConfig.themeColors.accent }}
                >
                  <p className="valentine-text text-xl sm:text-2xl md:text-4xl lg:text-5xl text-foreground">
                    With all my love,<br/>
                    <motion.span 
                      className="font-semibold inline-block"
                      style={{ color: valentineRevealConfig.themeColors.primary }}
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {valentineRevealConfig.senderName}
                    </motion.span>
                  </p>
                </motion.div>
              </motion.div>
              
              <AnimatePresence>
                {showButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.4 }}
                    onClick={handleRestart}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] md:absolute md:bottom-[12%] md:left-[50%] md:-translate-x-1/2 px-4 py-2 rounded-full border-2"
                    style={{ 
                      borderColor: valentineRevealConfig.themeColors.secondary,
                      color: valentineRevealConfig.themeColors.primary
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw size={18} />
                    <span className="text-lg font-handwritten">Watch Again</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ValentineExperience;
