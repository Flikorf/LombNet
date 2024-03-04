import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div>
      <div className={styles.container}>
        <h1>Войти</h1>
        <form className={styles.form}>
          <label>
            Имя:
            <input type="text" name="username" />
          </label>
          <br />
          <label>
            Пароль:
            <input type="password" name="password" />
          </label>
          <br />
          <Link to="/">
            <button type="button">Войти</button>
          </Link>
        </form>
        <p>
          Или вы можете <Link to="/registration">зарегистрироваться</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
