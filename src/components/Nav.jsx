import { useState, useEffect } from "react";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          ZYU
        </a>

        <div className={styles.links}>
          <a href="#hero" className={styles.link}>
            Home
          </a>
          <a href="#discography" className={styles.link}>
            Discography
          </a>
          <a href="#contact" className={styles.link}>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
