import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";

export default function PlayerGlobal() {
  const {
    playlist,
    currentTrack,
    isPlaying,
    playTrack,
    stopTrack,
    nextTrack,
    prevTrack,
  } = usePlayer();

  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);


  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

 
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
  }, [volume, isMuted]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.load(); 
    if (isPlaying) {
      audio.play().catch((err) =>
        console.warn("Lecture audio bloquée par le navigateur :", err)
      );
    }
  }, [currentTrack, isPlaying]);

  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () =>
      setProgress((audio.currentTime / audio.duration) * 100 || 0);

    const handleEnd = () => nextTrack();

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnd);
    };
  }, [nextTrack]);

  
  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) stopTrack();
    else playTrack(currentTrack, playlist);
  };

  const handleVolume = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    setIsMuted(value === 0);
  };

  const toggleMute = () => setIsMuted((v) => !v);

  if (!currentTrack) return null;

 
  const isPlayable =
    /(mp3|wav|ogg|flac)(\?.*)?$/i.test(currentTrack?.url || "") ||
    currentTrack?.url?.includes("res.cloudinary.com");

  return (
    <motion.div
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        fixed bottom-[70px] inset-x-0 mx-auto
        w-[96%] sm:w-[92%] md:w-[80%] lg:w-[65%]
        bg-[color-mix(in_oklab,var(--bg)_90%,black_10%)]
        border-t-2 border-[var(--accent)]
        shadow-[0_-2px_25px_rgba(179,18,45,0.4)]
        backdrop-blur-md
        rounded-t-2xl sm:rounded-t-xl
        z-[90]
        flex flex-col
        transition-all duration-500
      "
    >
  
      <div className="absolute inset-0 rounded-t-2xl bg-[var(--accent)]/10 blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between px-3 py-2 sm:px-6 relative z-10">
     
        <div className="flex items-center gap-3 w-[45%] sm:w-auto truncate">
          {currentTrack.cover_url && (
            <img
              src={currentTrack.cover_url}
              alt={currentTrack.title}
              className="w-10 h-10 rounded-md object-cover shadow-[0_0_8px_var(--accent)]"
            />
          )}
          <div className="truncate">
            <h3 className="text-sm sm:text-base font-semibold text-[var(--accent)] truncate">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-[var(--subtext)] italic truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={prevTrack}
            className="text-[var(--accent)] hover:text-[var(--gold)] transition-transform hover:scale-110"
          >
            <FaStepBackward size={14} className="sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="relative text-[var(--accent)] hover:text-[var(--gold)] transition-transform hover:scale-110"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full bg-[var(--accent)]/25 blur-sm animate-pulse"></span>
            )}
          </button>

          <button
            onClick={nextTrack}
            className="text-[var(--accent)] hover:text-[var(--gold)] transition-transform hover:scale-110"
          >
            <FaStepForward size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 w-[20%] justify-end">
          <button
            onClick={toggleMute}
            className="text-[var(--subtext)] hover:text-[var(--gold)]"
          >
            {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
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
      </div>

      <div className="relative w-full h-[3px] bg-[var(--border)] overflow-hidden">
        <div
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[var(--accent)] to-[var(--gold)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {isPlayable && (
        <audio ref={audioRef} src={currentTrack.url} preload="metadata" />
      )}
    </motion.div>
  );
}
