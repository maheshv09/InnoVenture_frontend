import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useParams } from "react-router-dom";
import { stripePublicKey } from "../../helper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css"
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { toast } from "react-toastify";

const Payment = () => {
  const { totAmt } = useParams();
  const user = useAuthState(auth);
  const firebase_Id = user[0].uid;
  const navigate = useNavigate();

  // State to hold the customer's address
  const [address, setAddress] = useState("");

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const onToken = async (token) => {
    console.log("Payment Token:", token);

    const userResp = await axios.get(
      `http://localhost:8000/getUser/${firebase_Id}`
    );
    const userDoc = userResp.data;

    const resp = await axios.patch(
      `http://localhost:8000/updateUser/${firebase_Id}`,
      {
        orders: userDoc.cart,
        address: address,
      }
    );

    toast.success("Payment Successful!! ");
    navigate("/");
  };

  return (
    <div className="paymentPage">
      <h2 className="cart-title">Payment</h2>
      <div className="paymentDetails shadow my-5 col-md-4 mx-auto p-5">
        <h3><span className="text-danger">Total Amount:</span> Rs. {totAmt} </h3>

        <div className="form-group payment">
          <label></label>
          <input
            className="form-control"
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your address"
          />
        </div>
        <StripeCheckout
          name="Shopping Cart Payment"
          currency="INR"
          amount={totAmt * 100}
          token={onToken}
          stripeKey={stripePublicKey}
        >
          <button className="pay-now">Pay Now</button>
        </StripeCheckout>



      </div>

    </div>

  );
};

export default Payment;
