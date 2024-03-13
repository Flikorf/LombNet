import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../components/UserContext";
import styles from "./Login.module.css";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { loginUser } = useUser();
  const navigate = useNavigate();

  // Состояние для хранения значения пароля с небольшой задержкой
  const [passwordWithDelay, setPasswordWithDelay] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Устанавливаем значение пароля с задержкой (например, 500 миллисекунд)
    setTimeout(() => {
      setPasswordWithDelay(value);
    }, 500);
  };

  const handleLogin = async () => {
    try {
      // Используем значение пароля с задержкой
      const response = await axios.post(
        "https://localhost:7211/api/Authorization/Login",
<<<<<<< Updated upstream
        { ...userData, password: passwordWithDelay }
=======
        userData
>>>>>>> Stashed changes
      );

      const authToken = response.data.token;

      // Сохраняем токен в localStorage
      localStorage.setItem("authToken", authToken);

      console.log("Вход выполнен успешно", response.data);
      console.log(response.data.UserId);

      loginUser(response.data);

      navigate("/");
    } catch (error) {
      console.error("Ошибка входа", error);

      alert(
        "Ошибка входа. Пожалуйста, проверьте правильность введенных данных."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Войти</h1>
        <form className={styles.form}>
          <label>
            Имя:
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>
          <br />
          <label>
            Пароль:
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin} className={styles.button}>
            Войти
          </button>
        </form>
        <p>
          Или вы можете{" "}
          <Link to="/registration" className={styles.link}>
            зарегистрироваться
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
