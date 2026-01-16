import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ValentineExperience from "@/components/ValentineExperience";
import FloatingHearts from "@/components/FloatingHearts";
import { motion } from "framer-motion";

interface PersonalizedData {
  fromName: string;
  toName: string;
  message: string;
}

export default function Personalize() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState<PersonalizedData | null>(null);

  useEffect(() => {
    const encoded = searchParams.get("data");
    if (encoded) {
      try {
        const decoded = JSON.parse(decodeURIComponent(encoded));
        setData(decoded);
      } catch (e) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [searchParams, navigate]);

  if (!data) {
    return <div>Loading...</div>;
  }

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
        <ValentineExperience
          personalized={{
            toName: data.toName,
            fromName: data.fromName,
            message: data.message,
          }}
        />
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-20 text-pink-500 hover:text-pink-700 text-sm"
      >
        ← Create Another
      </motion.button>
    </div>
  );
}
