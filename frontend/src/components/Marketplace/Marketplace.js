import React, { useState, useEffect } from "react";
import axios from "axios";

const Marketplace = ({ firebase_Id }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPhoto, setProductPhoto] = useState(null); // Updated to hold file object
  const [productPrice, setProductPrice] = useState("");
  const [editingProductId, setEditingProductId] = useState("");
  const [flag, setFlag] = useState(false); // Flag for photo upload status

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
      let photoUrl = "";
      if (productPhoto) {
        const formData = new FormData();
        formData.append("image", productPhoto);
        setFlag(true);
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=e260abee406449ae9e7c159665ef502c",
          formData
        );
        photoUrl = response.data.data.display_url;
      }

      const response = await axios.post(`http://localhost:8000/postProducts`, {
        firebase_Id: firebase_Id,
        name: productName,
        description: productDescription,
        photo: photoUrl,
        price: productPrice,
      });
      console.log("Product added:", response.data);
      setProducts([...products, response.data.data.ops[0]]);
      setProductName("");
      setProductDescription("");
      setProductPhoto(null); // Reset file object after upload
      setProductPrice("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (
    productId,
    newName,
    newDescription,
    newPhoto,
    newPrice
  ) => {
    try {
      let photoUrl = newPhoto;

      const formData = new FormData();
      formData.append("image", newPhoto);
      setFlag(true);
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=e260abee406449ae9e7c159665ef502c",
        formData
      );
      console.log("RES:", response);
      photoUrl = response.data.data.display_url;

      console.log("URLLLL:", photoUrl);
      await axios.patch(`http://localhost:8000/updateProd/${productId}`, {
        name: newName,
        description: newDescription,
        photo: photoUrl,
        price: newPrice,
      });
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            name: newName,
            description: newDescription,
            photo: photoUrl,
            price: newPrice,
          };
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
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productDescription">Product Description:</label>
          <input
            type="text"
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productPhoto">Product Photo:</label>
          <input
            type="file"
            id="productPhoto"
            accept="image/*"
            onChange={(e) => setProductPhoto(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="text"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
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
                <div>
                  <strong>Photo:</strong>{" "}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProductPhoto(e.target.files[0])}
                  />
                </div>
                <div>
                  <strong>Price:</strong>{" "}
                  <input
                    type="text"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <button
                  onClick={() =>
                    handleEditProduct(
                      product._id,
                      productName,
                      productDescription,
                      productPhoto,
                      productPrice
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
                <div>
                  <strong>Photo:</strong>{" "}
                  {product.photo && (
                    <img src={product.photo} alt="Product" width="100" />
                  )}
                </div>
                <div>
                  <strong>Price:</strong> {product.price}
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
