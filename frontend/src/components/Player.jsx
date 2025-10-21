import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function Player({
  src,
  title = "Titre inconnu",
  artist = "Artiste inconnu",
  cover,
  autoplay = false,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  
  const handleVolume = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    audioRef.current.volume = value;
    setIsMuted(value === 0);
  };

  
  useEffect(() => {
    if (autoplay && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [autoplay]);

  return (
    <div
      className="
        w-full max-w-md bg-gradient-to-b from-[#0B0F17] to-[#0A0A0A]
        border border-[#B3122D80] rounded-2xl shadow-[0_0_20px_#B3122D30]
        overflow-hidden flex flex-col items-center text-[#F2F2F2]
        transition-transform duration-300 hover:scale-[1.015] hover:shadow-[0_0_25px_#B3122D60]
      "
    >
     
      {cover && (
        <div className="relative w-full">
          <img
            src={cover}
            alt={title}
            className="w-full h-48 object-cover border-b border-[#B3122D50]"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-[#B3122D50]/30 backdrop-blur-[2px] flex items-center justify-center animate-pulse">
              <FaPlay size={40} className="text-[#FFD700]" />
            </div>
          )}
        </div>
      )}

      
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-[#FFD700] drop-shadow-[0_0_6px_#FFD70040]">
          {title}
        </h3>
        <p className="text-sm text-gray-400 italic">{artist}</p>
      </div>

      
      <div className="flex items-center justify-center gap-6 py-3">
        <button
          onClick={togglePlay}
          className={`relative text-[#B3122D] hover:text-[#FF4C4C] transition-all duration-300 ${
            isPlaying ? "scale-110" : "hover:scale-110"
          }`}
        >
          {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[#B3122D40] blur-md animate-pulse"></span>
          )}
        </button>

        <button
          onClick={toggleMute}
          className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="w-20 accent-[#B3122D] cursor-pointer"
        />
      </div>

     
      <div className="w-full bg-[#1E1E1E] h-1 rounded-full mb-4 relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-1 bg-gradient-to-r from-[#B3122D] to-[#FFD700] rounded-full transition-all duration-300 ${
            isPlaying ? "animate-progressPulse" : ""
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}

