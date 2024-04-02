import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access URL params
import "./StartupInfo.css";
// Assuming you have a CSS file for styling
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import QnA from "../QnA/QnA";

const StartupInfo = () => {
  const [startup, setStartup] = useState(null);
  const { firebase_Id } = useParams(); // Get the startup ID from URL params
  const [reqEquity, setReqEquity] = useState(0);
  const [reqAmount, setReqAmount] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const user = useAuthState(auth);
  const uid = user[0]?.uid;
  console.log("FIREBASE ID :", firebase_Id);
  const renderChart = () => {
    if (startup && startup.data) {
      console.log("STARTUP DATA :", startup.data);
      const parsedData = startup.data.content
        .split("\n")
        .map((line) => line.split(","));

      parsedData.shift(); // Remove header row
      const dates = parsedData.map((entry) => entry[0]); // Assuming date is at index 0
      const valuationInLakhs = parsedData.map((entry) => parseFloat(entry[1])); // Assuming open is at index 1

      let data = [];

      for (let i = 0; i < dates.length; i++) {
        let obj = {};
        obj["dates"] = dates[i];
        obj["valuationInLakhs"] = valuationInLakhs[i];

        data.push(obj);
      }
      // console.log("DATES :", dates);
      // console.log("Open At :", openValues);

      console.log("PArsedDATA---->", parsedData);
      return (
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dates" />
          <YAxis domain={["auto", "auto"]} tickCount={10} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valuationInLakhs" stroke="#8884d8" />
        </LineChart>
      );
    }
    return null;
  };
  useEffect(() => {
    if (startup)
      setReqEquity((reqAmount / startup.offer_amount) * startup.offer_equity);
  }, [reqAmount]);

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getStartDet/${firebase_Id}` // Assuming you have an endpoint to fetch details of a single startup by ID
        );
        console.log("MyResponse :", response.data);
        setStartup(response.data);
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    fetchStartup();
  }, [startup]); // Fetch startup details whenever ID changes

  const handleBuy = async () => {
    try {
      const userResp = await axios.get(
        `http://localhost:8000/getUser/${firebase_Id}`
      );
      const userDoc = userResp.data;
      const response = await axios.patch(
        `http://localhost:8000/buyEquity/${firebase_Id}`,
        {
          buyer: userDoc.name,
          buyerMail: userDoc.email,
          reqEquity: reqEquity,
          amount: reqAmount,
        }
      );
      const obj = userDoc.equity;

      console.log("OOOO:", obj);
      if (obj) {
        obj[`${startup.name}`] = {
          purchasedAmount: reqAmount,
          purchasedEquity: reqEquity,
        };
      }
      console.log("OBJECTT:", obj);
      // const updatedEquity = {
      //   ...startup.equity,
      //   [startup.name]: {
      //     purchasedAmount: reqAmount,
      //     purchasedEquity: reqEquity,
      //   },
      // };

      const response2 = await axios.patch(
        `http://localhost:8000/updateUser/${uid}`,
        {
          equity: obj,
        }
      );
      setAllDone(true);
      toast.success("Paise udgaye!!");
      console.log("MyResponse :", response.data);
      console.log("MyResponse2 :", response2.data);
      setStartup(response.data);
    } catch (error) {
      console.error("Error fetching startup:", error);
    }
  };

  return (
    <div>
      {startup ? (
        <div className="startup-info">
          <h2>{startup.name}</h2>
          <p>
            <strong>Description:</strong> {startup.description}
          </p>
          <p>
            <strong>USP:</strong> {startup.usp}
          </p>
          <p>
            <strong>offer_amount:</strong>
            {startup.offer_amount}
          </p>
          <p>
            <strong>offer_equity:</strong> {startup.offer_equity}
          </p>
          <Link to="/videoMeet">
            <button>Video Call</button>
          </Link>
          <Link to={`/report/${firebase_Id}`}>
            <button>Report Startup</button>
          </Link>
          <label>Enter Amount required :</label>
          <input type="text" onChange={(e) => setReqAmount(e.target.value)} />
          <button onClick={handleBuy}>Check</button>
          {startup.data && (
            <div>
              <p>
                <strong>Data:</strong>
              </p>
              <pre>{renderChart()}</pre>
            </div>
          )}
          <img src={startup.photo}></img>
          <div>
            <h3>List of Investors</h3>
            <ul>
              {startup.investment.map((investor, index) => (
                <li key={index}>
                  <strong>Investor Name:</strong> {investor.investorName},{" "}
                  <strong>Investment Amount:</strong>{" "}
                  {investor.investmentAmount}, <strong>Equity:</strong>{" "}
                  {investor.equity}, <strong>Valuation:</strong>{" "}
                  {investor.valuation}
                </li>
              ))}
            </ul>
          </div>
          <Link to={`/qna/${firebase_Id}`}>
            <button>Go to QnA Page</button>
          </Link>
        </div>
      ) : (
        <p>Loading123...</p>
      )}
    </div>
  );
};

export default StartupInfo;
