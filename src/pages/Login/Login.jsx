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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://r941rsd2-7211.euw.devtunnels.ms/api/Authorization/Login",
        userData
      );

      console.log("Вход выполнен успешно", response.data);

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
