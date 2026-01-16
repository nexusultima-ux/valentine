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
import FloatingFlowers from './FloatingFlowers';
import DramaticLighting from './DramaticLighting';
import { useConfetti } from '@/hooks/useConfetti';
import { RotateCcw } from 'lucide-react';

type Moment = 'mystery' | 'memory' | 'tension' | 'vulnerable' | 'proposition' | 'reveal' | 'yes' | 'thinking';
type AnimalMood = 'curious' | 'watching' | 'excited' | 'hopeful' | 'joyful' | 'sad' | 'nervous';

const getMoodForMoment = (moment: Moment): AnimalMood => {
  switch (moment) {
    case 'mystery': return 'curious';
    case 'memory': return 'watching';
    case 'tension': return 'nervous';
    case 'vulnerable': return 'sad';
    case 'proposition': return 'hopeful';
    case 'reveal': return 'excited';
    case 'yes': return 'joyful';
    case 'thinking': return 'sad';
    default: return 'curious';
  }
};

// Dramatic and mysterious content
const content = {
  mystery: {
    text: "There's something I need to tell you...",
    subtext: "Something I've been holding inside for too long.",
    button: "I'm listening",
  },
  memory: {
    text: "Remember that day we met?",
    subtext: "Everything changed for me in that moment.",
    button: "I remember",
  },
  tension: {
    text: "Lately, I can't stop thinking about...",
    subtext: "...us.",
    button: "Go on",
  },
  vulnerable: {
    text: "I'm scared to say this but...",
    subtext: "...my heart won't let me stay silent anymore.",
    button: "Tell me",
  },
  proposition: {
    text: "I have a proposition for you...",
    subtext: "What if we made this February unforgettable?",
    yesButton: "I'm in 💕",
    thinkButton: "Let me think 🌹",
  },
  reveal: {
    text: "Will you be my Valentine?",
    subtext: "Let's create our own story.",
    yesButton: "Yes! 💖",
    thinkButton: "I need time 🥺",
  },
  yesResponse: {
    line1: "You just made my world complete 💕",
    line2: "This February will be ours forever.",
  },
  thinkingResponse: {
    line1: "I understand...",
    line2: "I'll be here, waiting with flowers.",
  },
};

const ValentineExperience = () => {
  const [moment, setMoment] = useState<Moment>('mystery');
  const [showButton, setShowButton] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const { fireConfetti } = useConfetti();

  const goToNext = (next: Moment) => {
    setShowButton(false);
    setShowSubtext(false);
    setShowLine2(false);
    setMoment(next);
  };

  const handleYesClick = useCallback(() => {
    fireConfetti();
    goToNext('yes');
  }, [fireConfetti]);

  const handleRestart = useCallback(() => {
    setShowButton(false);
    setShowSubtext(false);
    setShowLine2(false);
    setMoment('mystery');
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Paper texture background */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url(/paper-texture.jpg)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
          opacity: 0.95,
        }}
      />
      <div className="absolute inset-0 bg-background/20" />
      
      <DramaticLighting moment={moment} />
      <FoldedCorner />
      <BackgroundMusic />
      <Doodles />
      <FloatingHearts />
      <FloatingFlowers />
      <Sparkles />
      
      
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {moment === 'mystery' && (
            <motion.div
              key="mystery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-8 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="flex flex-col items-center justify-center gap-6 md:absolute md:top-[20%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-2deg] text-center">
                <p className="valentine-text text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-valentine-rose drop-shadow-lg animate-pulse">
                  <Typewriter 
                    text={content.mystery.text} 
                    speed={50}
                    onComplete={() => setShowSubtext(true)}
                  />
                </p>
              
              {showSubtext && (
                  <p className="valentine-text text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-valentine-deep md:rotate-[5deg] drop-shadow-md">
                    <Typewriter 
                      text={content.mystery.subtext}
                      speed={40}
                      onComplete={() => setShowButton(true)}
                    />
                  </p>
              )}
              </div>
              
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 2, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    className="md:absolute md:bottom-[25%] md:left-[50%] md:-translate-x-1/2"
                  >
                    <button
                      onClick={() => goToNext('memory')}
                      className="childish-button min-h-[48px] min-w-[140px] bg-valentine-rose hover:bg-valentine-deep border-2 border-valentine-deep text-white animate-bounce"
                    >
                      {content.mystery.button}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'memory' && (
            <motion.div
              key="memory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-6 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="flex flex-col items-center justify-center gap-6 md:absolute md:top-[15%] md:left-[50%] md:-translate-x-1/2 md:max-w-[70%] transform md:rotate-[1deg]">
                <p className="valentine-text text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-foreground">
                  <Typewriter 
                    text={content.memory.text}
                    delay={500}
                    speed={45}
                    onComplete={() => setShowSubtext(true)}
                  />
                </p>
              </div>
              
              {showSubtext && (
                <div className="md:absolute md:top-[28%] md:right-[15%] transform md:rotate-[-2deg]">
                  <p className="valentine-text text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-muted-foreground">
                    <Typewriter 
                      text={content.memory.subtext}
                      speed={40}
                      onComplete={() => setShowButton(true)}
                    />
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, rotate: 6, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: -3, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    className="md:absolute md:bottom-[30%] md:left-[40%]"
                  >
                    <button
                      onClick={() => goToNext('tension')}
                      className="childish-button-alt min-h-[48px] min-w-[140px]"
                    >
                      {content.memory.button}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'tension' && (
            <motion.div
              key="tension"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-8 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[18%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-1deg]">
                <p className="valentine-text text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground">
                  <Typewriter 
                    text={content.tension.text}
                    delay={800}
                    speed={60}
                    onComplete={() => setShowSubtext(true)}
                  />
                </p>
              </div>
              
              {showSubtext && (
                <div className="md:absolute md:top-[35%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[2deg]">
                  <p className="valentine-text text-xl sm:text-2xl md:text-4xl font-bold text-primary animate-pulse">
                    <Typewriter 
                      text={content.tension.subtext}
                      speed={80}
                      onComplete={() => setShowButton(true)}
                    />
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: 5 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
                    className="md:absolute md:bottom-[28%] md:right-[35%]"
                  >
                    <button
                      onClick={() => goToNext('vulnerable')}
                      className="childish-button min-h-[48px] min-w-[120px]"
                    >
                      {content.tension.button}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'vulnerable' && (
            <motion.div
              key="vulnerable"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center justify-center gap-8 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="flex flex-col items-center justify-center gap-6 md:absolute md:top-[18%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-2deg]">
                <p className="valentine-text text-xl sm:text-2xl md:text-4xl lg:text-5xl text-foreground">
                  <Typewriter 
                    text={content.vulnerable.text}
                    delay={1000}
                    speed={40}
                    onComplete={() => setShowSubtext(true)}
                  />
                </p>
              </div>
              
              {showSubtext && (
                <div className="md:absolute md:top-[32%] md:right-[20%] transform md:rotate-[1deg]">
                  <p className="valentine-text text-lg sm:text-xl md:text-3xl italic text-muted-foreground">
                    <Typewriter 
                      text={content.vulnerable.subtext}
                      speed={35}
                      onComplete={() => setShowButton(true)}
                    />
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 2 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 180 }}
                    className="md:absolute md:bottom-[25%] md:left-[30%]"
                  >
                    <button
                      onClick={() => goToNext('proposition')}
                      className="childish-button-alt min-h-[48px] min-w-[120px]"
                    >
                      {content.vulnerable.button}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'proposition' && (
            <motion.div
              key="proposition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center justify-center gap-10 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[15%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-1deg]">
                <p className="valentine-text text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-foreground">
                  <Typewriter 
                    text={content.proposition.text}
                    delay={1200}
                    speed={45}
                    onComplete={() => setShowSubtext(true)}
                  />
                </p>
              </div>
              
              {showSubtext && (
                <div className="md:absolute md:top-[33%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[1deg]">
                  <p className="valentine-text text-xl sm:text-2xl md:text-4xl italic text-primary">
                    <Typewriter 
                      text={content.proposition.subtext}
                      speed={50}
                      onComplete={() => setShowButton(true)}
                    />
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {showButton && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:block">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                      animate={{ opacity: 1, scale: 1, rotate: -2 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 200, delay: 0.2 }}
                      className="md:absolute md:bottom-[35%] md:left-[25%]"
                    >
                      <button
                        onClick={() => goToNext('reveal')}
                        className="childish-button text-xl sm:text-2xl md:text-3xl px-6 sm:px-8 py-3 sm:py-4 min-h-[56px] min-w-[140px]"
                      >
                        {content.proposition.yesButton}
                      </button>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: 8 }}
                      animate={{ opacity: 1, scale: 1, rotate: 3 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 200, delay: 0.4 }}
                      className="md:absolute md:bottom-[22%] md:right-[25%]"
                    >
                      <button
                        onClick={() => goToNext('thinking')}
                        className="childish-button-alt text-base sm:text-lg md:text-xl min-h-[48px] min-w-[160px]"
                      >
                        {content.proposition.thinkButton}
                      </button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {moment === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col items-center justify-center gap-10 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[18%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[-1deg]">
                <h1 className="valentine-text text-3xl sm:text-4xl md:text-7xl lg:text-9xl font-bold text-foreground">
                  <Typewriter 
                    text={content.reveal.text}
                    delay={1500}
                    speed={70}
                    onComplete={() => setShowSubtext(true)}
                  />
                </h1>
              </div>
              
              {showSubtext && (
                <div className="md:absolute md:top-[40%] md:left-[50%] md:-translate-x-1/2 transform md:rotate-[1deg]">
                  <p className="valentine-text text-xl sm:text-2xl md:text-3xl italic text-muted-foreground">
                    <Typewriter 
                      text={content.reveal.subtext}
                      speed={50}
                      onComplete={() => setShowButton(true)}
                    />
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {showButton && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:block">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
                      animate={{ opacity: 1, scale: 1, rotate: -3 }}
                      transition={{ duration: 0.8, type: "spring", stiffness: 200, delay: 0.3 }}
                      className="md:absolute md:bottom-[35%] md:left-[28%]"
                    >
                      <button
                        onClick={handleYesClick}
                        className="childish-button text-2xl sm:text-3xl md:text-4xl px-8 sm:px-10 py-4 sm:py-5 min-h-[64px] min-w-[160px]"
                      >
                        {content.reveal.yesButton}
                      </button>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.3, rotate: 15 }}
                      animate={{ opacity: 1, scale: 1, rotate: 5 }}
                      transition={{ duration: 0.8, type: "spring", stiffness: 200, delay: 0.5 }}
                      className="md:absolute md:bottom-[20%] md:right-[28%]"
                    >
                      <button
                        onClick={() => goToNext('thinking')}
                        className="childish-button-alt text-lg sm:text-xl md:text-2xl min-h-[52px] min-w-[180px]"
                      >
                        {content.reveal.thinkButton}
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
              transition={{ duration: 1 }}
              className="flex flex-col items-center justify-center gap-6 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[20%] md:left-[20%] transform md:rotate-[3deg]">
                <p className="valentine-text text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-primary">
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
                      animate={{ opacity: 1, scale: 1, rotate: [0, 15, -15, 8, 0] }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="text-6xl sm:text-7xl md:text-9xl md:absolute md:bottom-[30%] md:left-[50%] md:-translate-x-1/2"
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
              transition={{ duration: 1 }}
              className="flex flex-col items-center justify-center gap-6 px-6 text-center w-full max-w-2xl md:block md:absolute md:inset-0 md:px-0"
            >
              <div className="md:absolute md:top-[30%] md:left-[25%] transform md:rotate-[-3deg]">
                <p className="valentine-text text-xl sm:text-2xl md:text-4xl lg:text-5xl text-foreground">
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
                      animate={{ opacity: 0.8, y: [0, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl md:text-7xl md:absolute md:bottom-[35%] md:left-[50%] md:-translate-x-1/2"
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
