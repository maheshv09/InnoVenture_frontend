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
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/getAllStartups"
        );
        setStartups(response.data.data);
        setFilteredStartups(response.data.data);
      } catch (error) {
        console.error("Error fetching startups:", error);
      }
    };

    fetchStartups();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredStartups(startups);
    } else {
      const filtered = startups.filter((startup) =>
        startup.categories.includes(selectedCategory)
      );
      setFilteredStartups(filtered);
    }
  }, [startups, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h2>Explore the Listed Startups!</h2>
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All" style={{ textAlign: "center" }}>
            All
          </option>

          {Array.from(
            new Set(
              startups.flatMap((startup) => startup.categories.split(", "))
            )
          ).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="page">
        {filteredStartups.map((startup, index) => (
          <Link to={`/marketPlace/${startup.firebase_Id}`} key={index}>
            {/* Link to detailed page */}
            <div className="card1">
              <img src={startup.photo} className="card-img-top" alt="Startup" />
              <div className="card-body">
                <h5 className="card-title">{startup.name}</h5>
                <p className="card-text">{startup.description}</p>
                <p className="card-text">Categories: {startup.categories}</p>
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
