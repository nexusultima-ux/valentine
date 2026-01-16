import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const fireConfetti = () => {
    // First burst - center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E8A4B8', '#F8C8D8', '#FFD4E0', '#FFF0F3', '#C48B9F'],
    });

    // Left side burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E8A4B8', '#F8C8D8', '#FFD4E0', '#FFF0F3', '#C48B9F'],
      });
    }, 100);

    // Right side burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E8A4B8', '#F8C8D8', '#FFD4E0', '#FFF0F3', '#C48B9F'],
      });
    }, 200);

    // Heart-shaped confetti burst
    setTimeout(() => {
      const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0.5,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['heart'] as confetti.Shape[],
        colors: ['#E8A4B8', '#F8C8D8', '#C48B9F'],
      };

      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 2,
        origin: { y: 0.4 },
      });

      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 1.5,
        origin: { y: 0.5 },
      });
    }, 300);
  };

  return { fireConfetti };
};
