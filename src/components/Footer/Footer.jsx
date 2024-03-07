import styles from "../Footer/Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div className={styles.contactInfo}>
          <p>Номер телефона: +7 (123) 456-7890</p>
        </div>
        <div className={styles.socialLinks}>
          <a
            href="https://www.instagram.com/erika_kamyshek"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="instagram.png" alt="Первая соц. сеть" />
          </a>
          <a
            href="ссылка на вторую соц. сеть"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="facebook.png" alt="Вторая соц. сеть" />
          </a>
          <a
            href="ссылка на третью соц. сеть"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="whatsapp.png" alt="Третья соц. сеть" />
          </a>
          <a
            href="https://t.me/Flikorf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="telegram.png" alt="Четвертая соц. сеть" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
