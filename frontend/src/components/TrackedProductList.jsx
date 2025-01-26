import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackedProductList = () => {
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [newTrackedProduct, setNewTrackedProduct] = useState("");

  useEffect(() => {
    fetchTrackedProducts();
  }, []);

  const fetchTrackedProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tracked-products"
      );

      setTrackedProducts(response.data);
    } catch (error) {
      console.error("Error fetching tracked products:", error);
    }
  };

  const handleNewTrackedProductChange = (event) => {
    setNewTrackedProduct(event.target.value);
  };

  const handleAddTrackedProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/add-tracked-product",
        {
          name: newTrackedProduct,
        }
      );
      const { id } = response.data;
      setTrackedProducts((prevProducts) => [
        ...prevProducts,
        { id, name: newTrackedProduct, tracked: true },
      ]);
      setNewTrackedProduct("");
    } catch (error) {
      console.error("Error adding tracked product:", error);
    }
  };

  const handleToggleTrackedProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:5000/tracked-product/${productId}`);
      setTrackedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, tracked: !product.tracked }
            : product
        )
      );
    } catch (error) {
      console.error("Error toggling tracked product:", error);
    }
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-2xl text-gray-800">Tracked Products</h2>
      <ul className="list-none p-0">
        {trackedProducts.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between p-2 border-b border-gray-300"
          >
            <span>{product.name}</span>
            <input
              type="checkbox"
              onChange={() => handleToggleTrackedProduct(product.id)}
              checked={product.tracked}
            />
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <h3 className="text-xl text-gray-800">Add Tracked Product</h3>
        <input
          type="text"
          value={newTrackedProduct}
          onChange={handleNewTrackedProductChange}
          className="p-2 w-full mb-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddTrackedProduct}
          className="p-2 bg-green-500 text-white rounded cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TrackedProductList;
