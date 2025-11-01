import { createContext, useContext, useState, useEffect, useCallback } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);              
  const [currentTrack, setCurrentTrack] = useState(null);    
  const [isPlaying, setIsPlaying] = useState(false);

  
  const playTrack = useCallback((track, list = []) => {
    if (!track) return;

   
    if (list.length) setPlaylist(list);

   
    setCurrentTrack((prev) => {
      if (prev && prev.url === track.url) {
        setIsPlaying((p) => !p);
        return prev;
      }
      setIsPlaying(true);
      return track;
    });
  }, []);

  const stopTrack = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const playNext = useCallback(() => {
    if (!playlist.length || !currentTrack) return;
    const index = playlist.findIndex((t) => t.url === currentTrack.url);
    const next = playlist[(index + 1) % playlist.length];
    setCurrentTrack(next);
    setIsPlaying(true);
  }, [playlist, currentTrack]);

  const playPrev = useCallback(() => {
    if (!playlist.length || !currentTrack) return;
    const index = playlist.findIndex((t) => t.url === currentTrack.url);
    const prev = playlist[(index - 1 + playlist.length) % playlist.length];
    setCurrentTrack(prev);
    setIsPlaying(true);
  }, [playlist, currentTrack]);

  useEffect(() => {
    const savedTrack = localStorage.getItem("currentTrack");
    const savedPlaylist = localStorage.getItem("playlist");
    const savedState = localStorage.getItem("isPlaying");

    if (savedTrack) setCurrentTrack(JSON.parse(savedTrack));
    if (savedPlaylist) setPlaylist(JSON.parse(savedPlaylist));
    if (savedState) setIsPlaying(savedState === "true");
  }, []);

  useEffect(() => {
    if (currentTrack)
      localStorage.setItem("currentTrack", JSON.stringify(currentTrack));
    if (playlist.length)
      localStorage.setItem("playlist", JSON.stringify(playlist));
    localStorage.setItem("isPlaying", isPlaying);
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
        playNext,
        playPrev,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
