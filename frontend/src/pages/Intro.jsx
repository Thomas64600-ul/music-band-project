import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
  const sound = new Audio("/guitar.mp3");
  sound.play();

  
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, 2000);

  setTimeout(() => {
    navigate("/home"); 
  }, 1500);

  
  setSpinning(true);
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A]">
      <img
        src="/logo.png" 
        alt="Logo du groupe"
        onClick={handleClick}
        className={`w-48 h-48 cursor-pointer transition-transform duration-[3000ms] ${
          spinning ? "rotate-[720deg]" : "hover:scale-110"
        }`}
      />
    </div>
  );
}
