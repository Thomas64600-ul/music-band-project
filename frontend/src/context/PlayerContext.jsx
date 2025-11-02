import { createContext, useContext, useState, useEffect, useCallback } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = useCallback((track, list = []) => {
    if (!track?.url) return;
    if (list.length) setPlaylist(list);

    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const stopTrack = useCallback(() => setIsPlaying(false), []);

  const nextTrack = useCallback(() => {
    if (!playlist.length || !currentTrack) return;
    const index = playlist.findIndex((t) => t.url === currentTrack.url);
    const next = playlist[(index + 1) % playlist.length];
    setCurrentTrack(next);
    setIsPlaying(true);
  }, [playlist, currentTrack]);

  const prevTrack = useCallback(() => {
    if (!playlist.length || !currentTrack) return;
    const index = playlist.findIndex((t) => t.url === currentTrack.url);
    const prev = playlist[(index - 1 + playlist.length) % playlist.length];
    setCurrentTrack(prev);
    setIsPlaying(true);
  }, [playlist, currentTrack]);

  useEffect(() => {
    localStorage.setItem("currentTrack", JSON.stringify(currentTrack));
    localStorage.setItem("isPlaying", isPlaying);
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [currentTrack, playlist, isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        setPlaylist,
        currentTrack,
        isPlaying,
        playTrack,
        stopTrack,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);



