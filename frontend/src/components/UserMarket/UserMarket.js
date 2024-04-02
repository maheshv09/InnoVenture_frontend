import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserMarket.css";

const UserMarket = ({ selectedProducts, setSelectedProducts }) => {
  const { firebase_Id } = useParams();
  const [startup, setStartup] = useState(null);
  const [products, setProducts] = useState([]);
  //const [selectedProducts, setSelectedProducts] = useState([]);
  console.log("SEL_PRODS:", selectedProducts);
  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getStartDet/${firebase_Id}`
        );
        setStartup(response.data);
        const response1 = await axios.get(
          `http://localhost:8000/getProducts/${firebase_Id}`
        );
        setProducts(response1.data.products);
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    fetchStartup();
  }, [firebase_Id]); // Added firebase_Id as a dependency to fetch data when it changes

  const handleAddToCart = async (productId) => {
    const productToAdd = products.find((product) => product._id === productId);
    if (productToAdd) {
      setSelectedProducts([...selectedProducts, productToAdd]);
      var obj = {};
      const userResp = await axios.get(
        `http://localhost:8000/getUser/${firebase_Id}`
      );
      const userDoc = userResp.data;
      obj = userDoc.cart;
      const price = parseFloat(productToAdd.price.replace("rs", ""));
      if (productToAdd.name in obj) {
        obj[productToAdd.name].quantity += 1;
        // obj[productToAdd.name].price =
        //   parseInt(obj[productToAdd.name].price) + parseInt(price);
      } else {
        obj[productToAdd.name] = {
          quantity: 1,
          price: price,
        };
      }
      if (obj) {
        const resp = await axios.patch(
          `http://localhost:8000/updateUser/${userDoc.firebase_Id}`,
          {
            cart: obj,
          }
        );
      }
      toast.success("Product added to cart!");
    }
  };

  return (
    <div>
      <h2>Startup Details</h2>
      {startup && (
        <div>
          <h3>{startup.name}</h3>
          <p>{startup.description}</p>
          <p>
            <strong>USP:</strong> {startup.usp}
          </p>
          <img src={startup.photo} alt="Startup Photo" />
        </div>
      )}
      <h2>Products</h2>
      <div className="product-cards">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {product.photo && <img src={product.photo} alt="Product" />}
            <p>Price: {product.price}</p>
            <button onClick={() => handleAddToCart(product._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMarket;
