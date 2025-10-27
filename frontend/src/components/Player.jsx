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
        w-full
        bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
        rounded-xl border border-[var(--border)]
        shadow-[inset_0_0_10px_var(--accent)]
        p-4 sm:p-5 text-center
        flex flex-col items-center
        transition-all duration-300
        hover:shadow-[0_0_20px_var(--accent)]
      "
    >
 
      {cover && (
        <div className="relative w-full h-40 sm:h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-[var(--accent)]/30 backdrop-blur-[2px] flex items-center justify-center">
              <FaPlay size={40} className="text-[var(--gold)] animate-pulse" />
            </div>
          )}
        </div>
      )}

     
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-[var(--accent)]">
          {title}
        </h3>
        <p className="text-sm text-[var(--subtext)] italic">{artist}</p>
      </div>

  
      <div className="flex items-center justify-center gap-6 py-2">
    
        <button
          onClick={togglePlay}
          className={`relative text-[var(--accent)] hover:text-[var(--gold)] transition-transform duration-300 ${
            isPlaying ? "scale-110" : "hover:scale-110"
          }`}
        >
          {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[var(--accent)]/30 blur-md animate-pulse"></span>
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

     
      <div className="w-full bg-[var(--border)] h-1 rounded-full mt-2 mb-1 relative overflow-hidden">
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



