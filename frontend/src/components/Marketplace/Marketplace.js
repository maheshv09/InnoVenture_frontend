import React, { useState, useEffect } from "react";
import axios from "axios";

const Marketplace = ({ firebase_Id }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [editingProductId, setEditingProductId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getProducts/${firebase_Id}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [firebase_Id]);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/postProducts`, {
        firebase_Id: firebase_Id,
        name: productName,
        description: productDescription,
      });
      console.log("Product added:", response.data);
      setProducts([...products, response.data.data.ops[0]]);
      setProductName("");
      setProductDescription("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (productId, newName, newDescription) => {
    try {
      await axios.patch(`http://localhost:8000/updateProd/${productId}`, {
        name: newName,
        description: newDescription,
      });
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return { ...product, name: newName, description: newDescription };
        }
        return product;
      });
      setProducts(updatedProducts);
      setEditingProductId("");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            // value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productDescription">Product Description:</label>
          <input
            type="text"
            id="productDescription"
            // value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {editingProductId === product._id ? (
              <div>
                <div>
                  <strong>Name:</strong>{" "}
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div>
                  <strong>Description:</strong>{" "}
                  <input
                    type="text"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>
                <button
                  onClick={() =>
                    handleEditProduct(
                      product._id,
                      productName,
                      productDescription
                    )
                  }
                >
                  Save
                </button>
                <button onClick={() => setEditingProductId("")}>Cancel</button>
              </div>
            ) : (
              <div>
                <div>
                  <strong>Name:</strong> {product.name}
                </div>
                <div>
                  <strong>Description:</strong> {product.description}
                </div>
                <button onClick={() => setEditingProductId(product._id)}>
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Marketplace;
