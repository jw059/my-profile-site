import { usePlayer } from "../context/PlayerContext";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import styles from "../styles/Player.module.css";

const formatTime = (secs) => {
  if (!secs || !Number.isFinite(secs)) return "0:00";
  const mins = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${mins}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function Player() {
  const {
    queue,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    next,
    prev,
    seek,
    setVolumeLevel,
    currentTrack,
  } = usePlayer();

  if (!queue.length) return null;

  const track = queue[currentIndex];
  if (!track) return null;

  return (
    <div className={styles.player}>
      <div className={styles.inner}>
        <div className={styles.info}>
          {track && (
            <>
              <div className={styles.title}>{track.title}</div>
              <div className={styles.duration}>{track.duration}</div>
            </>
          )}
        </div>

        <div className={styles.controls}>
          <button
            onClick={prev}
            className={styles.btn}
            title="Previous track"
            aria-label="Previous track"
          >
            <FaStepBackward size={16} />
          </button>
          <button
            onClick={togglePlay}
            className={`${styles.btn} ${styles.play}`}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <FaPause size={20} />
            ) : (
              <FaPlay size={20} style={{ marginLeft: "2px" }} />
            )}
          </button>
          <button
            onClick={next}
            className={styles.btn}
            title="Next track"
            aria-label="Next track"
          >
            <FaStepForward size={16} />
          </button>
        </div>

        <div className={styles.bar}>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className={styles.seek}
            aria-label="Seek bar"
          />
          <div className={styles.time}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className={styles.volume}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolumeLevel(parseFloat(e.target.value))}
            className={styles.volumeSlider}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
