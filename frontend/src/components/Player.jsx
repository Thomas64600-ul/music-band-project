import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";

export default function Player({
  src,
  title = "Titre inconnu",
  artist = "Artiste inconnu",
  cover,
  onPlay,
}) {
  const { currentTrack, isPlaying, playTrack, stopTrack } = usePlayer();
  const [hover, setHover] = useState(false);

  const isCurrent = currentTrack?.url === src;

 
  const isSoundCloud = src?.includes("soundcloud.com");
  const isSpotify = src?.includes("spotify.com");
  const isPlayable =
    /\.(mp3|wav|ogg|flac)$/i.test(src || "") ||
    src?.includes("res.cloudinary.com");

  const handlePlay = () => {
    if (isSoundCloud || isSpotify) return; 
    if (isCurrent && isPlaying) {
      stopTrack();
    } else {
      playTrack({ title, artist, cover_url: cover, url: src });
      if (onPlay) onPlay();
    }
  };

  const extractSpotifyId = (url) => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : "";
  };

  return (
    <section
      role="group"
      aria-label={`Lecteur audio — ${title} par ${artist}`}
      className="
        w-full bg-[color-mix(in_oklab,var(--bg)_95%,black_5%)]
        rounded-xl border border-[var(--border)]
        shadow-[inset_0_0_10px_var(--accent)]
        p-4 sm:p-5 text-center
        flex flex-col items-center
        transition-all duration-300
        hover:shadow-[0_0_25px_var(--accent)]
      "
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
   
      {cover && (
        <div className="relative w-full h-40 sm:h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={cover}
            alt={`Pochette de ${title}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {!isSoundCloud && !isSpotify && (
            <button
              onClick={handlePlay}
              className="
                absolute inset-0 flex items-center justify-center 
                bg-[var(--accent)]/30 backdrop-blur-[2px]
                hover:bg-[var(--accent)]/50 transition-all duration-300
              "
            >
              {isCurrent && isPlaying ? (
                <FaPause size={40} className="text-[var(--gold)]" />
              ) : (
                <FaPlay size={40} className="text-[var(--gold)]" />
              )}
            </button>
          )}
        </div>
      )}

      <div className="mb-3">
        <h3 className="text-lg font-semibold text-[var(--accent)]">{title}</h3>
        <p className="text-sm text-[var(--subtext)] italic">{artist}</p>
      </div>

      {isSoundCloud && (
        <iframe
          title="SoundCloud"
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
            src
          )}&color=%23B3122D&auto_play=false&show_user=true`}
          className="rounded-lg border border-[var(--accent)]/40 shadow-[0_0_25px_var(--accent)]"
        ></iframe>
      )}

      {isSpotify && (
        <iframe
          title="Spotify"
          src={`https://open.spotify.com/embed/track/${extractSpotifyId(src)}?utm_source=generator`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="rounded-lg border border-[var(--accent)]/40 shadow-[0_0_25px_var(--accent)]"
        ></iframe>
      )}

      {isPlayable && !isSoundCloud && !isSpotify && (
        <div className="w-full bg-[var(--border)] h-1 rounded-full mt-3 relative overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-1 ${
              isCurrent && isPlaying
                ? "bg-gradient-to-r from-[var(--accent)] to-[var(--gold)] w-full animate-pulse"
                : "bg-[var(--border)] w-0"
            } transition-all duration-500`}
          ></div>
        </div>
      )}
    </section>
  );
}




