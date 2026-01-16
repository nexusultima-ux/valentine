import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  autoPlay?: boolean;
}

const BackgroundMusic = ({ autoPlay = true }: BackgroundMusicProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with dramatic romantic music
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.25;
    // Using local music file - Stephen Sanchez - Until I Found You
    audio.src = '/music/Stephen Sanchez - Until I Found You (Official Video) - StephenSanchezVEVO.mp3';
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
    if (!audio || !hasInteracted) return;

    if (autoPlay && !isPlaying) {
      const playPromise = audio.play();
      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            console.log('Audio play failed');
          });
      }
    }
  }, [autoPlay, isPlaying, hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleFirstInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      const audio = audioRef.current;
      if (audio) {
        audio.play().then(() => setIsPlaying(true));
      }
    }
  };

  useEffect(() => {
    // Add global click listener for first interaction
    const handleGlobalClick = () => {
      handleFirstInteraction();
    };
    
    if (!hasInteracted) {
      document.addEventListener('click', handleGlobalClick, { once: true });
    }
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="fixed top-6 left-6 z-50 px-4 py-2 rounded-full bg-valentine-rose/20 backdrop-blur-sm border border-valentine-rose/30 text-valentine-rose text-sm"
        >
          🎵 Click anywhere to start music
        </motion.div>
      )}
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
    </>
  );
};

export default BackgroundMusic;
