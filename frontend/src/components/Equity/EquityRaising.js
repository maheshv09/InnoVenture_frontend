import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";

const EquityRaising = () => {
  const [amount, setAmount] = useState("");
  const [equity, setEquity] = useState("");
  const user = useAuthState(auth);
  const firebase_Id = user[0]?.uid;
  console.log("FIRBID:-", firebase_Id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send data to backend for equity raising
    console.log("Amount:", amount);
    console.log("Equity:", equity);
    // You can use axios or fetch to send this data to your backend
    await axios.patch(`http://localhost:8000/addEquity/${firebase_Id}`, {
      offer_amount: amount,
      offer_equity: equity,
    });
    console.log("UPDATEDD");
  };

  return (
    <div>
      <h3>Equity Raising</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Amount to raise (INR):
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Corresponding Equity Offer:
          <input
            type="text"
            value={equity}
            onChange={(e) => setEquity(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EquityRaising;
