import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useAuthState(auth);
  const uid = user[0]?.uid;
  const [selectRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getUser/${uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    if (uid) {
      fetchUserData();
    }
  }, [uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return null;
  }

  const {
    mobileNum,
    name,
    email,
    dob,
    logintype,
    firebase_Id,
    purchasedAmount,
    purchasedEquity,
    equity,
    orders,
  } = userData;
  const submitRating = async (productId) => {
    console.log("Rating :", selectRating, "PROD ID :", productId);
    const response = await axios.get(
      `http://localhost:8000/getProduct/${productId}`
    );
    const prevRatings = response.data.products[0].ratings;
    prevRatings.push(parseInt(selectRating));
    console.log("REPONSE :", selectRating);

    console.log("NEW ARRAY :", prevRatings);
    const response2 = await axios.patch(
      `http://localhost:8000/updateProd/${productId}`,
      {
        ratings: prevRatings,
      }
    );
  };
  return (
    <div>
      <h2>User Profile</h2>
      <p>Mobile Number: {mobileNum}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Date of Birth: {dob}</p>
      <p>Login Type: {logintype}</p>
      <p>Purchased Amount: {purchasedAmount}</p>
      <p>Purchased Equity: {purchasedEquity}</p>

      <h3>Equity</h3>
      {Object.keys(equity).map((stock, index) => (
        <div key={index}>
          <p>Stock: {stock}</p>
          <p>Purchased Amount: {equity[stock].purchasedAmount}</p>
          <p>Purchased Equity: {equity[stock].purchasedEquity}</p>
        </div>
      ))}

      <h2>Orders</h2>
      {Object.keys(orders).map((product, index) => (
        <div key={index}>
          <p>Product: {product}</p>
          <p>Price: {orders[product].price}</p>
          <p>Quantity: {orders[product].quantity}</p>
          {orders[product].review !== "0" ? (
            <p>You gave {orders[product].review} rating</p>
          ) : (
            <div>
              Give Rating :
              <select>
                <option value="1" onClick={() => setSelectedRating(1)}>
                  1
                </option>
                <option value="2" onClick={() => setSelectedRating(2)}>
                  2
                </option>
                <option value="3" onClick={() => setSelectedRating(3)}>
                  3
                </option>
                <option value="4" onClick={() => setSelectedRating(4)}>
                  4
                </option>
                <option value="5" onClick={() => setSelectedRating(5)}>
                  5
                </option>
              </select>
              <button onClick={() => submitRating(orders[product].id)}>
                Submit Rating
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Profile;
