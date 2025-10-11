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
    if (autoplay) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [autoplay]);

  return (
    <div className="w-full max-w-md bg-[#0B0F17] border border-[#1E1E1E] rounded-2xl shadow-lg overflow-hidden flex flex-col items-center text-[#F2F2F2]">
      
      {cover && (
        <img
          src={cover}
          alt="cover"
          className="w-full h-48 object-cover border-b border-[#1E1E1E]"
        />
      )}

     
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-[#FFD700]">{title}</h3>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>

      
      <div className="flex items-center justify-center gap-6 py-3">
        <button
          onClick={togglePlay}
          className={`relative text-[#FFD700] hover:scale-110 transition-transform duration-200 ${
            isPlaying ? "animate-glow" : ""
          }`}
        >
          {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[#FFD700]/20 blur-md animate-pulseGlow"></span>
          )}
        </button>

        <button
          onClick={toggleMute}
          className="text-gray-400 hover:text-[#FFD700] transition-colors"
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
          className="w-20 accent-[#FFD700]"
        />
      </div>

      
      <div className="w-full bg-gray-700 h-1 rounded-full mb-4 relative">
        <div
          className="absolute top-0 left-0 h-1 bg-[#FFD700] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

    
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}
