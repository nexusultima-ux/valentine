import { useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingHearts = () => {
  const isMobile = useIsMobile();
  
  const hearts = useMemo(() => {
    const count = isMobile ? 8 : 15;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      size: isMobile ? 10 + Math.random() * 10 : 12 + Math.random() * 16,
      opacity: 0.15 + Math.random() * 0.2,
    }));
  }, [isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float text-valentine-rose"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
