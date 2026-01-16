import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  animationType?: 'fade' | 'scale' | 'slide' | 'glow';
  delay?: number;
  onLoad?: () => void;
}

const AnimatedImage = ({ 
  src, 
  alt, 
  className = '', 
  animationType = 'fade',
  delay = 0,
  onLoad
}: AnimatedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setImageError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setImageError(true);
  };

  const getAnimationVariants = () => {
    switch (animationType) {
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.3 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const }
        };
      case 'slide':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const }
        };
      case 'glow':
        return {
          initial: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
          animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
          transition: { duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] as const }
        };
      default: // fade
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay }
        };
    }
  };

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-pink-100 rounded-lg ${className}`}>
        <span className="text-pink-400 text-4xl">🌹</span>
      </div>
    );
  }

  return (
    <motion.div
      {...getAnimationVariants()}
      className={`overflow-hidden rounded-lg ${className}`}
    >
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          filter: animationType === 'glow' ? 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))' : ''
        }}
      />
      {!isLoaded && !imageError && (
        <div className="absolute inset-0 bg-pink-100 animate-pulse" />
      )}
    </motion.div>
  );
};

export default AnimatedImage;
