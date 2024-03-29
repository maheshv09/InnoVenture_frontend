import { React, useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
const Cart = ({ selectedProducts, setSelectedProducts }) => {
  const [totalAmt, setTotalAmt] = useState(0);
  const calculateTotal = () => {};
  useEffect(() => {
    let total = 0;
    selectedProducts.forEach((product) => {
      const price = parseFloat(product.price.replace("rs", ""));
      total += price;
    });
    setTotalAmt(total);
  }, [totalAmt, selectedProducts]);
  const removeProduct = (productId) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product._id !== productId
    );
    setSelectedProducts(updatedProducts);
  };
  const navigate = useNavigate();
  const navigateToPayment = () => {
    navigate(`/payment/${totalAmt}`);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {selectedProducts.map((product) => (
          <div key={product._id} className="cart-item">
            <img src={product.photo} alt={product.name} className="item-img" />
            <div className="item-details">
              <h3 className="item-name">{product.name}</h3>
              <p className="item-description">{product.description}</p>
              <p className="item-price">Price: {product.price}</p>
              <button
                className="remove-btn"
                onClick={() => removeProduct(product._id)}
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
