import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ValentineExperience from "@/components/ValentineExperience";
import FloatingHearts from "@/components/FloatingHearts";

export default function Experience() {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);

  const handleExperienceComplete = () => {
    setIsComplete(true);
    setTimeout(() => navigate("/message"), 500);
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

      <div className="relative z-10">
        <ValentineExperience onComplete={handleExperienceComplete} />
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-20 text-pink-500 hover:text-pink-700 text-sm"
      >
        ← Back
      </motion.button>
    </div>
  );
}
