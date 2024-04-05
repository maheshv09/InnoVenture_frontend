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

  console.log(firebase_Id);

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



      <div class="container mt-3 mb-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-8">
            <div class="p-2">
              <h2 className="cart-title">Shopping cart</h2>

            </div>

            {Object.keys(selectedProducts).map((productName) => (
              <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" key={productName}>

                <div class="mr-1"><img class="rounded" src="https://i.imgur.com/XiFJkhI.jpg" width="70" /></div>
                <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">{productName}</span>
                </div>

                <div class="d-flex flex-row align-items-center qty">
                  <button
                    className="decrease-btn shadow"
                    onClick={() => decreaseQuantity(productName)}
                  ><i class="fa fa-minus text-danger"></i></button>

                  <h5 class="text-grey mt-1 mr-1 ml-1"> {selectedProducts[productName].quantity}</h5>
                  <button
                    className="increase-btn shadow"
                    onClick={() => increaseQuantity(productName)}
                  ><i class="fa fa-plus text-success"></i></button>

                </div>
                <div>
                  <h5 class="text-grey">Rs.{selectedProducts[productName].price}</h5>
                </div>
                <div class="d-flex align-items-center">
                  <button
                    className="remove-btn"
                    onClick={() => removeProduct(productName)}
                  >  <i class="fa fa-trash mb-1 text-danger"></i> </button>
                </div>
              </div>
            ))}



            <div class="align-items-center mt-3 p-2 bg-white rounded">

              <h3 className="total cart-title ">Total : <span>${totalAmt}</span> </h3>
              <button class="btn btn-warning btn-block w-100 btn-lg ml-2 pay-button" type="button" onClick={navigateToPayment}>Proceed to Pay</button>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
};

export default Cart;
