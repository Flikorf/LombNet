import styles from "../Catalog/Catalog.module.css";
import { Link } from "react-router-dom";

export default function Catalog() {
  return (
    <ul className={styles.catalog}>
      <Link to="/phone">
        <li className={styles.item}>
          <img src={"telephone.png"} alt="Смартфоны" className={styles.image} />
          Смартфоны
        </li>
      </Link>
      <li className={styles.item}>
        <img src={"laptop.png"} alt="Ноутбуки" className={styles.image} />
        Ноутбуки
      </li>
      <li className={styles.item}>
        <img src={"tablet.png"} alt="Планшеты" className={styles.image} />
        Планшеты
      </li>
      <li className={styles.item}>
        <img src={"headphones.png"} alt="Наушники" className={styles.image} />
        Наушники
      </li>
    </ul>
  );
}
