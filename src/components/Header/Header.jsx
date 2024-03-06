import styles from "../Header/Header.module.css";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

const Header = () => {
  const { user, logoutUser } = useUser();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <img src="logo.svg" alt="" />
        </Link>
        {user ? (
          <>
            <span>{user.username}</span>
            <button onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <Link to="/login">
            <button className={styles.login}>Войти</button>
          </Link>
        )}
      </header>
      <hr />
    </>
  );
};

export default Header;
