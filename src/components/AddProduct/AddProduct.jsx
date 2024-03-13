import { useState } from "react";
import PropTypes from "prop-types";
import API_BASE_URL from "../../apiConfig";

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    status: "Есть в наличии",
    isDeleted: false,
    lombardId: "123",
    brand: "",
    image: null,
  });

  const categories = ["telephone", "laptop", "tablet", "headphones"];
  const brands = ["Iphone", "Samsung", "Xiaomi", "OPPO", "Nokia"];

  const [requestToken, setRequestToken] = useState(null);
  const [categoryError, setCategoryError] = useState(false);

  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("Authentication token is missing.");
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      setCategoryError(true);
      return;
    }

    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch(`${API_BASE_URL}/api/Fuji/addProduct`, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseToken = response.headers.get("Authorization");
      setRequestToken(responseToken);

      if (response.ok) {
        const responseData = await response.json();
        const addedProductName = responseData.name;
        onProductAdded(addedProductName);
        console.log("Product added successfully!");
      } else if (response.status === 401) {
        console.error("Unauthorized. Check if the token is valid.");
      } else {
        const errorText = await response.text();
        console.error(`Failed to add product. Server response: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={categoryError ? "error" : ""}
        >
          <option value="" disabled>
            Выберите категорию
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {categoryError && (
          <p className="error">Пожалуйста, выберите категорию.</p>
        )}
      </label>
      <label>
        Brand:
        <select name="brand" value={formData.brand} onChange={handleChange}>
          <option value="" disabled>
            Выберите бренд
          </option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Image:
        <input type="file" name="image" onChange={handleChange} />
      </label>
      <button type="submit">Добавить товар</button>
    </form>
  );
};

AddProduct.propTypes = {
  onProductAdded: PropTypes.func.isRequired,
};

export default AddProduct;
