import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";

const Cart = () => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [totalAmt, setTotalAmt] = useState(0);
  const user = useAuthState(auth);
  const firebase_Id = user[0]?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResp = await axios.get(
          `http://localhost:8000/getUser/${firebase_Id}`
        );
        const userDoc = userResp.data;
        setSelectedProducts(userDoc.cart);
        console.log("OBT PRODS:", userDoc.cart);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [firebase_Id]);

  useEffect(() => {
    calculateTotal();
  }, [selectedProducts]);

  const calculateTotal = () => {
    let total = 0;
    for (const key in selectedProducts) {
      if (selectedProducts.hasOwnProperty(key)) {
        total += selectedProducts[key].quantity * selectedProducts[key].price;
      }
    }
    setTotalAmt(total);
  };

  const decreaseQuantity = async (productName) => {
    const updatedProducts = { ...selectedProducts };
    if (updatedProducts[productName].quantity > 1) {
      updatedProducts[productName].quantity -= 1;
      setSelectedProducts(updatedProducts);
      try {
        await axios.patch(`http://localhost:8000/updateUser/${firebase_Id}`, {
          cart: updatedProducts,
        });
      } catch (error) {
        console.error("Error updating user's cart:", error);
      }
    }
  };
  const increaseQuantity = async (productName) => {
    const updatedProducts = { ...selectedProducts };
    updatedProducts[productName].quantity += 1;
    setSelectedProducts(updatedProducts);
    try {
      await axios.patch(`http://localhost:8000/updateUser/${firebase_Id}`, {
        cart: updatedProducts,
      });
    } catch (error) {
      console.error("Error updating user's cart:", error);
    }
  };
  const removeProduct = async (productName) => {
    const updatedProducts = { ...selectedProducts };
    delete updatedProducts[productName];
    setSelectedProducts(updatedProducts);
    try {
      await axios.patch(`http://localhost:8000/updateUser/${firebase_Id}`, {
        cart: updatedProducts,
      });
    } catch (error) {
      console.error("Error updating user's cart:", error);
    }
  };

  const navigateToPayment = () => {
    navigate(`/payment/${totalAmt}`);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {Object.keys(selectedProducts).map((productName) => (
          <div key={productName} className="cart-item">
            <div className="item-details">
              <h3 className="item-name">{productName}</h3>
              <p className="item-description">
                Quantity: {selectedProducts[productName].quantity}
              </p>
              <p className="item-price">
                Price: {selectedProducts[productName].price} rs
              </p>
              <button
                className="decrease-btn"
                onClick={() => decreaseQuantity(productName)}
              >
                -
              </button>
              <button
                className="increase-btn"
                onClick={() => increaseQuantity(productName)}
              >
                +
              </button>
              <button
                className="remove-btn"
                onClick={() => removeProduct(productName)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <h3 className="total">Total: {totalAmt} rs</h3>
      <button className="proceed-btn" onClick={navigateToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Cart;
