import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;

    audio.pause();
    audio.src = currentTrack.url;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
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

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!currentTrack) return;
    if (isPlaying) stopTrack();
    else playTrack(currentTrack, playlist);
  };

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          key="player"
          initial={{ opacity: 0, y: 80 }}
          animate={{
            opacity: isPlaying ? 1 : 0, 
            y: isPlaying ? 0 : 80,
            scale: isPlaying ? 1 : 0.95,
          }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`fixed bottom-[70px] inset-x-0 mx-auto w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%]
           border-2 rounded-2xl sm:rounded-3xl backdrop-blur-md z-[90]
           ${
           isPlaying
          ? "border-[var(--accent)] bg-[color-mix(in_oklab,var(--bg)_80%,black_20%)] player-pulse shadow-[0_0_25px_rgba(179,18,45,0.5)]"
          : "pointer-events-none"
          }
         `}

        >
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-3 
                       transition-all duration-500"
          >
          
            <div className="flex items-center gap-3 w-full sm:w-[40%] truncate justify-center sm:justify-start">
              {currentTrack.cover_url && (
                <img
                  src={currentTrack.cover_url}
                  alt={currentTrack.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover shadow-[0_0_10px_rgba(179,18,45,0.4)]"
                />
              )}
              <div className="text-center sm:text-left">
                <h3 className="text-sm sm:text-base font-semibold text-[var(--accent)] truncate">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-[var(--subtext)] italic truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6 my-2 sm:my-0">
              <button
                onClick={prevTrack}
                className="hover:scale-110 transition-transform"
              >
                <FaStepBackward size={14} className="text-[var(--accent)]" />
              </button>
              <button
                onClick={togglePlay}
                className="hover:scale-125 transition-transform"
              >
                {isPlaying ? (
                  <FaPause size={22} className="text-[var(--accent)]" />
                ) : (
                  <FaPlay size={22} className="text-[var(--accent)]" />
                )}
              </button>
              <button
                onClick={nextTrack}
                className="hover:scale-110 transition-transform"
              >
                <FaStepForward size={14} className="text-[var(--accent)]" />
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-[20%] justify-center sm:justify-end">
              <button onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? (
                  <FaVolumeMute size={16} className="text-[var(--accent)]" />
                ) : (
                  <FaVolumeUp size={16} className="text-[var(--accent)]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 sm:w-24 accent-[var(--accent)] cursor-pointer"
              />
            </div>
          </div>

<div className="relative w-[98%] mx-auto mt-[2px] h-[5px] rounded-full overflow-hidden bg-[color-mix(in_oklab,var(--border)_60%,black_40%)] shadow-[inset_0_0_6px_rgba(255,215,0,0.2)]">
  <motion.div
    className="absolute top-0 left-0 h-[5px] rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--gold)] to-[var(--accent)] shadow-[0_0_12px_var(--gold)]"
    style={{ width: `${progress}%` }}
    animate={{ width: `${progress}%` }}
    transition={{
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 0.4,
    }}
  />
</div>



          <audio ref={audioRef} preload="metadata" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}



