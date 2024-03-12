import { useState, useEffect } from "react";
import AddProduct from "../../components/AddProduct/AddProduct";
import styles from "./Phone.module.css";
import PropTypes from "prop-types";

const token = localStorage.getItem("authToken");

const Phone = ({ addedProductName }) => {
  const [products, setProducts] = useState([]);

  const handleProductAdded = (productName) => {
    // Логика обновления состояния
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7211/api/Fuji/products",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NWU4NGQ5MzEyMzZjMTU3MTAxYjJhMzkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzEwMjM3NjQ3LCJpc3MiOiJNeUF1dGhTZXJ2ZXIiLCJhdWQiOiJNeUF1dGhDbGllbnQifQ.M_GNfuSZUsEK236OIe-KGA3VrWuNs62Xp9dhaskrDmQ`, // Используйте правильное свойство
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.productPage}>
      <div className={styles.filterSection}>
        <h2>Фильтры:</h2>
      </div>
      <div className={styles.productsSection}>
        <h2>Товары:</h2>
        <div className={styles.product}>
          {products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <div className={styles.productImage}>
                {product.imageFileName && (
                  <img
                    src={`https://localhost:7211/api/Fuji/getImage/${product.imageFileName}`}
                    alt={product.name}
                  />
                )}
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productInfoName}>{product.name}</div>
                <div className={styles.productInfoPrice}>
                  Цена: {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        <AddProduct onProductAdded={handleProductAdded} />
        {addedProductName && (
          <div className={styles.addedProductMessage}>
            <p>{`Добавлен товар: ${addedProductName}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

Phone.propTypes = {
  addedProductName: PropTypes.string,
};

export default Phone;
