import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./FilterComponent.module.css";

const FilterComponent = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState("");
  const [brandFilters, setBrandFilters] = useState({
    Nokia: false,
    Xiaomi: false,
    Iphone: false,
  });

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleBrandFilterChange = (brand) => {
    setBrandFilters((prevFilters) => ({
      ...prevFilters,
      [brand]: !prevFilters[brand],
    }));
  };

  const handleFilterApply = () => {
    const selectedBrands = Object.keys(brandFilters).filter(
      (brand) => brandFilters[brand]
    );

    let filterParams = "";

    if (filterValue.trim() !== "") {
      filterParams += `keywords=${encodeURIComponent(filterValue)}`;
    }

    if (selectedBrands.length > 0) {
      filterParams += filterParams !== "" ? "&" : "";
      filterParams += `brands=${selectedBrands.join(",")}`;
    }

    onFilterChange(filterParams);
  };

  return (
    <div className={styles.filterContainer}>
      <input
        type="text"
        value={filterValue}
        onChange={handleInputChange}
        placeholder="Введите параметры фильтрации"
        className={styles.filterInput}
      />
      <div className={styles.brandFilterContainer}>
        <label className={styles.brandFilterLabel}>Фильтр по бренду:</label>
        {Object.keys(brandFilters).map((brand) => (
          <span key={brand} className={styles.brandFilterOption}>
            <input
              type="checkbox"
              checked={brandFilters[brand]}
              onChange={() => handleBrandFilterChange(brand)}
              className={styles.brandFilterCheckbox}
            />
            {brand}
          </span>
        ))}
      </div>
      <button onClick={handleFilterApply} className={styles.applyFilterButton}>
        Применить фильтр
      </button>
    </div>
  );
};

FilterComponent.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterComponent;
