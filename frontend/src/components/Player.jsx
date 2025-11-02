import { FaPlay, FaPause } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";

export default function Player({ src, title, artist, cover, musics = [] }) {
  const { currentTrack, isPlaying, playTrack, stopTrack } = usePlayer();
  const isCurrent = currentTrack?.url === src;

  const handlePlay = (e) => {
    e.stopPropagation();
    if (!src) return;

    if (isCurrent && isPlaying) stopTrack();
    else playTrack({ title, artist, cover_url: cover, url: src }, musics);
  };

  return (
    <div className="relative text-center bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)] rounded-xl p-4 border border-[var(--border)]">
      <div className="relative w-full h-40 overflow-hidden rounded-lg mb-4">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-[var(--accent)]/30 hover:bg-[var(--accent)]/50"
        >
          {isCurrent && isPlaying
            ? <FaPause size={40} className="text-[var(--gold)]" />
            : <FaPlay size={40} className="text-[var(--gold)]" />}
        </button>
      </div>
      <h3 className="text-lg font-semibold text-[var(--accent)]">{title}</h3>
      <p className="text-sm text-[var(--subtext)] italic">{artist}</p>
    </div>
  );
}






