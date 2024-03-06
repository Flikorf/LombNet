import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  // Состояние для хранения данных пользователя
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  // Обработчик изменения ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Обработчик нажатия кнопки "Войти"
  const handleLogin = async () => {
    try {
      // Отправляем запрос на вход
      const response = await axios.post(
        "https://gc.kis.v2.scr.kaspersky-labs.com/8AA5EC79-9B5B-4CD8-AFF6-52A5F7BF9129/2CE9AB1D-1375-47FC-BF74-37DFEABE6F20/to/wsm.sessionDeactivated?tm=2024-03-06T06%3A10%3A34.971Z", // Замените на актуальный URL вашего API для проверки входа
        userData
      );

      // Обработка успешного входа
      console.log("Вход выполнен успешно", response.data);

      // Дополнительные действия после успешного входа, например, перенаправление на другую страницу
    } catch (error) {
      // Обработка ошибок входа
      console.error("Ошибка входа", error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>Войти</h1>
        <form className={styles.form}>
          <label>
            Имя:
            <input type="text" name="username" onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Пароль:
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </label>
          <br />
          {/* Используйте обработчик при нажатии кнопки "Войти" */}
          <button type="button" onClick={handleLogin}>
            Войти
          </button>
        </form>
        <p>
          Или вы можете <Link to="/registration">зарегистрироваться</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
