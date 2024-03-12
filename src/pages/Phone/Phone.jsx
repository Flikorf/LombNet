import { useState, useEffect } from "react";
import AddProduct from "../../components/AddProduct/AddProduct";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import styles from "./Phone.module.css";
import PropTypes from "prop-types";

const Phone = ({ addedProductName }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [filterParams, setFilterParams] = useState("");

  const handleProductAdded = (productName) => {
    // Логика обновления состояния
  };

  const handleFilterChange = (newFilterParams) => {
    setFilterParams(newFilterParams);
  };

  const fetchAllProducts = async () => {
    try {
      const response = await fetch("https://localhost:7211/api/Fuji/products", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NWU4NGQ5MzEyMzZjMTU3MTAxYjJhMzkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzEwMjQ4OTg4LCJpc3MiOiJNeUF1dGhTZXJ2ZXIiLCJhdWQiOiJNeUF1dGhDbGllbnQifQ.ngEQC_SSAFXVouSrrpWlOhToFRtmyNte6xlGSi5Fago`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAllProducts(data);
        setFilteredProducts(data);
      } else {
        console.error("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      if (filterParams.trim() === "") {
        // Если параметры фильтрации отсутствуют, отображаем все продукты
        setFilteredProducts(allProducts);
        return;
      }

      let apiUrl = "https://localhost:7211/api/Fuji/products";

      if (filterParams.includes("keywords")) {
        apiUrl = `https://localhost:7211/api/Fuji/search?${filterParams}`;
      } else if (filterParams.includes("brands")) {
        apiUrl = `https://localhost:7211/api/Fuji/products/brand/${
          filterParams.split("=")[1]
        }`;
      }

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFilteredProducts(data);
      } else {
        console.error("Failed to fetch filtered products.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [filterParams, token]);

  return (
    <div className={styles.productPage}>
      <div className={styles.filterSection}>
        <h2>Фильтры:</h2>
        <br />
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      <div className={styles.productsSection}>
        <h2>Товары:</h2>
        <div className={styles.product}>
          {filteredProducts.map((product) => (
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
