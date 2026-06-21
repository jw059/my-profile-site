import AlbumCard from "./AlbumCard";
import styles from "../styles/Discography.module.css";

export default function Discography({ albums }) {
  return (
    <section id="discography" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Discography</h2>
        <div className={styles.grid}>
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </section>
  );
}
