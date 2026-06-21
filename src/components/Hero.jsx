import {
  FaSpotify,
  FaInstagram,
  FaBandcamp,
  FaTwitter,
  FaSoundcloud,
} from "react-icons/fa";
import styles from "../styles/Hero.module.css";

const iconMap = {
  spotify: FaSpotify,
  instagram: FaInstagram,
  bandcamp: FaBandcamp,
  twitter: FaTwitter,
  soundcloud: FaSoundcloud,
};

export default function Hero({ artist }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img src={artist.photo} alt={artist.name} />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.text}>
          <h1 className={styles.name}>{artist.name}</h1>
          <p className={styles.bio}>{artist.bio}</p>

          <div className={styles.socials}>
            {artist.socials.map((social) => {
              const Icon = iconMap[social.platform];
              return Icon ? (
                <a
                  key={social.platform}
                  href={social.url}
                  title={social.platform}
                  className={styles.icon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={28} />
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
