import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    // Joue un son (optionnel, si tu as un fichier public/guitar.mp3)
    const sound = new Audio("/public/guitar.mp3");
    sound.play();

    // Lance l'animation
    setSpinning(true);

    // Redirection après 1,5 s
    setTimeout(() => {
      navigate("/home"); // ou "/music" selon ton choix
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A]">
      <img
        src="/public/logo.png" // 🔹 Mets ton vrai logo ici (dans /public)
        alt="Logo du groupe"
        onClick={handleClick}
        className={`w-48 h-48 cursor-pointer transition-transform duration-[1500ms] ${
          spinning ? "rotate-[720deg]" : "hover:scale-110"
        }`}
      />
    </div>
  );
}
