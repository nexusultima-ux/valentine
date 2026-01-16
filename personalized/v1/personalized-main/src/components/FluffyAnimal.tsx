import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

type Mood = 'curious' | 'watching' | 'excited' | 'hopeful' | 'joyful' | 'sad';

interface EyeCircle {
  cx: number;
  cy: number;
  r: number;
}

interface EyeExpression {
  leftEye: string | EyeCircle;
  rightEye: string | EyeCircle;
  isArc: boolean;
  shine?: boolean;
}

interface FluffyAnimalProps {
  mood?: Mood;
}

const FluffyAnimal = ({ mood = 'curious' }: FluffyAnimalProps) => {
  const isMobile = useIsMobile();
  
  const size = isMobile ? 80 : 120;
  
  // Different expressions based on mood
  const getEyeExpression = (): EyeExpression => {
    switch (mood) {
      case 'joyful':
        return { leftEye: 'M22,28 Q25,25 28,28', rightEye: 'M38,28 Q41,25 44,28', isArc: true }; // Happy closed eyes
      case 'sad':
        return { leftEye: 'M22,30 Q25,33 28,30', rightEye: 'M38,30 Q41,33 44,30', isArc: true }; // Sad eyes
      case 'hopeful':
        return { leftEye: { cx: 25, cy: 28, r: 4 }, rightEye: { cx: 41, cy: 28, r: 4 }, isArc: false, shine: true }; // Big hopeful eyes
      case 'excited':
        return { leftEye: { cx: 25, cy: 28, r: 3.5 }, rightEye: { cx: 41, cy: 28, r: 3.5 }, isArc: false }; 
      default:
        return { leftEye: { cx: 25, cy: 28, r: 3 }, rightEye: { cx: 41, cy: 28, r: 3 }, isArc: false };
    }
  };

  const getMouth = () => {
    switch (mood) {
      case 'joyful':
        return 'M28,38 Q33,44 38,38'; // Big smile
      case 'sad':
        return 'M28,40 Q33,36 38,40'; // Sad mouth
      case 'hopeful':
        return 'M30,38 Q33,41 36,38'; // Small hopeful smile
      case 'excited':
        return 'M28,38 Q33,43 38,38'; // Excited smile
      default:
        return 'M30,38 Q33,40 36,38'; // Neutral small smile
    }
  };

  const eyeData = getEyeExpression();

  // Idle animations
  const idleAnimation = {
    y: [0, -3, 0],
  };

  const idleTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  const earWiggle = {
    rotate: [0, 5, -5, 3, 0],
  };

  const earTransition = {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  const hopAnimation = mood === 'joyful' ? {
    y: [0, -15, 0],
  } : idleAnimation;

  const hopTransition = mood === 'joyful' ? {
    duration: 0.5,
    repeat: Infinity,
    ease: "easeOut" as const,
  } : idleTransition;

  const blushOpacity = mood === 'hopeful' || mood === 'joyful' || mood === 'excited' ? 0.4 : 0.2;

  return (
    <motion.div
      className="pointer-events-none select-none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...hopAnimation
      }}
      transition={{ 
        duration: 0.6, 
        type: "spring",
        ...hopTransition,
      }}
      style={{ width: size, height: size * 1.2 }}
    >
      <svg 
        viewBox="0 0 66 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Left Ear */}
        <motion.g animate={earWiggle} transition={earTransition} style={{ transformOrigin: '20px 25px' }}>
          <ellipse 
            cx="18" cy="12" rx="8" ry="16" 
            fill="hsl(var(--valentine-blush))" 
            stroke="hsl(var(--foreground))" 
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Inner ear */}
          <ellipse 
            cx="18" cy="14" rx="4" ry="10" 
            fill="hsl(var(--valentine-pink))"
            opacity="0.5"
          />
        </motion.g>
        
        {/* Right Ear */}
        <motion.g 
          animate={{ rotate: earWiggle.rotate.map(r => -r) }} 
          transition={earTransition}
          style={{ transformOrigin: '46px 25px' }}
        >
          <ellipse 
            cx="48" cy="12" rx="8" ry="16" 
            fill="hsl(var(--valentine-blush))" 
            stroke="hsl(var(--foreground))" 
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Inner ear */}
          <ellipse 
            cx="48" cy="14" rx="4" ry="10" 
            fill="hsl(var(--valentine-pink))"
            opacity="0.5"
          />
        </motion.g>

        {/* Body - fluffy round shape */}
        <ellipse 
          cx="33" cy="50" rx="28" ry="22" 
          fill="hsl(var(--valentine-blush))" 
          stroke="hsl(var(--foreground))" 
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Head - overlapping body */}
        <circle 
          cx="33" cy="32" r="20" 
          fill="hsl(var(--valentine-blush))" 
          stroke="hsl(var(--foreground))" 
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Fluffy cheek tufts */}
        <path 
          d="M12,35 Q8,32 10,28" 
          stroke="hsl(var(--foreground))" 
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M54,35 Q58,32 56,28" 
          stroke="hsl(var(--foreground))" 
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Blush circles */}
        <circle cx="18" cy="34" r="5" fill="hsl(var(--valentine-pink))" opacity={blushOpacity} />
        <circle cx="48" cy="34" r="5" fill="hsl(var(--valentine-pink))" opacity={blushOpacity} />

        {/* Eyes */}
        {eyeData.isArc ? (
          <>
            <path 
              d={eyeData.leftEye as string} 
              stroke="hsl(var(--foreground))" 
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path 
              d={eyeData.rightEye as string} 
              stroke="hsl(var(--foreground))" 
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : (
          <>
            <circle 
              cx={(eyeData.leftEye as EyeCircle).cx} 
              cy={(eyeData.leftEye as EyeCircle).cy} 
              r={(eyeData.leftEye as EyeCircle).r} 
              fill="hsl(var(--foreground))"
            />
            <circle 
              cx={(eyeData.rightEye as EyeCircle).cx} 
              cy={(eyeData.rightEye as EyeCircle).cy} 
              r={(eyeData.rightEye as EyeCircle).r} 
              fill="hsl(var(--foreground))"
            />
            {/* Eye shine for hopeful */}
            {eyeData.shine && (
              <>
                <circle cx="26.5" cy="26.5" r="1.5" fill="white" />
                <circle cx="42.5" cy="26.5" r="1.5" fill="white" />
              </>
            )}
          </>
        )}

        {/* Nose */}
        <ellipse cx="33" cy="34" rx="3" ry="2" fill="hsl(var(--valentine-pink))" />

        {/* Mouth */}
        <path 
          d={getMouth()} 
          stroke="hsl(var(--foreground))" 
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Whiskers */}
        <path d="M14,33 L6,31" stroke="hsl(var(--foreground))" strokeWidth="1" strokeLinecap="round" />
        <path d="M14,36 L5,37" stroke="hsl(var(--foreground))" strokeWidth="1" strokeLinecap="round" />
        <path d="M52,33 L60,31" stroke="hsl(var(--foreground))" strokeWidth="1" strokeLinecap="round" />
        <path d="M52,36 L61,37" stroke="hsl(var(--foreground))" strokeWidth="1" strokeLinecap="round" />

        {/* Little heart for hopeful/joyful moods */}
        {(mood === 'hopeful' || mood === 'joyful') && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <path 
              d="M56,20 C56,17 60,17 60,20 C60,23 56,26 56,26 C56,26 52,23 52,20 C52,17 56,17 56,20Z" 
              fill="hsl(var(--valentine-rose))"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
            />
          </motion.g>
        )}

        {/* Feet */}
        <ellipse cx="22" cy="70" rx="8" ry="5" fill="hsl(var(--valentine-blush))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <ellipse cx="44" cy="70" rx="8" ry="5" fill="hsl(var(--valentine-blush))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
};

export default FluffyAnimal;
