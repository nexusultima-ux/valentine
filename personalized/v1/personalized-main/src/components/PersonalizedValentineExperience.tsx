import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronUp } from 'lucide-react';
import HeroSection from './sections/HeroSection';
import LoveLetterSection from './sections/LoveLetterSection';
import PhotoMemoriesSection from './sections/PhotoMemoriesSection';
import SpecialMomentsSection from './sections/SpecialMomentsSection';
import ReasonsSection from './sections/ReasonsSection';
import SurpriseSection from './sections/SurpriseSection';
import ClosingSection from './sections/ClosingSection';
import { ValentineData, defaultValentineData } from '@/data/valentineData';

type Section = 'hero' | 'loveLetter' | 'photoMemories' | 'specialMoments' | 'reasons' | 'surprise' | 'closing';

interface PersonalizedValentineExperienceProps {
  valentineData?: Partial<ValentineData>;
  onComplete?: () => void;
}

const PersonalizedValentineExperience = ({ 
  valentineData: customData = {}, 
  onComplete 
}: PersonalizedValentineExperienceProps) => {
  // Merge custom data with defaults
  const data: ValentineData = {
    ...defaultValentineData,
    ...customData,
    // Deep merge nested objects
    hero: { ...defaultValentineData.hero, ...customData.hero },
    loveLetter: { ...defaultValentineData.loveLetter, ...customData.loveLetter },
    photoMemories: { ...defaultValentineData.photoMemories, ...customData.photoMemories },
    specialMoments: { ...defaultValentineData.specialMoments, ...customData.specialMoments },
    reasons: { ...defaultValentineData.reasons, ...customData.reasons },
    surprise: { ...defaultValentineData.surprise, ...customData.surprise },
    closing: { ...defaultValentineData.closing, ...customData.closing },
    theme: { ...defaultValentineData.theme, ...customData.theme }
  };

  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  // Define section order based on content availability
  const getSectionFlow = (): Section[] => {
    const flow: Section[] = ['hero'];
    
    if (data.loveLetter.message.trim()) {
      flow.push('loveLetter');
    }
    
    if (data.photoMemories.photos.length > 0) {
      flow.push('photoMemories');
    }
    
    if (data.specialMoments.moments.length > 0 && data.specialMoments.showTimeline) {
      flow.push('specialMoments');
    }
    
    if (data.reasons.items.length > 0) {
      flow.push('reasons');
    }
    
    flow.push('surprise', 'closing');
    return flow;
  };

  const sectionFlow = getSectionFlow();
  const currentSectionIndex = sectionFlow.indexOf(currentSection);

  const goToNextSection = useCallback(() => {
    if (currentSectionIndex < sectionFlow.length - 1) {
      setCurrentSection(sectionFlow[currentSectionIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSectionIndex, sectionFlow]);

  const goToPreviousSection = useCallback(() => {
    if (currentSectionIndex > 0) {
      setCurrentSection(sectionFlow[currentSectionIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSectionIndex, sectionFlow]);

  const handleSectionComplete = useCallback(() => {
    goToNextSection();
  }, [goToNextSection]);

  const handleRestart = useCallback(() => {
    setCurrentSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goToNextSection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToPreviousSection();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNextSection, goToPreviousSection]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setShowScrollIndicator(scrollY > 100);
      setCanScroll(scrollY + windowHeight < documentHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance for sections without content
  useEffect(() => {
    if (currentSection === 'photoMemories' && data.photoMemories.photos.length === 0) {
      const timer = setTimeout(goToNextSection, 500);
      return () => clearTimeout(timer);
    }
    if (currentSection === 'specialMoments' && (data.specialMoments.moments.length === 0 || !data.specialMoments.showTimeline)) {
      const timer = setTimeout(goToNextSection, 500);
      return () => clearTimeout(timer);
    }
    if (currentSection === 'reasons' && data.reasons.items.length === 0) {
      const timer = setTimeout(goToNextSection, 500);
      return () => clearTimeout(timer);
    }
  }, [currentSection, data, goToNextSection]);

  const getSectionProgress = () => {
    return ((currentSectionIndex + 1) / sectionFlow.length) * 100;
  };

  return (
    <div className="relative min-h-screen">
      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b"
        style={{ borderColor: data.theme.accentColor }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <span 
                className="text-sm font-medium"
                style={{ color: data.theme.primaryColor }}
              >
                Our Journey
              </span>
              <div className="text-xs text-gray-500">
                {currentSectionIndex + 1} of {sectionFlow.length}
              </div>
            </div>
            
            {/* Progress Dots */}
            <div className="flex items-center gap-2">
              {sectionFlow.map((section, index) => (
                <motion.div
                  key={section}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentSectionIndex 
                      ? '' 
                      : 'bg-gray-300'
                  }`}
                  style={{ 
                    backgroundColor: index <= currentSectionIndex ? data.theme.accentColor : undefined
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Progress Line */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-gray-200">
            <motion.div
              className="h-full"
              style={{ backgroundColor: data.theme.accentColor }}
              initial={{ width: '0%' }}
              animate={{ width: `${getSectionProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <AnimatePresence>
        {showScrollIndicator && (
          <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-2">
            {currentSectionIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={goToPreviousSection}
                className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-2 transition-all hover:scale-110"
                style={{ borderColor: data.theme.accentColor }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronUp className="w-5 h-5" style={{ color: data.theme.primaryColor }} />
              </motion.button>
            )}
            
            {currentSectionIndex < sectionFlow.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={goToNextSection}
                className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-2 transition-all hover:scale-110"
                style={{ borderColor: data.theme.accentColor }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowDown className="w-5 h-5" style={{ color: data.theme.primaryColor }} />
              </motion.button>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {currentSection === 'hero' && (
            <HeroSection 
              data={data} 
              isActive={true}
              onStart={handleSectionComplete}
            />
          )}
          
          {currentSection === 'loveLetter' && (
            <LoveLetterSection 
              data={data} 
              isActive={true}
              onComplete={handleSectionComplete}
            />
          )}
          
          {currentSection === 'photoMemories' && (
            <PhotoMemoriesSection 
              data={data} 
              isActive={true}
              onComplete={handleSectionComplete}
            />
          )}
          
          {currentSection === 'specialMoments' && (
            <SpecialMomentsSection 
              data={data} 
              isActive={true}
              onComplete={handleSectionComplete}
            />
          )}
          
          {currentSection === 'reasons' && (
            <ReasonsSection 
              data={data} 
              isActive={true}
              onComplete={handleSectionComplete}
            />
          )}
          
          {currentSection === 'surprise' && (
            <SurpriseSection 
              data={data} 
              isActive={true}
              onComplete={handleSectionComplete}
            />
          )}
          
          {currentSection === 'closing' && (
            <ClosingSection 
              data={data} 
              isActive={true}
              onComplete={onComplete}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, ${data.theme.primaryColor}20 0%, transparent 50%), 
                               radial-gradient(circle at 80% 70%, ${data.theme.secondaryColor}20 0%, transparent 50%)`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalizedValentineExperience;
