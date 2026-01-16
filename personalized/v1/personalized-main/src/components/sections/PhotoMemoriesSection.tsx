import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, Heart } from 'lucide-react';
import { ValentineData, PhotoMemory } from '@/data/valentineData';

interface PhotoMemoriesSectionProps {
  data: ValentineData;
  isActive: boolean;
  onComplete: () => void;
}

const PhotoMemoriesSection = ({ data, isActive, onComplete }: PhotoMemoriesSectionProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const photos = data.photoMemories.photos;

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (showContent && photos.length > 0) {
      const timer = setTimeout(() => setShowContinueButton(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [showContent, photos.length]);

  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const handleContinue = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // If no photos, skip this section
  if (photos.length === 0) {
    if (isActive) {
      onComplete();
    }
    return null;
  }

  if (!isActive) return null;

  const currentPhoto = photos[currentPhotoIndex];

  const renderCarousel = () => (
    <div className="relative max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
      >
        <img
          src={currentPhoto.url}
          alt={currentPhoto.caption || `Memory ${currentPhotoIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          </>
        )}

        {/* Photo Counter */}
        {photos.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-sm font-medium"
          >
            {currentPhotoIndex + 1} / {photos.length}
          </motion.div>
        )}

        {/* Caption */}
        {data.photoMemories.showCaptions && currentPhoto.caption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-4 left-4 right-4 text-white"
          >
            <p className="text-lg md:text-xl font-semibold drop-shadow-lg">
              {currentPhoto.caption}
            </p>
            {currentPhoto.date && (
              <p className="text-sm opacity-80 mt-1">{currentPhoto.date}</p>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Thumbnail Strip */}
      {photos.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-2 mt-4 justify-center overflow-x-auto pb-2"
        >
          {photos.map((photo, index) => (
            <motion.button
              key={photo.id}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentPhotoIndex ? 'ring-2 ring-offset-2' : 'opacity-60 hover:opacity-80'
              }`}
              style={{
                borderColor: index === currentPhotoIndex ? data.theme.accentColor : 'transparent',
                '--tw-ring-color': index === currentPhotoIndex ? data.theme.accentColor : 'transparent'
              } as React.CSSProperties}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={photo.url}
                alt={photo.caption || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );

  const renderGrid = () => (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="group relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={() => setCurrentPhotoIndex(index)}
          >
            <img
              src={photo.url}
              alt={photo.caption || `Memory ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Caption on hover */}
            {data.photoMemories.showCaptions && photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-semibold">{photo.caption}</p>
                {photo.date && <p className="text-sm opacity-80">{photo.date}</p>}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  const renderFloatingStack = () => (
    <div className="relative max-w-4xl mx-auto h-96 md:h-[500px]">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: Math.random() * 6 - 3,
            x: (index - photos.length / 2) * 40,
            y: (index - photos.length / 2) * 30
          }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.15,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: 0,
            zIndex: 50
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: index }}
        >
          <div className="relative w-48 h-64 md:w-64 md:h-80 rounded-lg overflow-hidden shadow-xl border-4 border-white">
            <img
              src={photo.url}
              alt={photo.caption || `Memory ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Polaroid-style bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-white p-2">
              {data.photoMemories.showCaptions && photo.caption && (
                <p className="text-xs text-gray-700 line-clamp-2">{photo.caption}</p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{
        background: `linear-gradient(135deg, ${data.theme.primaryColor}15, ${data.theme.secondaryColor}15)`,
      }}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <Camera 
              className="w-8 h-8" 
              style={{ color: data.theme.accentColor }} 
            />
          </motion.div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: data.theme.primaryColor,
              fontFamily: data.theme.fontFamily 
            }}
          >
            Our Beautiful Memories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every moment with you is a treasure I hold dear to my heart
          </p>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" 
               style={{ backgroundColor: data.theme.accentColor }} />
        </motion.div>

        {/* Photo Gallery */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              {data.photoMemories.layout === 'carousel' && renderCarousel()}
              {data.photoMemories.layout === 'grid' && renderGrid()}
              {data.photoMemories.layout === 'floating-stack' && renderFloatingStack()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContinueButton && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all"
                style={{ 
                  backgroundColor: data.theme.primaryColor,
                  boxShadow: `0 8px 25px -8px ${data.theme.primaryColor}40`
                }}
              >
                Continue Our Story
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default PhotoMemoriesSection;
