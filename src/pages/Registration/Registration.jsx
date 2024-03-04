import { Link } from "react-router-dom";
import styles from "./Registration.module.css";

const Registration = () => {
  return (
    <div>
      <div className={styles.container}>
        <h1>Регистрация</h1>
        <form className={styles.form}>
          <label>
            Имя:
            <input type="text" name="username" />
          </label>
          <br />
          <label>
            Номер телефона:
            <input type="tel" name="phoneNumber" />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <br />
          <label>
            Пароль:
            <input type="password" name="password" />
          </label>
          <br />
          <label>
            Подтверждение пароля:
            <input type="password" name="confirmPassword" />
          </label>
          <br />
          <button type="button">Зарегистрироваться</button>
        </form>
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>.
        </p>
      </div>
    </div>
  );
};

export default Registration;
