import { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio());

  const audio = audioRef.current;

  const playTrack = (track, albumTracks) => {
    if (!track.audioSrc) return;
    setQueue(albumTracks.filter((t) => t.audioSrc));
    const idx = albumTracks.findIndex((t) => t.id === track.id);
    setCurrentIndex(idx >= 0 ? idx : 0);
    audio.src = track.audioSrc;
    audio.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!queue.length) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const next = () => {
    if (!queue.length) return;
    const nextIdx = (currentIndex + 1) % queue.length;
    setCurrentIndex(nextIdx);
    audio.src = queue[nextIdx].audioSrc;
    audio.play();
    setIsPlaying(true);
  };

  const prev = () => {
    if (!queue.length) return;
    const prevIdx = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIdx);
    audio.src = queue[prevIdx].audioSrc;
    audio.play();
    setIsPlaying(true);
  };

  const seek = (time) => {
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const setVolumeLevel = (level) => {
    setVolume(level);
    audio.volume = level;
  };

  useEffect(() => {
    audio.volume = volume;
  }, [audio, volume]);

  useEffect(() => {
    if (!queue.length) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      next();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, queue, currentIndex]);

  useEffect(() => {
    if (queue.length > 0) {
      audio.src = queue[currentIndex]?.audioSrc || "";
    }
  }, [currentIndex, queue, audio]);

  const value = {
    queue,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    playTrack,
    togglePlay,
    next,
    prev,
    seek,
    setVolumeLevel,
    currentTrack: queue[currentIndex] || null,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return context;
};
