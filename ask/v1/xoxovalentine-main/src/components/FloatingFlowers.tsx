import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Flower {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  swayAmount: number;
  fallSpeed: number;
  opacity: number;
  type: 'rose' | 'petal' | 'cherry';
}

const FloatingFlowers = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    const generateFlower = (): Flower => {
      const types: ('rose' | 'petal' | 'cherry')[] = ['rose', 'petal', 'cherry'];
      return {
        id: Math.random(),
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 20 + 15,
        rotation: Math.random() * 360,
        swayAmount: Math.random() * 30 + 10,
        fallSpeed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        type: types[Math.floor(Math.random() * types.length)]
      };
    };

    const initialFlowers = Array.from({ length: 8 }, generateFlower);
    setFlowers(initialFlowers);

    const interval = setInterval(() => {
      setFlowers(prev => {
        const updated = prev.map(flower => ({
          ...flower,
          y: flower.y + flower.fallSpeed,
          rotation: flower.rotation + 1,
          x: flower.x + Math.sin(flower.y / 20) * flower.swayAmount / 10
        })).filter(flower => flower.y < 110);

        if (updated.length < 8 && Math.random() > 0.7) {
          updated.push(generateFlower());
        }

        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getFlowerEmoji = (type: 'rose' | 'petal' | 'cherry') => {
    switch (type) {
      case 'rose': return '🌹';
      case 'petal': return '🌸';
      case 'cherry': return '🌺';
      default: return '🌹';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            fontSize: `${flower.size}px`,
            opacity: flower.opacity,
            transform: `rotate(${flower.rotation}deg)`,
          }}
          animate={{
            x: Math.sin(flower.y / 20) * flower.swayAmount,
            rotate: flower.rotation + 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {getFlowerEmoji(flower.type)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingFlowers;
