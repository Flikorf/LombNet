import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styles from "./Registration.module.css";

const Registration = () => {
  const [userData, setUserData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async () => {
    try {
      // Отправляем запрос на регистрацию
      const response = await axios.post(
        "https://gc.kis.v2.scr.kaspersky-labs.com/8AA5EC79-9B5B-4CD8-AFF6-52A5F7BF9129/920C987C-5419-4465-92CD-99D4CFA42EB0/to/wsm.sessionDeactivated?tm=2024-03-06T05%3A22%3A22.133Z",
        userData
      );

      // Обработка успешной регистрации
      console.log("Успешная регистрация", response.data);

      // Дополнительные действия, например, перенаправление на страницу входа
    } catch (error) {
      // Обработка ошибок регистрации
      console.error("Ошибка регистрации", error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>Регистрация</h1>
        <form className={styles.form}>
          <label>
            Имя:
            <input type="text" name="username" onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Номер телефона:
            <input type="tel" name="phoneNumber" onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" onChange={handleInputChange} />
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
          <button type="button" onClick={handleRegistration}>
            Зарегистрироваться
          </button>
        </form>
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>.
        </p>
      </div>
    </div>
  );
};

export default Registration;
