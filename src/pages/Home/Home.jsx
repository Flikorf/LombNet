import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to="/login">
        <button>Войти</button>
      </Link>
    </div>
  );
};

export default Home;
