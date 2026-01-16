import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

// Pencil writing sound
const PENCIL_SOUND_URL = 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pencil-writing-on-paper-100408.mp3';

const Typewriter = ({ text, delay = 0, speed = 50, className = '', onComplete }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasCompletedRef = useRef(false);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(PENCIL_SOUND_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
      // Start pencil sound
      audioRef.current?.play().catch(() => {});
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Stop sound and trigger complete
      audioRef.current?.pause();
      if (!hasCompletedRef.current && onComplete) {
        hasCompletedRef.current = true;
        onComplete();
      }
    }
  }, [displayedText, text, speed, started, onComplete]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {displayedText}
      {started && displayedText.length < text.length && (
        <span className="inline-block w-0.5 h-[1em] bg-current animate-pulse ml-0.5 align-middle" />
      )}
    </motion.span>
  );
};

export default Typewriter;
