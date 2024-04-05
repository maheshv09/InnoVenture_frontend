import { React, useEffect, useState } from "react";
import "./Invest.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import StartupInfo from "../StartupInfo/StartupInfo";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Invest = () => {
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
    //console.log("startup"+JSON.stringify(startups));
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

  const parseCSV = (csvData) => {
    const lines = csvData.split('\n');
    const data = lines.slice(1).map(line => {
      const [date, valuation] = line.split(',');
      return { date: new Date(date), valuation: parseFloat(valuation) };
    });
    return data;
  };

  const getAvgGrowth = async (currStartup) => {
    //console.log("DATAAA:", currStartup);
    const response = await axios.get(
      `http://localhost:8000/getStartDet/${currStartup.firebase_Id}` // Assuming you have an endpoint to fetch details of a single startup by ID
    );
    const userDet = response.data;
    const data1 = userDet.data.content;
    const data = parseCSV(data1);
    //console.log("DATA:", data);
    let sumSlope = 0;
    for (let i = 1; i < data.length; i++) {
      const currentDate = new Date(data[i].date).getTime();
      const prevDate = new Date(data[i - 1].date).getTime();
      const currentValuation = data[i].valuation;
      const prevValuation = data[i - 1].valuation;
      //console.log("DATESS:-", currentDate)
      const timeDiff = (currentDate - prevDate) / (1000 * 3600 * 24 * 365); // Time difference in years
      //console.log("DATEDIFF:-", timeDiff)
      const slope = (currentValuation - prevValuation) / timeDiff;
      //console.log("slope:-", slope);
      if (slope)
        sumSlope += slope;
    }
    //console.log("slope:", sumSlope);
    const avgSlope = sumSlope / (data.length - 1);
    console.log("Average Growth:", avgSlope.toFixed(2));
    const response2 = await axios.patch(
      `http://localhost:8000/addAvgGrowth/${currStartup.firebase_Id}`,
      {
        avgGrowth: avgSlope,
      }
    );
    return avgSlope;
  };
  const sortStartups = async (type) => {
    let sortedStartups = [...startups]; // Create a copy of the products array
    console.log("initial" + sortedStartups);
    switch (type) {
      case 0:
        // Use Promise.all to wait for all async operations to complete
        await Promise.all(sortedStartups.map(async (startup) => {
          startup.avgGrowth = await getAvgGrowth(startup); // Calculate and store avgGrowth
        }));

        // Sort by avgGrowth
        sortedStartups.sort((a, b) => b.avgGrowth - a.avgGrowth);
        break;

      default:
        break;
    }

    setStartups(sortedStartups); // Update state with the sorted array
    console.log("sorted" + JSON.stringify(sortedStartups));
  };

  return (
    <section id="startup" class="startup section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>Invest Into Equities</h2>
          <h5 className="text-muted"></h5>
        </div>

        <div className="d-flex justify-content-end ">
          <select onClick={(e) => sortStartups(parseInt(e.target.value))}>
            <option value="0">Sort by growth</option>

          </select>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="select"
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

        <div class="row">

          {filteredStartups.map((startup, index) => {
            return (
              <Link to={`/startup/${startup.firebase_Id}`} key={index} class="col-lg-6 mt-3">

                <div class="member d-flex align-items-start">
                  <div class="pic col-md-4 my-auto"><img src={startup.photo} class="img-fluid" alt="" /></div>
                  <div class="member-info col-md-6">
                    <h4>{startup.name}</h4>
                    <p className="fw-bold "><strong>Category :</strong> {startup.categories}</p>
                    <span><strong>Founder Name :</strong> {startup.founder} </span>

                    <p>{startup.description}</p>


                  </div>
                </div>

              </Link>
            )
          })}


        </div>

      </div>
    </section>
  );
};

export default Invest;
