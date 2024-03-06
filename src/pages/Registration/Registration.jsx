import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Registration.module.css";
import Modal from "../../components/Modal/Modal";

const Registration = () => {
  const [userData, setUserData] = useState({
    username: "",
    number: "",
    email: "",
    password: "",
  });

  const [modalContent, setModalContent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async () => {
    // Проверка на заполненность всех полей
    if (
      !userData.username ||
      !userData.number ||
      !userData.email ||
      !userData.password
    ) {
      setModalContent({
        title: "Ошибка",
        body: "Все поля должны быть заполнены.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7211/api/Authorization/Registration",
        userData
      );

      setModalContent({
        title: "Успешная регистрация",
        body: `Пользователь ${userData.username} успешно зарегистрирован.`,
        type: "success",
      });
    } catch (error) {
      setModalContent({
        title: "Ошибка регистрации",
        body:
          error.response?.data?.message ||
          "Произошла ошибка во время регистрации.",
        type: "error",
      });
    }
  };

  const closeModal = () => {
    setModalContent(null);
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
            <input type="tel" name="number" onChange={handleInputChange} />
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
        {modalContent && (
          <Modal onClose={closeModal}>
            <h2>{modalContent.title}</h2>
            <p>{modalContent.body}</p>
            <button onClick={closeModal}>Закрыть</button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Registration;
