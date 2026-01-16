import { motion } from 'framer-motion';

const FoldedCorner = () => {
  return (
    <>
      {/* Top-right folded corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-0 right-0 z-20 pointer-events-none"
      >
        {/* The fold triangle */}
        <div 
          className="w-16 h-16 md:w-24 md:h-24"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, hsl(var(--background)) 50%)',
            boxShadow: '-2px 2px 4px hsl(var(--foreground) / 0.1)',
          }}
        />
        {/* The shadow underneath */}
        <div 
          className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--foreground) / 0.15) 50%, transparent 50%)',
          }}
        />
        {/* Curled paper effect */}
        <div 
          className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 origin-top-right"
          style={{
            background: 'linear-gradient(315deg, hsl(35 40% 90%) 0%, hsl(35 30% 85%) 100%)',
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            boxShadow: 'inset -1px 1px 3px hsl(var(--foreground) / 0.1)',
          }}
        />
      </motion.div>

      {/* Bottom-left smaller fold for "passed note" feel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-0 left-0 z-20 pointer-events-none"
      >
        <div 
          className="w-10 h-10 md:w-14 md:h-14"
          style={{
            background: 'linear-gradient(315deg, transparent 50%, hsl(var(--background)) 50%)',
            boxShadow: '2px -2px 4px hsl(var(--foreground) / 0.08)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 origin-bottom-left"
          style={{
            background: 'linear-gradient(135deg, hsl(35 40% 88%) 0%, hsl(35 30% 83%) 100%)',
            clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
            boxShadow: 'inset 1px -1px 2px hsl(var(--foreground) / 0.1)',
          }}
        />
      </motion.div>
    </>
  );
};

export default FoldedCorner;
