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
    <div className="w-full max-w-md bg-[#0A0A0A] border border-[#B3122D80] rounded-2xl shadow-[0_0_20px_#B3122D40] overflow-hidden flex flex-col items-center text-[#F2F2F2] transition-transform duration-300 hover:scale-[1.01]">
      {/* Image de couverture */}
      {cover && (
        <img
          src={cover}
          alt="cover"
          className="w-full h-48 object-cover border-b border-[#B3122D50]"
        />
      )}

      {/* Informations */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-[#B3122D] drop-shadow-[0_0_6px_#B3122D80]">
          {title}
        </h3>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>

      {/* Contrôles principaux */}
      <div className="flex items-center justify-center gap-6 py-3">
        {/* Lecture / Pause */}
        <button
          onClick={togglePlay}
          className={`relative text-[#B3122D] hover:text-[#FF4C4C] hover:scale-110 transition-transform duration-300 ${
            isPlaying ? "animate-pulse" : ""
          }`}
        >
          {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[#B3122D40] blur-md animate-pulse"></span>
          )}
        </button>

        {/* Mute */}
        <button
          onClick={toggleMute}
          className="text-gray-400 hover:text-[#B3122D] transition-colors duration-300"
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>

        {/* Volume */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="w-20 accent-[#B3122D]"
        />
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-[#1E1E1E] h-1 rounded-full mb-4 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-1 bg-[#B3122D] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Audio */}
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}

