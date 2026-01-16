import { useRef, useCallback } from 'react';

// Pencil writing sound effect
const PENCIL_SOUND_URL = 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pencil-writing-on-paper-100408.mp3';

export const usePencilSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  const startSound = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(PENCIL_SOUND_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    
    if (!isPlayingRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Audio play failed (user interaction required)
      });
      isPlayingRef.current = true;
    }
  }, []);

  const stopSound = useCallback(() => {
    if (audioRef.current && isPlayingRef.current) {
      audioRef.current.pause();
      isPlayingRef.current = false;
    }
  }, []);

  return { startSound, stopSound };
};
