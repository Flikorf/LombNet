import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Registration.module.css";
import Modal from "../../components/Modal/Modal";
import API_BASE_URL from "../../apiConfig";

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
        `${API_BASE_URL}/api/Authorization/Registration`,
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
        body: error.response?.data?.message
          ? error.response.data.message
          : "Произошла ошибка во время регистрации.",
        type: "error",
      });
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.registrationContainer}>
        <h1 className={styles.registrationTitle}>Регистрация</h1>
        <form className={styles.registrationForm}>
          <label className={styles.formLabel}>
            Имя:
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.formLabel}>
            Номер телефона:
            <input
              type="tel"
              name="number"
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.formLabel}>
            Email:
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>
          <br />
          <label className={styles.formLabel}>
            Пароль:
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>
          <br />
          <button
            type="button"
            onClick={handleRegistration}
            className={styles.button}
          >
            Зарегистрироваться
          </button>
        </form>
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>.
        </p>
        {modalContent && (
          <Modal onClose={closeModal} className={styles.modal}>
            <div className={styles.modal_item}>
              <h2>{modalContent.title}</h2>
              <button onClick={closeModal} className={styles.closeButton}>
                X
              </button>
            </div>
            <p>{modalContent.body}</p>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Registration;
