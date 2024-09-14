import {
  FaBuilding,
  FaStickyNote,
  FaRegHandPointUp,
  FaRupeeSign,
  FaWeight,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdOutlineWarning, MdVideoCall } from "react-icons/md";
import { LuBadgePercent } from "react-icons/lu";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access URL params
import VideoPlayer from "../VideoPlayer/VideoPlayer";
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
  const navigate = useNavigate();
  const user = useAuthState(auth);
  const uid = user[0]?.uid;
  console.log("FIREBASE ID startup:", firebase_Id);
  console.log("FIREBASE ID user:", uid);

  const renderChart = () => {
    if (startup && startup.data) {
      //console.log("STARTUP DATA :", startup.data);
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

      //console.log("PArsedDATA---->", parsedData);
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
    console.log("useeffect");
    const fetchStartup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getStartDet/${firebase_Id}` // Assuming you have an endpoint to fetch details of a single startup by ID
        );

        setStartup(response.data);
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    fetchStartup();
  }, [firebase_Id]); // Fetch startup details whenever ID changes

  const navigateToPayment = () => {
    navigate(`/payment/${reqAmount}`);
  };

  const handleBuy = async () => {
    try {
      const userResp = await axios.get(
        `http://localhost:8000/getUser/${uid}`
      );
      const userDoc = userResp.data;
      console.log(userDoc);
      
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
      navigateToPayment();
      //toast.success("Paise udgaye!!");
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
        <section id="startup-info" class="startup-info">
          <div class="px-5" data-aos="fade-up">
            <h2 className="fw-bold my-4">{startup.name}</h2>

            <div class="row">
              <div class="col-lg-5 d-flex align-items-stretch">
                <div class="info">
                  <div class="card1">
                    <FaBuilding />
                    <h4>Name : </h4>
                    <p>{startup.name} </p>
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

                  <div className="row">
                    <div class="card1 col">
                      <MdVideoCall />
                      <Link to="/videoMeet">
                        <button>Video Call</button>
                      </Link>
                    </div>

                    <div class="card1 col">
                      <MdOutlineWarning />
                      <Link to={`/report/${firebase_Id}`}>
                        <button>Report Startup</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-7 mt-5 mt-lg-0">
                <div className="chart">
                  <h4 className="fw-bold mb-3">Sales Data</h4>
                  {startup.data && (
                    <div className="data">
                      <pre>{renderChart()}</pre>
                    </div>
                  )}

                  <div class="form-group ">
                    <h5 className="fw-bold ">Buy Equity</h5>
                    <input
                      onChange={(e) => setReqAmount(e.target.value)}
                      class="form-control"
                      name="equity"
                      type="number"
                      placeholder="Enter Amount Required"
                      required
                    ></input>
                  </div>
                  <div class="text-center mt-3">
                    <button
                      type="submit"
                      onClick={reqAmount != 0 ? handleBuy : ""}
                    >
                      Buy Equity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <VideoPlayer />
          <div className="container startup-info">
            <h2 className="fw-bold my-5">List of Investors</h2>
            <div className="row">
              {startup.investment &&
                startup.investment.map((investor, index) => (
                  <div className="col-md-4 " key={index}>
                    <div class="info investment">
                      <FaBuilding />
                      <h4>
                        Name : <span>{investor.investorName}</span>{" "}
                      </h4>
                      <h4>
                        Amount : <span> Rs. {investor.investmentAmount}</span>{" "}
                      </h4>
                      <h4>
                        Equity : <span> $ {investor.equity}</span>{" "}
                      </h4>
                      <h4>
                        Valuation : <span> $ {investor.valuation}</span>{" "}
                      </h4>
                    </div>
                  </div>
                ))}
            </div>

            <div className="d-flex justify-content-center mt-5">
              <Link to={`/qna/${firebase_Id}`}>
                <button className="qna">Go to QnA Page</button>
              </Link>
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
