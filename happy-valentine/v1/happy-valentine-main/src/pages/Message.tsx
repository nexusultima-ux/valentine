import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import Sparkles from "@/components/Sparkles";

export default function Message() {
  const navigate = useNavigate();

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

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-pink-600 mb-6">
            💝
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-pink-700 mb-6">
            You made my day even more special
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-pink-600 mb-4">
            Forever grateful for you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 space-y-3"
        >
          <p className="text-pink-500">
            Thank you for opening this gift.
          </p>
          <p className="text-pink-500">
            This was made just for you with all my care. 🌹
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 space-y-3"
        >
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-6 rounded-full"
          >
            Start Over 🔄
          </Button>
          <p className="text-pink-400 text-xs">
            Happy Valentine's Day 💌
          </p>
        </motion.div>
      </div>
    </div>
  );
}
