import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation, useParams } from "react-router-dom"; // Import useParams to access URL params
import "./StartupInfo.css"; // Assuming you have a CSS file for styling
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBuilding, FaStickyNote ,FaRegHandPointUp, FaRupeeSign, FaWeight, FaArrowLeft } from "react-icons/fa";
import {FaHandHoldingDollar} from "react-icons/fa6"
import { LuBadgePercent } from "react-icons/lu";



const StartupInfo = () => {
  const [startup, setStartup] = useState(null);
  const { firebase_Id } = useParams(); // Get the startup ID from URL params
  const [reqEquity, setReqEquity] = useState(0);
  const [reqAmount, setReqAmount] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const user = useAuthState(auth)
  const uid = user[0]?.uid
  console.log("FIREBASE ID :", firebase_Id)
  const renderChart = () => {
    if (startup && startup.data) {
      const parsedData = startup.data.content.split('\n').map(line => line.split(','));
      parsedData.shift(); // Remove header row
      const dates = parsedData.map(entry => entry[0]); // Assuming date is at index 0
      const openValues = parsedData.map(entry => parseFloat(entry[1])); // Assuming open is at index 1
      const highValues = parsedData.map(entry => parseFloat(entry[2])); // Assuming high is at index 2
      const lowValues = parsedData.map(entry => parseFloat(entry[3])); // Assuming low is at index 3

      const closeValues = parsedData.map(entry => parseFloat(entry[4])); // Assuming close is at index 4
      let data = [];

      for (let i = 0; i < dates.length; i++) {

        let obj = {}
        obj["dates"] = dates[i]
        obj["openValues"] = openValues[i]
        obj["highValues"] = highValues[i]
        obj["lowValues"] = lowValues[i]
        obj["closeValues"] = closeValues[i]

        data.push(obj)
      }
      console.log("DATES :", dates)
      console.log("Open At :", openValues)

      console.log("PArsedDATA---->", parsedData)
      return (
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dates" />
          <YAxis domain={['auto', 'auto']} tickCount={10} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="openValues" stroke="#8884d8" />
          <Line type="monotone" dataKey="highValues" stroke="#82ca9d" />
          <Line type="monotone" dataKey="lowValues" stroke="#ffc658" />
          <Line type="monotone" dataKey="closeValues" stroke="#ff7300" />
        </LineChart>
      );
    }
    return null;
  };
  useEffect(() => {
    if (startup)
      setReqEquity((reqAmount / (startup.offer_amount)) * startup.offer_equity)

  }, [reqAmount]);


  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getStartDet/${firebase_Id}` // Assuming you have an endpoint to fetch details of a single startup by ID
        );
        console.log("MyResponse :", response.data)
        setStartup(response.data);
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    fetchStartup();
  }, [startup]); // Fetch startup details whenever ID changes


  const handleBuy = async () => {
    try {

      const response = await axios.patch(
        `http://localhost:8000/buyEquity/${firebase_Id}`,
        {
          reqEquity: reqEquity,
          amount: reqAmount
        }
      );

      const response2 = await axios.patch(
        `http://localhost:8000/updateUser/${uid}`,
        {
          purchasedAmount: reqAmount,
          purchasedEquity: reqEquity
        }
      )
      setAllDone(true)
      toast.success("Equity Purchase Successfull !!")
      console.log("MyResponse :", response.data)
      console.log("MyResponse2 :", response2.data)
      setStartup(response.data);
    } catch (error) {
      console.error("Error fetching startup:", error);
    }
  }

  return (
    <div>
      {startup ? (
        <section id="startup-info" class="startup-info">
          <div class="px-5" data-aos="fade-up">

          <h2 className="fw-bold my-4">{startup.name}</h2>
          
            <div class="row">

              <div class="col-lg-5 d-flex align-items-stretch">
                <div class="info">
                  <div class="card1">
                    <FaBuilding />
                    <h4>Name : </h4>
                    <p>{startup.name } </p>
                  </div>

                  <div class="card1">
                    <FaStickyNote />
                    <h4>Description :</h4>
                    <p>{startup.description}</p>
                  </div>

                  <div class="card1">
                  <FaRegHandPointUp />
                    <h4>USP :</h4>
                    <p>{startup.usp}</p>
                  </div>

                  <div className="row">
                  <div class="card1 col">
                  <FaRupeeSign />
                    <h4>Offer Amount</h4>
                    <p>{startup.offer_amount}</p>
                  </div>

                  <div class="card1 col">
                  <FaWeight />
                    <h4>Offer Equity:</h4>
                    <p>{startup.offer_equity}</p>
                  </div>
                  </div>

                 <div className="row">
                 <div class="card1 col">
                  <LuBadgePercent />
                    <h4>Available Equity : </h4>
                    <p>{startup.availableEquity} % </p>
                  </div>

                  <div class="card1 col">
                  <FaHandHoldingDollar />
                    <h4>Startup Valuation</h4>
                    <p>{startup.valuation}</p>
                  </div>
                 </div>

                </div>

              </div>

              <div class="col-lg-7 mt-5 mt-lg-0">
                <div className="chart">
                  <h4 className="fw-bold mb-3">Sales Data</h4>
                {
                  startup.data && (
                    <div className="data">
                <pre>
                  {renderChart()}
                </pre>
                </div>
                  )
                }


                <div class="form-group ">
                  <h5  className="fw-bold ">Buy Equity</h5>
                  <input onChange={(e)=>setReqAmount(e.target.value)} class="form-control" name="equity" type='number' placeholder="Enter Amount Required" required></input>
                </div>
                <div class="text-center mt-3"><button type="submit" onClick={reqAmount != 0 ? handleBuy : ''}>Buy Equity</button></div>



                </div>
              </div>

            </div>

          </div>
        </section>
      ) : (
        <p>Loading123...</p>
      )}
    </div>
  );
};

export default StartupInfo;
