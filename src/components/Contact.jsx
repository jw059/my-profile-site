import { useState } from "react";
import styles from "../styles/Contact.module.css";

export default function Contact({ contact }) {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const ACTION = `https://formspree.io/f/${contact.formspreeId}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(ACTION, {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("ok");
        setFormData({ name: "", email: "", message: "" });
        e.target.reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Get in Touch</h2>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.group}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={status === "sending"}
                className={styles.input}
              />
            </div>

            <div className={styles.group}>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={status === "sending"}
                className={styles.input}
              />
            </div>

            <div className={styles.group}>
              <textarea
                name="message"
                placeholder="Your message or booking inquiry"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={status === "sending"}
                className={styles.textarea}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={styles.submit}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "ok" && (
              <div className={styles.message} style={{ color: "#4ade80" }}>
                ✓ Message sent! Thank you.
              </div>
            )}
            {status === "error" && (
              <div className={styles.message} style={{ color: "#ff7c2a" }}>
                ✗ Something went wrong. Try emailing directly.
              </div>
            )}
          </form>

          <div className={styles.direct}>
            <p className={styles.directLabel}>Or reach out directly:</p>
            <a href={`mailto:${contact.bookingEmail}`} className={styles.email}>
              {contact.bookingEmail}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
