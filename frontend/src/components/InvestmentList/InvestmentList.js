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
      <h2 className="fw-bold mt-3">Investments</h2>


      {/*  Add Product Modal Button*/}
      <div className="d-flex justify-content-end me-5">
        <button type="button" class="btn btn-color" data-bs-toggle="modal" data-bs-target="#investmentModal">
          Add Investment
        </button>
      </div>

      {/*  Add Product Modal */}
      <div class="modal fade" id="investmentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Add Investment</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit} className="product-form">

                <div class="form-group">
                  <label class="form-control-label ">Investor Name : </label>
                  <input type="text" id="name" name="name" placeholder="Enter Investor Name" class="form-control" value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)} required />
                </div>

                <div class="form-group">
                  <label class="form-control-label ">Investment Amount : </label>
                  <input type="text" id="amt" name="amt" placeholder="Investment Amount" class="form-control" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} required />
                </div>

                <div class="form-group">
                  <label class="form-control-label ">Valuation : </label>
                  <input type="text" id="val" name="val" placeholder="Valuation" class="form-control" value={valuation}
                    onChange={(e) => setValuation(e.target.value)} required />
                </div>

                <div class="form-group">
                  <label class="form-control-label ">Equity: </label>
                  <input type="text" id="desc" name="desc" placeholder="Equity" class="form-control" value={equity}
                    onChange={(e) => setEquity(e.target.value)} required />
                </div>

                <div class="row justify-content-center my-3 px-3">
                  <button class="btn-block btn-color" type="submit">Add Investment</button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>

      <div className="container row mt-5 mx-auto">
        <div className="col-md-6">
          <h2 className="fw-bold ">Previous Investments</h2>

          <div class="col-md-9 mx-auto" data-aos="zoom-out" data-aos-delay="200">

            {prevInvestments.map((investment, index) => (
              <div class="feature-box text-left mt-2" key={index}>
                <p><strong>Investor Name:</strong> {investment.investorName}</p>
                <p><strong>Investment Amount:</strong> {investment.investmentAmount}</p>
                <p><strong>Valuation:</strong> {investment.valuation}</p>
                <p><strong>Equity:</strong> {investment.equity}</p>
              </div>
            ))}


          </div>

        </div>

        <div className="col-md-6">
          {/* Display New Investments */}
          <div>
            <h2 className="fw-bold ">New Investments</h2>
            <div class="col-md-9 mx-auto" data-aos="zoom-out" data-aos-delay="200">

              {newInvestments.map((investment, index) => (
                <div class="feature-box text-left mt-2" key={index}>
                  <p><strong>Investor Name:</strong> {investment.buyer}</p>
                  <p><strong>Investment Mail:</strong> {investment.buyerMail}</p>
                  <p><strong>Valuation:</strong> {investment.buyerAmount}</p>
                  <p><strong>Equity:</strong> {investment.buyerEquity}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>



      {/* Display Previous Investments */}



    </div>
  );
};

export default InvestmentList;
