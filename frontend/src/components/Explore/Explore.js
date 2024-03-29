import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import StartupInfo from "../StartupInfo/StartupInfo";
import "./Explore.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Home = () => {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/getAllStartups"
        );
        setStartups(response.data.data);
      } catch (error) {
        console.error("Error fetching startups:", error);
      }
    };

    fetchStartups();
  }, []);

  return (
    <div>
      <h2>Invest into Equities!</h2>
      <div className="page">
        {startups.map((startup, index) => (
          <Link to={`/marketPlace/${startup.firebase_Id}`} key={index}>
            {" "}
            {/* Link to detailed page */}
            <div className="card1">
              <img src={startup.photo} className="card-img-top" alt="Startup" />
              <div className="card-body">
                <h5 className="card-title">{startup.name}</h5>
                <p className="card-text">{startup.description}</p>
                <a href="#" className="btn btn-primary">
                  Go {startup.name}
                </a>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
