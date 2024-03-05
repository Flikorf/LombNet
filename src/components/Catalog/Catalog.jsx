import styles from "../Catalog/Catalog.module.css";

export default function Catalog() {
  return (
    <ul className={styles.catalog}>
      <li className={styles.item}>
        <img
          src={"rings.jpg"}
          alt="Золотые и серебряные украшения"
          className={styles.image}
        />
        Золотые и серебряные украшения
      </li>
      <li className={styles.item}>
        <img
          src={"phone.png"}
          alt="Смартфоны и планшеты"
          className={styles.image}
        />
        Смартфоны и планшеты
      </li>
      <li className={styles.item}>
        <img
          src={"paint.jpg"}
          alt="Картины и гравюры"
          className={styles.image}
        />
        Картины и гравюры
      </li>
      <li className={styles.item}>
        <img
          src={"rings.jpg"}
          alt="Золотые и серебряные украшения"
          className={styles.image}
        />
        Электроинструменты
      </li>
      <li className={styles.item}>
        <img
          src={"rings.jpg"}
          alt="Золотые и серебряные украшения"
          className={styles.image}
        />
        Мягкая мебель
      </li>
      <li className={styles.item}>
        <img
          src={"rings.jpg"}
          alt="Золотые и серебряные украшения"
          className={styles.image}
        />
        Велосипеды и роликовые коньки
      </li>
    </ul>
  );
}
