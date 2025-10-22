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
        w-full max-w-md 
        bg-gradient-to-b from-[color-mix(in_oklab,var(--surface)_95%,var(--bg)_5%)] to-[var(--bg)]
        border border-[color-mix(in_oklab,var(--border)_90%,var(--accent)_10%)]
        rounded-2xl shadow-[0_0_20px_color-mix(in_oklab,var(--accent)_25%,transparent)]
        overflow-hidden flex flex-col items-center text-[var(--text)]
        transition-transform duration-300 hover:scale-[1.015] 
        hover:shadow-[0_0_25px_color-mix(in_oklab,var(--accent)_40%,transparent)]
      "
    >
     
      {cover && (
        <div className="relative w-full">
          <img
            src={cover}
            alt={title}
            className="w-full h-48 object-cover border-b border-[var(--border)]"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--accent)_40%,transparent)] backdrop-blur-[2px] flex items-center justify-center animate-pulse">
              <FaPlay size={40} className="text-[var(--gold)]" />
            </div>
          )}
        </div>
      )}

      
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-[var(--gold)] drop-shadow-[0_0_6px_var(--gold)]">
          {title}
        </h3>
        <p className="text-sm text-[var(--subtext)] italic">{artist}</p>
      </div>

      
      <div className="flex items-center justify-center gap-6 py-3">
        
        <button
          onClick={togglePlay}
          className={`relative text-[var(--accent)] hover:text-[color-mix(in_oklab,var(--accent)_80%,var(--gold)_20%)] transition-all duration-300 ${
            isPlaying ? "scale-110" : "hover:scale-110"
          }`}
        >
          {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[color-mix(in_oklab,var(--accent)_35%,transparent)] blur-md animate-pulse"></span>
          )}
        </button>

       
        <button
          onClick={toggleMute}
          className="text-[var(--subtext)] hover:text-[var(--gold)] transition-colors duration-300"
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
          className="w-20 accent-[var(--accent)] cursor-pointer"
        />
      </div>

      
      <div className="w-full bg-[var(--border)] h-1 rounded-full mb-4 relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-1 
            bg-gradient-to-r from-[var(--accent)] to-[var(--gold)] 
            rounded-full transition-all duration-300 ${
              isPlaying ? "animate-progressPulse" : ""
            }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}


