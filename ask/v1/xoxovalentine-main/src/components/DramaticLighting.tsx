import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DramaticLightingProps {
  moment: string;
}

const DramaticLighting = ({ moment }: DramaticLightingProps) => {
  const [lightingIntensity, setLightingIntensity] = useState(0);

  useEffect(() => {
    const getIntensityForMoment = (moment: string) => {
      switch (moment) {
        case 'mystery': return 0.3;
        case 'memory': return 0.2;
        case 'tension': return 0.5;
        case 'vulnerable': return 0.7;
        case 'proposition': return 0.6;
        case 'reveal': return 0.9;
        case 'yes': return 1;
        case 'thinking': return 0.4;
        default: return 0.1;
      }
    };

    const targetIntensity = getIntensityForMoment(moment);
    const duration = Math.abs(targetIntensity - lightingIntensity) * 2000;

    const timer = setTimeout(() => {
      setLightingIntensity(targetIntensity);
    }, 100);

    return () => clearTimeout(timer);
  }, [moment, lightingIntensity]);

  const getOverlayColor = () => {
    if (moment === 'tension' || moment === 'vulnerable') {
      return 'rgba(139, 0, 0, 0.1)'; // Subtle red tint for tension
    }
    if (moment === 'reveal' || moment === 'yes') {
      return 'rgba(255, 182, 193, 0.2)'; // Pink tint for romance
    }
    return 'rgba(0, 0, 0, 0.1)'; // Neutral dark
  };

  return (
    <>
      {/* Dramatic overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: getOverlayColor() }}
        animate={{ opacity: lightingIntensity }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
      </div>

      {/* Spotlight effect for key moments */}
      {(moment === 'reveal' || moment === 'proposition') && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-b from-yellow-200/20 to-transparent transform -translate-x-1/2" />
        </motion.div>
      )}

      {/* Pulse effect for tension moments */}
      {moment === 'tension' && (
        <motion.div
          className="absolute inset-0 pointer-events-none bg-red-900/10"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </>
  );
};

export default DramaticLighting;
