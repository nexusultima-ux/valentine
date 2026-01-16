export interface PhotoMemory {
  id: string;
  url: string;
  caption?: string;
  date?: string;
}

export interface SpecialMoment {
  id: string;
  title: string;
  description: string;
  date?: string;
  icon?: string;
}

export interface Reason {
  id: string;
  text: string;
  icon?: string;
}

export type RelationshipTone = 'romantic' | 'playful' | 'soft' | 'poetic';

export interface ValentineData {
  // People
  senderName: string;
  recipientName: string;
  nickname?: string;
  relationshipTone: RelationshipTone;

  // Hero Section
  hero: {
    openingLine: string;
    subtext: string;
    backgroundMusic?: string;
    startInteraction: 'tap' | 'click' | 'scroll';
  };

  // Love Letter Section
  loveLetter: {
    message: string;
    revealAnimation: 'typewriter' | 'fade' | 'slide';
  };

  // Photo Memories Section
  photoMemories: {
    photos: PhotoMemory[];
    layout: 'carousel' | 'grid' | 'floating-stack';
    showCaptions: boolean;
  };

  // Special Moments Section
  specialMoments: {
    moments: SpecialMoment[];
    showTimeline: boolean;
  };

  // Reasons I Love You Section
  reasons: {
    items: Reason[];
    revealStyle: 'one-by-one' | 'scroll-based';
  };

  // Surprise Moment
  surprise: {
    type: 'final-message' | 'confetti' | 'heart-explosion' | 'affectionate-line';
    content: string;
    delay: number; // seconds before reveal
  };

  // Closing Section
  closing: {
    finalAffirmation: string;
    senderSignature: string;
    endingAnimation: 'fade' | 'hearts' | 'sparkles';
  };

  // Theme & Styling
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
}

export const defaultValentineData: ValentineData = {
  senderName: "Your Name",
  recipientName: "My Love",
  nickname: "Sweetheart",
  relationshipTone: "romantic",

  hero: {
    openingLine: "For the one who makes my heart skip a beat...",
    subtext: "This is our story, written in love",
    backgroundMusic: "/music/valentine-song.mp3",
    startInteraction: "click"
  },

  loveLetter: {
    message: `My dearest love,

From the moment I met you, everything changed. 
You brought light into my world when I didn't even know it was dark.

Every day with you is a gift I treasure more than words can say.
Your smile is my favorite sight, your laugh is my favorite sound,
and your heart is my favorite home.

I love you more today than yesterday,
but not as much as tomorrow.

Forever yours,
always and completely.`,
    revealAnimation: "typewriter"
  },

  photoMemories: {
    photos: [],
    layout: "floating-stack",
    showCaptions: true
  },

  specialMoments: {
    moments: [],
    showTimeline: true
  },

  reasons: {
    items: [],
    revealStyle: "one-by-one"
  },

  surprise: {
    type: "heart-explosion",
    content: "You are my everything, my always, my forever.",
    delay: 2
  },

  closing: {
    finalAffirmation: "Happy Valentine's Day ❤️",
    senderSignature: "All my love, forever",
    endingAnimation: "hearts"
  },

  theme: {
    primaryColor: "#ec4899",
    secondaryColor: "#f9a8d4",
    accentColor: "#f472b6",
    fontFamily: "serif"
  }
};
