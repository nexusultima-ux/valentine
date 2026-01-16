import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FloatingHearts from "@/components/FloatingHearts";
import Sparkles from "@/components/Sparkles";
import { ValentineData, defaultValentineData } from "@/data/valentineData";

export default function Setup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ValentineData>(defaultValentineData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.recipientName && formData.senderName) {
      const encoded = encodeURIComponent(JSON.stringify(formData));
      navigate(`/personalize?data=${encoded}`);
    }
  };

  const updateFormData = (updates: Partial<ValentineData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-pink-50">
      <div
        className="absolute inset-0 opacity-85"
        style={{
          backgroundImage: "url(/paper-texture.jpg)",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}
      />

      <FloatingHearts />
      <Sparkles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 overflow-y-auto max-h-screen"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-8 text-center">
          Create Your Valentine Experience 💌
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/90 p-8 rounded-xl backdrop-blur shadow-xl">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-pink-600 mb-2">
                Your Name
              </label>
              <Input
                type="text"
                placeholder="From:"
                value={formData.senderName}
                onChange={(e) => updateFormData({ senderName: e.target.value })}
                className="border-pink-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-pink-600 mb-2">
                Their Name
              </label>
              <Input
                type="text"
                placeholder="To:"
                value={formData.recipientName}
                onChange={(e) => updateFormData({ recipientName: e.target.value })}
                className="border-pink-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              Nickname (optional)
            </label>
            <Input
              type="text"
              placeholder="Sweetheart, Love, etc."
              value={formData.nickname || ""}
              onChange={(e) => updateFormData({ nickname: e.target.value })}
              className="border-pink-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              Relationship Tone
            </label>
            <Select 
              value={formData.relationshipTone} 
              onValueChange={(value: any) => updateFormData({ relationshipTone: value })}
            >
              <SelectTrigger className="border-pink-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="romantic">Romantic 💕</SelectItem>
                <SelectItem value="playful">Playful 😊</SelectItem>
                <SelectItem value="soft">Soft & Gentle 🌸</SelectItem>
                <SelectItem value="poetic">Poetic ✨</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hero Section */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-pink-700">Opening Message</h3>
            <div>
              <label className="block text-sm font-medium text-pink-600 mb-2">
                Opening Line
              </label>
              <Input
                type="text"
                placeholder="For the one who makes my heart skip a beat..."
                value={formData.hero.openingLine}
                onChange={(e) => updateFormData({ 
                  hero: { ...formData.hero, openingLine: e.target.value }
                })}
                className="border-pink-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-pink-600 mb-2">
                Subtext
              </label>
              <Input
                type="text"
                placeholder="This is our story, written in love"
                value={formData.hero.subtext}
                onChange={(e) => updateFormData({ 
                  hero: { ...formData.hero, subtext: e.target.value }
                })}
                className="border-pink-200"
              />
            </div>
          </div>

          {/* Love Letter */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-pink-700">Love Letter</h3>
            <div>
              <label className="block text-sm font-medium text-pink-600 mb-2">
                Your Message
              </label>
              <Textarea
                placeholder="Write your heartfelt message..."
                value={formData.loveLetter.message}
                onChange={(e) => updateFormData({ 
                  loveLetter: { ...formData.loveLetter, message: e.target.value }
                })}
                rows={8}
                className="border-pink-200"
              />
            </div>
          </div>

          {/* Photo Memories */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-pink-700">Photo Memories</h3>
            <div>
              <label className="block text-sm font-medium text-pink-600 mb-2">
                Photo URLs (one per line)
              </label>
              <Textarea
                placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
                onChange={(e) => {
                  const urls = e.target.value.split('\n').filter(url => url.trim());
                  const photos = urls.map((url, index) => ({
                    id: `photo-${index}`,
                    url: url.trim(),
                    caption: `Memory ${index + 1}`
                  }));
                  updateFormData({ 
                    photoMemories: { ...formData.photoMemories, photos }
                  });
                }}
                rows={4}
                className="border-pink-200"
              />
            </div>
          </div>

          {/* Special Moments */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-pink-700">Special Moments</h3>
            <div>
              <label className="block text-sm font-medium text-pink-600 mb-2">
                Special Moments (one per line: title | description | date)
              </label>
              <Textarea
                placeholder="First Date | The day we met | Jan 15, 2023&#10;First Kiss | Under the stars | Feb 14, 2023"
                onChange={(e) => {
                  const lines = e.target.value.split('\n').filter(line => line.trim());
                  const moments = lines.map((line, index) => {
                    const [title, description, date] = line.split('|').map(s => s.trim());
                    return {
                      id: `moment-${index}`,
                      title: title || '',
                      description: description || '',
                      date: date || ''
                    };
                  }).filter(m => m.title);
                  updateFormData({ 
                    specialMoments: { ...formData.specialMoments, moments }
                  });
                }}
                rows={4}
                className="border-pink-200"
              />
            </div>
          </div>

          {/* Reasons */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-pink-700">Reasons I Love You</h3>
            <div>
              <label className="block text-sm font-medium text-pink-600 mb-2">
                Reasons (one per line)
              </label>
              <Textarea
                placeholder="Your smile lights up my world&#10;You make me a better person&#10;Your laugh is my favorite sound"
                onChange={(e) => {
                  const reasons = e.target.value.split('\n').filter(reason => reason.trim());
                  const items = reasons.map((reason, index) => ({
                    id: `reason-${index}`,
                    text: reason.trim()
                  }));
                  updateFormData({ 
                    reasons: { ...formData.reasons, items }
                  });
                }}
                rows={4}
                className="border-pink-200"
              />
            </div>
          </div>

          {/* Surprise */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-pink-700">Surprise Message</h3>
            <div>
              <label className="block text-sm font-medium text-pink-600 mb-2">
                Final Surprise Message
              </label>
              <Textarea
                placeholder="You are my everything, my always, my forever."
                value={formData.surprise.content}
                onChange={(e) => updateFormData({ 
                  surprise: { ...formData.surprise, content: e.target.value }
                })}
                rows={2}
                className="border-pink-200"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg"
          >
            Create Valentine Experience 💕
          </Button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-pink-500 text-sm mt-6"
        >
          Made with 💕 for creating unforgettable moments
        </motion.p>
      </motion.div>
    </div>
  );
}
