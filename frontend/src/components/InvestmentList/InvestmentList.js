import React, { useState, useEffect } from "react";
import "./InvestmentList.css";
import axios from "axios";

const InvestmentList = ({ firebase_Id }) => {
  const [prevInvestments, setPrevInvestments] = useState([]);
  const [newInvestments, setNewInvestments] = useState([]);
  const [investorName, setInvestorName] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [valuation, setValuation] = useState("");
  const [equity, setEquity] = useState("");

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        // Fetch startup details including investments
        const response = await axios.get(
          `http://localhost:8000/getStartDet/${firebase_Id}`
        );
        // Extract previous and new investments from the response
        const prev = response.data.investment || [];
        const newInv = response.data.newInvestors || [];
        console.log("NEWWW:", newInv);
        setPrevInvestments(prev);
        setNewInvestments(newInv);
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    };
    fetchInvestments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new investment object
    const newInvestment = {
      investorName,
      investmentAmount,
      valuation,
      equity,
    };
    var inv = prevInvestments;
    inv.push(newInvestment);
    // Send new investment data to backend
    try {
      const response = await axios.patch(
        `http://localhost:8000/addInvestments/${firebase_Id}`,
        { investment: inv } // Sending only the new investment
      );
      console.log("Response:", response);

      // Update new investments state to include the new investment
      setNewInvestments([...newInvestments, newInvestment]);

      // Clear form fields after successful submission
      setInvestorName("");
      setInvestmentAmount("");
      setValuation("");
      setEquity("");
    } catch (error) {
      console.error("Error adding investment:", error);
    }
  };

  return (
    <div>
      <h1>Investments</h1>

      {/* New Investment Form */}
      <form onSubmit={handleSubmit}>
        <label>Investor Name:</label>
        <input
          type="text"
          value={investorName}
          onChange={(e) => setInvestorName(e.target.value)}
        />
        <br />
        <label>Investment Amount:</label>
        <input
          type="text"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
        />
        <br />
        <label>Valuation:</label>
        <input
          type="text"
          value={valuation}
          onChange={(e) => setValuation(e.target.value)}
        />
        <br />
        <label>Equity:</label>
        <input
          type="text"
          value={equity}
          onChange={(e) => setEquity(e.target.value)}
        />
        <br />
        <button type="submit">Add Investment</button>
      </form>

      {/* Display Previous Investments */}
      <div>
        <h2>Previous Investments</h2>
        <ul>
          {prevInvestments.map((investment, index) => (
            <li key={index}>
              <strong>Investor Name:</strong> {investment.investorName},{" "}
              <strong>Investment Amount:</strong> {investment.investmentAmount},{" "}
              <strong>Valuation:</strong> {investment.valuation},{" "}
              <strong>Equity:</strong> {investment.equity}
            </li>
          ))}
        </ul>
      </div>

      {/* Display New Investments */}
      <div>
        <h2>New Investments</h2>
        <ul>
          {newInvestments.map((investment, index) => (
            <li key={index}>
              <strong>Buyer:</strong> {investment.buyer},{" "}
              <strong>Buyer Mail:</strong> {investment.buyerMail},{" "}
              <strong>Buyer Amount:</strong> {investment.buyerAmount},{" "}
              <strong>Buyer Equity:</strong> {investment.buyerEquity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvestmentList;
