import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FloatingHearts from "@/components/FloatingHearts";
import Sparkles from "@/components/Sparkles";

interface PersonalizedData {
  fromName: string;
  toName: string;
  message: string;
}

export default function Setup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PersonalizedData>({
    fromName: "",
    toName: "",
    message: "You're my inspiration, my light, and my everything. 💕",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.toName && formData.fromName) {
      const encoded = encodeURIComponent(
        JSON.stringify(formData)
      );
      navigate(`/personalize?data=${encoded}`);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-pink-50 flex items-center justify-center">
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
        className="relative z-10 w-full max-w-md mx-auto px-4 py-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-6 text-center">
          Create Your Valentine 💌
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 p-8 rounded-lg backdrop-blur">
          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              Your Name
            </label>
            <Input
              type="text"
              placeholder="From:"
              value={formData.fromName}
              onChange={(e) =>
                setFormData({ ...formData, fromName: e.target.value })
              }
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
              value={formData.toName}
              onChange={(e) =>
                setFormData({ ...formData, toName: e.target.value })
              }
              className="border-pink-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-pink-600 mb-2">
              Your Message (optional)
            </label>
            <Textarea
              placeholder="Write your special message..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="border-pink-200"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white"
          >
            Create Gift 🎁
          </Button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-pink-500 text-sm mt-6"
        >
          Made with 💕 for special moments
        </motion.p>
      </motion.div>
    </div>
  );
}
