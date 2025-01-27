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
    <div className="p-6 font-sans bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Tracked Products</h2>
      <ul className="list-none divide-y divide-gray-300">
        {trackedProducts.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between py-4 px-2 hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-700 font-medium">{product.name}</span>
            <input
              type="checkbox"
              onChange={() => handleToggleTrackedProduct(product.id)}
              checked={product.tracked}
              className="w-5 h-5 accent-indigo-500"
            />
          </li>
        ))}
      </ul>
  
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add Tracked Product</h3>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newTrackedProduct}
            onChange={handleNewTrackedProductChange}
            className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none "
            placeholder="Enter product name..."
          />
          <button
              type="submit"
              onClick={handleAddTrackedProduct}
              className="bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Add
            </button>
        </div>
      </div>
    </div>
  );
};

export default TrackedProductList;
