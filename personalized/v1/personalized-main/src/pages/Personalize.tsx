import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PersonalizedValentineExperience from "@/components/PersonalizedValentineExperience";
import FloatingHearts from "@/components/FloatingHearts";
import { motion } from "framer-motion";
import { ValentineData } from "@/data/valentineData";

export default function Personalize() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [valentineData, setValentineData] = useState<ValentineData | null>(null);

  useEffect(() => {
    const encoded = searchParams.get("data");
    if (encoded) {
      try {
        const decoded = JSON.parse(decodeURIComponent(encoded));
        setValentineData(decoded);
      } catch (e) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [searchParams, navigate]);

  if (!valentineData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your Valentine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-85"
        style={{
          backgroundImage: "url(/paper-texture.jpg)",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}
      />

      {/* Ambient Effects */}
      <FloatingHearts />

      {/* Main Experience */}
      <div className="relative z-10">
        <PersonalizedValentineExperience
          valentineData={valentineData}
          onComplete={() => {
            // Optional: Handle completion
            console.log("Valentine experience completed");
          }}
        />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-20 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-2 text-pink-600 hover:text-pink-700 hover:bg-white transition-all text-sm font-medium"
        style={{ borderColor: valentineData?.theme?.accentColor || "#f472b6" }}
      >
        ← Create Another
      </motion.button>
    </div>
  );
}
