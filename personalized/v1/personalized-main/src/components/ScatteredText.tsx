import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScatteredTextProps {
  children: ReactNode;
  rotate?: number;
  offsetX?: number;
  offsetY?: number;
  className?: string;
  delay?: number;
}

const ScatteredText = ({ 
  children, 
  rotate = 0, 
  offsetX = 0, 
  offsetY = 0, 
  className = '',
  delay = 0
}: ScatteredTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotate - 5 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate,
        x: offsetX,
        y: offsetY
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.34, 1.56, 0.64, 1] // bouncy
      }}
      className={`inline-block ${className}`}
      style={{
        transform: `rotate(${rotate}deg) translate(${offsetX}px, ${offsetY}px)`,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScatteredText;
