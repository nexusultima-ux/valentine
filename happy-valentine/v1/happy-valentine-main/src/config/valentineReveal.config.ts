export interface ValentineRevealConfig {
  senderName: string;
  receiverName: string;
  headline: string;
  mainMessage: string[];
  closingLine: string;
  greetingImage?: string;
  messageImage?: string;
  celebrationImage?: string;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const valentineRevealConfig: ValentineRevealConfig = {
  senderName: "Your Name",
  receiverName: "My Love",
  headline: "A Special Message Just For You 💌",
  mainMessage: [
    "From the moment I met you,",
    "my world became brighter.",
    "Every day with you is a gift,",
    "and I cherish every moment.",
    "You are my everything,",
    "my heart, my soul, my forever."
  ],
  closingLine: "Happy Valentine's Day ❤️",
  greetingImage: "/valentine-images/rose-bloom.gif",
  messageImage: "/valentine-images/heart-glow.jpg", 
  celebrationImage: "/valentine-images/love-fireworks.gif",
  themeColors: {
    primary: "#ec4899",
    secondary: "#f9a8d4", 
    accent: "#f472b6"
  }
};
