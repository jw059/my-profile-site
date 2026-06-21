import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import styles from "../styles/AlbumCard.module.css";

export default function AlbumCard({ album }) {
  const [expanded, setExpanded] = useState(false);
  const { playTrack, currentTrack, currentIndex, queue } = usePlayer();

  const handlePlayTrack = (track) => {
    if (!track.audioSrc) return;
    playTrack(track, album.tracks);
  };

  const isCurrentAlbum =
    queue.length > 0 && queue[currentIndex]?.id?.startsWith(album.id);

  return (
    <div className={styles.card}>
      <div
        className={`${styles.cover} ${isCurrentAlbum ? styles.active : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        <img src={album.cover} alt={album.title} />
        <div className={styles.overlay}>
          <button
            className={styles.expandBtn}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            aria-label={expanded ? "Collapse tracklist" : "Expand tracklist"}
          >
            {expanded ? "−" : "+"}
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{album.title}</h3>
        <p className={styles.year}>{album.year}</p>
      </div>

      {expanded && (
        <div className={styles.tracklist}>
          {album.tracks.map((track, idx) => {
            const isPlaying = isCurrentAlbum && currentIndex === idx;
            const hasAudio = !!track.audioSrc;

            return (
              <div
                key={track.id}
                className={`${styles.track} ${isPlaying ? styles.playing : ""}`}
              >
                <span className={styles.num}>{idx + 1}</span>
                <span className={styles.name}>{track.title}</span>
                <span className={styles.duration}>{track.duration}</span>
                {hasAudio && (
                  <button
                    className={styles.playBtn}
                    onClick={() => handlePlayTrack(track)}
                    aria-label={`Play ${track.title}`}
                  >
                    <FaPlay size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
