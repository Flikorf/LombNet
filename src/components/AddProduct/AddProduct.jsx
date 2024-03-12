import { useState } from "react";
import PropTypes from "prop-types";

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    status: "Есть в наличии",
    isDeleted: false,
    brand: "",
    image: null,
  });

  const [requestToken, setRequestToken] = useState(null);

  // Получение токена из localStorage
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

    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch(
        "https://localhost:7211/api/Fuji/addProduct",
        {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NWU4NGQ5MzEyMzZjMTU3MTAxYjJhMzkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzEwMjM3NjQ3LCJpc3MiOiJNeUF1dGhTZXJ2ZXIiLCJhdWQiOiJNeUF1dGhDbGllbnQifQ.M_GNfuSZUsEK236OIe-KGA3VrWuNs62Xp9dhaskrDmQ`, // Правильное свойство
          },
        }
      );

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
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
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
        Brand:
        <input
          type="text"
          name="brand"
          value={formData.brand}
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
