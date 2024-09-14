import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { Link } from "react-router-dom";

const EquityRaising = () => {
  const [amount, setAmount] = useState("");
  const [equity, setEquity] = useState("");
  const user = useAuthState(auth);
  const firebase_Id = user[0]?.uid;
  console.log("FIRBID:-", firebase_Id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send data to backend for equity raising
    //console.log("Amount:", amount);
    //console.log("Equity:", equity);
    // You can use axios or fetch to send this data to your backend
    await axios.patch(`http://localhost:8000/addEquity/${firebase_Id}`, {
      offer_amount: amount,
      offer_equity: equity,
    });
    console.log("UPDATEDD");
    window.location.reload();
  };

  return (
    <div className="my-5">
      <h1 className="fw-bold"> Raise Equity </h1>
      <form onSubmit={handleSubmit} className="equity">
        <div className="form-group">
          <label>
            Amount to raise (INR):

          </label>
          <input
            type="text"
            value={amount}
            className="form-control"
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
        </div>
        <div className="form-group">
          <label>
            Corresponding Equity Offer:

          </label>
          <input
            type="text"
            value={equity}
            className="form-control"
            onChange={(e) => setEquity(e.target.value)}
          />
          <br />
        </div>
        
        <button type="submit">Submit</button>
        
      </form>
    </div>
  );
};

export default EquityRaising;
