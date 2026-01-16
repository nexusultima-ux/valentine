import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Sparkles from './Sparkles';
import BackgroundMusic from './BackgroundMusic';
import Typewriter from './Typewriter';
import ScatteredText from './ScatteredText';
import Doodles from './Doodles';
import FoldedCorner from './FoldedCorner';
import FluffyAnimal from './FluffyAnimal';
import { useConfetti } from '@/hooks/useConfetti';
import { RotateCcw } from 'lucide-react';

type Moment = 'curiosity' | 'context' | 'anticipation' | 'question' | 'yes' | 'thinking';
type AnimalMood = 'curious' | 'watching' | 'excited' | 'hopeful' | 'joyful' | 'sad';

const getMoodForMoment = (moment: Moment): AnimalMood => {
  switch (moment) {
    case 'curiosity': return 'curious';
    case 'context': return 'watching';
    case 'anticipation': return 'excited';
    case 'question': return 'hopeful';
    case 'yes': return 'joyful';
    case 'thinking': return 'sad';
    default: return 'curious';
  }
};

// Customizable text content
const content = {
  curiosity: {
    text: "Hey… I made something for you.",
    button: "Open it",
  },
  context: {
    line1: "I didn't know the perfect way to ask you this…",
    line2: "So I made this.",
    button: "Okay…",
  },
  anticipation: {
    text: "So here goes…",
    button: "Tell me",
  },
  question: {
    text: "Will you be my Valentine?",
    yesButton: "Yes 💖",
    thinkButton: "Let me think 🥺",
  },
  yesResponse: {
    line1: "You just made my day 💕",
    line2: "Happy Valentine's in advance.",
  },
  thinkingResponse: {
    line1: "That's okay…",
    line2: "I'll be right here.",
  },
};

const ValentineExperience = () => {
  const [moment, setMoment] = useState<Moment>('curiosity');
  const [showButton, setShowButton] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const { fireConfetti } = useConfetti();

  const goToNext = (next: Moment) => {
    setShowButton(false);
    setShowLine2(false);
    setMoment(next);
  };

  const handleYesClick = useCallback(() => {
    fireConfetti();
    goToNext('yes');
  }, [fireConfetti]);

  const handleRestart = useCallback(() => {
    setShowButton(false);
    setShowLine2(false);
    setMoment('curiosity');
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Paper texture background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(/paper-texture.jpg)`,
          opacity: 0.9,
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
          {moment === 'curiosity' && (
            <motion.div
              key="curiosity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-8 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[20%] md:left-[15%] transform md:rotate-[-3deg]">
                <p className="valentine-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
                  <Typewriter 
                    text={content.curiosity.text} 
                    speed={60}
                    onComplete={() => setShowButton(true)}
                  />
                </p>
              </div>
              
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, rotate: -5, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 3, scale: 1 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                    className="md:absolute md:bottom-[30%] md:right-[25%]"
                  >
                    <button
                      onClick={() => goToNext('context')}
                      className="childish-button min-h-[48px] min-w-[120px]"
                    >
                      {content.curiosity.button}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'context' && (
            <motion.div
              key="context"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-6 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[15%] md:right-[12%] md:max-w-[60%] md:text-right transform md:rotate-[2deg]">
                <p className="valentine-text text-xl sm:text-2xl md:text-3xl text-foreground">
                  <Typewriter 
                    text={content.context.line1}
                    delay={300}
                    speed={45}
                    onComplete={() => setShowLine2(true)}
                  />
                </p>
              </div>
              
              {showLine2 && (
                <div className="md:absolute md:top-[35%] md:left-[20%] transform md:rotate-[-4deg]">
                  <p className="valentine-text text-xl sm:text-2xl md:text-3xl italic text-muted-foreground">
                    <Typewriter 
                      text={content.context.line2}
                      speed={50}
                      onComplete={() => setShowButton(true)}
                    />
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, rotate: 5, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: -2, scale: 1 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                    className="md:absolute md:bottom-[25%] md:left-[35%]"
                  >
                    <button
                      onClick={() => goToNext('anticipation')}
                      className="childish-button-alt min-h-[48px] min-w-[100px]"
                    >
                      {content.context.button}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'anticipation' && (
            <motion.div
              key="anticipation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-8 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[40%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-2deg]">
                <p className="valentine-text text-2xl sm:text-3xl md:text-4xl text-foreground animate-wobble">
                  <Typewriter 
                    text={content.anticipation.text}
                    speed={80}
                    onComplete={() => setShowButton(true)}
                  />
                </p>
              </div>
              
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotate: -8 }}
                    animate={{ opacity: 1, y: 0, rotate: 4 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                    className="md:absolute md:bottom-[30%] md:right-[30%]"
                  >
                    <button
                      onClick={() => goToNext('question')}
                      className="childish-button min-h-[48px] min-w-[120px]"
                    >
                      {content.anticipation.button}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-10 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[25%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-1deg]">
                <h1 className="valentine-text text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                  <Typewriter 
                    text={content.question.text}
                    delay={500}
                    speed={70}
                    onComplete={() => setShowButton(true)}
                  />
                </h1>
              </div>
              
              <AnimatePresence>
                {showButton && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:block">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: -3 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 200, delay: 0.1 }}
                      className="md:absolute md:bottom-[35%] md:left-[30%]"
                    >
                      <button
                        onClick={handleYesClick}
                        className="childish-button text-xl sm:text-2xl md:text-3xl px-6 sm:px-8 py-3 sm:py-4 min-h-[56px] min-w-[140px]"
                      >
                        {content.question.yesButton}
                      </button>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 5 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 200, delay: 0.3 }}
                      className="md:absolute md:bottom-[22%] md:right-[28%]"
                    >
                      <button
                        onClick={() => goToNext('thinking')}
                        className="childish-button-alt text-base sm:text-lg md:text-xl min-h-[48px] min-w-[160px]"
                      >
                        {content.question.thinkButton}
                      </button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'yes' && (
            <motion.div
              key="yes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-6 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[20%] md:left-[20%] transform md:rotate-[3deg]">
                <p className="valentine-text text-2xl sm:text-3xl md:text-5xl font-bold text-primary">
                  <Typewriter 
                    text={content.yesResponse.line1}
                    speed={50}
                    onComplete={() => setShowLine2(true)}
                  />
                </p>
              </div>
              
              {showLine2 && (
                <div className="md:absolute md:top-[40%] md:right-[15%] transform md:rotate-[-2deg]">
                  <p className="valentine-text text-xl sm:text-2xl md:text-3xl italic text-muted-foreground">
                    <Typewriter 
                      text={content.yesResponse.line2}
                      speed={45}
                      onComplete={() => setShowButton(true)}
                    />
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {showButton && (
                  <div className="flex flex-col items-center gap-6 md:block">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 5, 0] }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="text-6xl sm:text-7xl md:text-8xl md:absolute md:bottom-[30%] md:left-[50%] md:-translate-x-1/2"
                    >
                      💕
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      onClick={handleRestart}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] md:absolute md:bottom-[12%] md:left-[50%] md:-translate-x-1/2"
                      style={{ fontFamily: 'var(--font-handwritten)' }}
                    >
                      <RotateCcw size={18} />
                      <span className="text-lg">Start over?</span>
                    </motion.button>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'thinking' && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-6 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[30%] md:left-[25%] transform md:rotate-[-3deg]">
                <p className="valentine-text text-xl sm:text-2xl md:text-4xl text-foreground">
                  <Typewriter 
                    text={content.thinkingResponse.line1}
                    speed={60}
                    onComplete={() => setShowLine2(true)}
                  />
                </p>
              </div>
              
              {showLine2 && (
                <div className="md:absolute md:top-[45%] md:right-[20%] transform md:rotate-[2deg]">
                  <p className="valentine-text text-lg sm:text-xl md:text-3xl italic text-muted-foreground">
                    <Typewriter 
                      text={content.thinkingResponse.line2}
                      speed={50}
                      onComplete={() => setShowButton(true)}
                    />
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {showButton && (
                  <div className="flex flex-col items-center gap-6 md:block">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8, y: [0, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-5xl md:text-6xl md:absolute md:bottom-[35%] md:left-[50%] md:-translate-x-1/2"
                    >
                      🥺
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      onClick={handleRestart}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] md:absolute md:bottom-[15%] md:left-[50%] md:-translate-x-1/2"
                      style={{ fontFamily: 'var(--font-handwritten)' }}
                    >
                      <RotateCcw size={18} />
                      <span className="text-lg">Try again?</span>
                    </motion.button>
                  </div>
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
