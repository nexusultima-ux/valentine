import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import Sparkles from "@/components/Sparkles";

export default function Landing() {
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-pink-600 mb-4">
            💌
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-pink-700 mb-6">
            Happy Valentine's Day
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-pink-600 mb-8">
            I've prepared something special for you...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12"
        >
          <Button
            size="lg"
            onClick={() => navigate("/experience")}
            className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-6 rounded-full"
          >
            Open My Gift 🎁
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-pink-500 text-sm mt-8"
        >
          Made with 💕 just for you
        </motion.p>
      </div>
    </div>
  );
}
