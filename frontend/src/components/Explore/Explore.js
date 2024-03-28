import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import StartupInfo from "../StartupInfo/StartupInfo";
import "./Explore.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FaTwitter, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";


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
    //console.log(startups)
  }, []);



  return (
    <>
      <section id="startup" class="startup section-bg">
        <div class="container" data-aos="fade-up">

          <div class="section-header">
            <h2>Explore Startups</h2>
            <h5 className="text-muted">Uncover innovation and potential with a click. Explore a diverse range of groundbreaking startups, fostering inspiration, collaboration, and partnership opportunities to drive entrepreneurial creativity forward.</h5>
          </div>

          <div class="row">

            {startups.map((startup, index) => {
              return (
                <Link to={`/startup/${startup.firebase_Id}`} key={index}  class="col-lg-6 mt-3">
                  
                    <div class="member d-flex align-items-start">
                      <div class="pic col-md-4 my-auto"><img src={startup.photo} class="img-fluid" alt="" /></div>
                      <div class="member-info col-md-6">
                        <h4>{startup.name}</h4>
                        <span>Founder Name</span>
                        <p>{startup.description}</p>
                        <div class="social">
                          <a href=""><FaTwitter /></a>
                          <a href=""><FaFacebook /></a>
                          <a href=""><FaInstagram /></a>
                          <a href=""> <FaYoutube /> </a>
                        </div>
                      </div>
                    </div>
                  
                </Link>
              )
            })}


          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
