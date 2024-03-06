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
        "https://localhost:7211/api/Authorization/Login",
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
