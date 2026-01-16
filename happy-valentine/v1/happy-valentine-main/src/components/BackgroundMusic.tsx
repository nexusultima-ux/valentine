import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  autoPlay?: boolean;
}

const BackgroundMusic = ({ autoPlay = true }: BackgroundMusicProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a soft romantic piano track
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3;
    // Using a royalty-free soft piano ambient track
    audio.src = 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3?filename=sweet-love-116012.mp3';
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (autoPlay && !isPlaying) {
      // Attempt to play - browsers may block autoplay
      const playPromise = audio.play();
      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked, wait for user interaction
            const handleInteraction = () => {
              audio.play().then(() => setIsPlaying(true));
              document.removeEventListener('click', handleInteraction);
            };
            document.addEventListener('click', handleInteraction, { once: true });
          });
      }
    }
  }, [autoPlay, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      onClick={toggleMute}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-valentine-blush/30 backdrop-blur-sm border border-valentine-rose/20 text-valentine-rose hover:bg-valentine-blush/50 transition-all duration-300"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default BackgroundMusic;
