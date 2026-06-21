import { FaSpotify, FaInstagram, FaBandcamp } from "react-icons/fa";
import styles from "../styles/Footer.module.css";

const iconMap = {
  spotify: FaSpotify,
  instagram: FaInstagram,
  bandcamp: FaBandcamp,
};

export default function Footer({ artist }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
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
                  <Icon size={20} />
                </a>
              ) : null;
            })}
          </div>

          <p className={styles.copy}>
            © {currentYear} {artist.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
