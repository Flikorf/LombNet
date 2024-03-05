import styles from "../Header/Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <img src="logo.svg" alt="" />
        </Link>
        <Link to="/login">
          <button className={styles.login}>Войти</button>
        </Link>
      </header>
      <hr />
    </>
  );
};

export default Header;
