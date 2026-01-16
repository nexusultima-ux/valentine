import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const allDoodles = [
  // Hearts
  { id: 1, type: 'heart', x: '5%', y: '10%', size: 40, rotate: -15, delay: 0.5, mobile: true },
  { id: 2, type: 'heart', x: '90%', y: '25%', size: 35, rotate: 20, delay: 1.2, mobile: true },
  { id: 3, type: 'heart', x: '15%', y: '75%', size: 45, rotate: -8, delay: 0.8, mobile: false },
  { id: 4, type: 'heart', x: '85%', y: '70%', size: 30, rotate: 12, delay: 1.5, mobile: false },
  
  // Stars
  { id: 5, type: 'star', x: '8%', y: '40%', size: 35, rotate: 10, delay: 0.3, mobile: true },
  { id: 6, type: 'star', x: '92%', y: '50%', size: 40, rotate: -20, delay: 1.0, mobile: false },
  { id: 7, type: 'star', x: '75%', y: '8%', size: 30, rotate: 5, delay: 0.6, mobile: true },
  
  // Arrows - less on mobile
  { id: 9, type: 'arrow', x: '12%', y: '55%', size: 50, rotate: 25, delay: 0.9, mobile: false },
  { id: 10, type: 'arrow', x: '88%', y: '85%', size: 45, rotate: -30, delay: 1.1, mobile: false },
  
  // Squiggles
  { id: 11, type: 'squiggle', x: '3%', y: '30%', size: 60, rotate: 0, delay: 0.4, mobile: false },
  { id: 12, type: 'squiggle', x: '95%', y: '40%', size: 55, rotate: 180, delay: 1.4, mobile: false },
  
  // Flowers
  { id: 13, type: 'flower', x: '25%', y: '5%', size: 45, rotate: 15, delay: 0.7, mobile: true },
  { id: 14, type: 'flower', x: '80%', y: '90%', size: 40, rotate: -10, delay: 1.6, mobile: false },
  { id: 15, type: 'flower', x: '5%', y: '85%', size: 35, rotate: 25, delay: 1.0, mobile: true },
  
  // Exclamation marks
  { id: 16, type: 'exclamation', x: '70%', y: '15%', size: 35, rotate: -8, delay: 0.6, mobile: false },
  { id: 17, type: 'exclamation', x: '18%', y: '60%', size: 30, rotate: 12, delay: 1.3, mobile: false },
  
  // Underlines - skip on mobile
  { id: 18, type: 'underline', x: '30%', y: '95%', size: 80, rotate: -2, delay: 0.8, mobile: false },
  { id: 19, type: 'underline', x: '60%', y: '3%', size: 70, rotate: 3, delay: 1.1, mobile: false },
  
  // Spirals
  { id: 20, type: 'spiral', x: '93%', y: '60%', size: 35, rotate: 0, delay: 0.9, mobile: false },
  { id: 21, type: 'spiral', x: '3%', y: '50%', size: 30, rotate: 45, delay: 1.4, mobile: false },
];

const HeartDoodle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 88C50 88 10 60 10 35C10 20 22 10 35 10C42 10 48 14 50 20C52 14 58 10 65 10C78 10 90 20 90 35C90 60 50 88 50 88Z"
      stroke="hsl(var(--primary))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="4 6"
      fill="none"
    />
  </svg>
);

const StarDoodle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 5L58 38L95 38L65 58L75 95L50 72L25 95L35 58L5 38L42 38Z"
      stroke="hsl(var(--accent))"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="3 5"
      fill="none"
    />
  </svg>
);

const ArrowDoodle = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 30C5 30 25 32 45 28C65 24 85 30 95 30"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    <path
      d="M80 20L95 30L80 40"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SquiggleDoodle = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.3} viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 15C15 5 25 25 35 15C45 5 55 25 65 15C75 5 85 25 95 15"
      stroke="hsl(var(--primary) / 0.5)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const FlowerDoodle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Petals */}
    <ellipse cx="50" cy="30" rx="12" ry="20" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 4" />
    <ellipse cx="70" cy="50" rx="20" ry="12" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 4" />
    <ellipse cx="50" cy="70" rx="12" ry="20" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 4" />
    <ellipse cx="30" cy="50" rx="20" ry="12" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 4" />
    {/* Center */}
    <circle cx="50" cy="50" r="10" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
    <circle cx="50" cy="50" r="4" fill="hsl(var(--accent))" />
  </svg>
);

const ExclamationDoodle = ({ size }: { size: number }) => (
  <svg width={size * 0.4} height={size} viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 10C18 20 22 25 20 35C18 45 22 50 20 60"
      stroke="hsl(var(--foreground))"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="20" cy="80" r="6" fill="hsl(var(--foreground))" />
  </svg>
);

const UnderlineDoodle = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.2} viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 10C15 8 25 14 35 10C45 6 55 16 65 10C75 4 85 14 95 10"
      stroke="hsl(var(--primary) / 0.6)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const SpiralDoodle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 50C50 45 55 40 60 40C70 40 75 50 75 55C75 70 60 80 50 80C30 80 20 60 20 50C20 25 45 10 60 10C85 10 100 35 100 55"
      stroke="hsl(var(--muted-foreground) / 0.5)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const DoodleComponent = ({ type, size }: { type: string; size: number }) => {
  switch (type) {
    case 'heart':
      return <HeartDoodle size={size} />;
    case 'star':
      return <StarDoodle size={size} />;
    case 'arrow':
      return <ArrowDoodle size={size} />;
    case 'squiggle':
      return <SquiggleDoodle size={size} />;
    case 'flower':
      return <FlowerDoodle size={size} />;
    case 'exclamation':
      return <ExclamationDoodle size={size} />;
    case 'underline':
      return <UnderlineDoodle size={size} />;
    case 'spiral':
      return <SpiralDoodle size={size} />;
    default:
      return null;
  }
};

const Doodles = () => {
  const isMobile = useIsMobile();
  
  const doodles = isMobile 
    ? allDoodles.filter(d => d.mobile).map(d => ({ ...d, size: d.size * 0.7 }))
    : allDoodles;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {doodles.map((doodle) => (
        <motion.div
          key={doodle.id}
          initial={{ opacity: 0, scale: 0, rotate: doodle.rotate - 20 }}
          animate={{ 
            opacity: isMobile ? 0.35 : 0.5, 
            scale: 1, 
            rotate: doodle.rotate,
          }}
          transition={{
            delay: doodle.delay,
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="absolute"
          style={{
            left: doodle.x,
            top: doodle.y,
          }}
        >
          <motion.div
            animate={{
              rotate: [doodle.rotate - 2, doodle.rotate + 2, doodle.rotate - 2],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <DoodleComponent type={doodle.type} size={doodle.size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Doodles;
