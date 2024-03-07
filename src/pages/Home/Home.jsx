import Catalog from "../../components/Catalog/Catalog";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Catalog />
      </main>
      <Footer />
    </>
  );
};

export default Home;
