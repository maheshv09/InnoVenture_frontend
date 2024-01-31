import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../Images/login_image.jpg";
import img2 from "../Images/investment.jpg";
import img3 from "../Images/galaxy2.jpg";

const Home = () => {
  return (
    <div>
     
      <div className="home-cont">
        <img
          src="https://dubaitechnews.com/wp-content/uploads/2023/12/Startup-Web.jpg"
          alt=""
          className="home-img"
        />
        <div className="home-info">
          <h2>Welcome to InnoVenture</h2>
          <p>
            Explore innovation, connect with visionary startups, and discover
            the future with InnoVenture.
          </p>
          <p>
            Whether you're an investor or a startup founder, InnoVenture is your
            go-to platform for exciting opportunities and the latest trends.
            Join us on this journey of exploration and growth.
          </p>
          <Link to="/explore" className="btn btn-dark">
            Get Started
          </Link>
        </div>
      </div>

      {/* <h3>Out Testimonials</h3>
      <div className="testimonials-section">
        
        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <p className="card-text">Testimonial content...</p>
                <h5 className="card-title">- Person's Name</h5>
              </div>
            </div>
          </div>
          <div className="col-md-6"></div> 
        </div>

        
        <div className="row align-items-center mb-4">
          <div className="col-md-6"></div> 
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <p className="card-text">Testimonial content...</p>
                <h5 className="card-title">- Person's Name</h5>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="cards-container">
        <div className="home-card">
          <div className="card">
            <img
              src="https://hudsonici.com/wp-content/uploads/2021/11/2.png"
              className="card-img-top"
              alt="Explore"
            />
            <div className="card-body">
              <h5 className="card-title">Explore Startups</h5>
              <p className="card-text">
                Discover & connect with cutting-edge startups.
              </p>
              <Link to="/explore" className="btn btn-dark">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="home-card">
          <div className="card">
            <img src={img2} className="card-img-top" alt="Invest" />
            <div className="card-body">
              <h5 className="card-title">Invest</h5>
              <p className="card-text">
                Explore and invest in innovative startups.
              </p>
              <Link to="/invest" className="btn btn-dark">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="home-card">
          <div className="card">
            <img
              src="https://blog.cdn.cmarix.com/blog/wp-content/uploads/2020/03/How-to-Develop-a-Multi-Vendor-Ecommerce-Marketplace.jpg"
              className="card-img-top"
              alt="Marketplace"
            />
            <div className="card-body">
              <h5 className="card-title">Marketplace</h5>
              <p className="card-text">
                Browse and buy products from listed startups.
              </p>
              <Link to="/" className="btn btn-dark">
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="cards-container">
        <div className="home-card">
          <div className="custom-card">
            <img src={img2} className="card-img-top" alt="Invest" />
            <div className="card-body">
              <h5 className="card-title">Invest</h5>
              <p className="card-text">
                Explore and invest in innovative startups.
              </p>
              <Link to="/invest" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="home-card">
          <div className="custom-card">
            <img src={img} className="card-img-top" alt="Explore" />
            <div className="card-body">
              <h5 className="card-title">Explore Startups</h5>
              <p className="card-text">
                Discover and connect with cutting-edge startups.
              </p>
              <Link to="/explore" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="home-card">
          <div className="custom-card">
            <img
              src="https://blog.cdn.cmarix.com/blog/wp-content/uploads/2020/03/How-to-Develop-a-Multi-Vendor-Ecommerce-Marketplace.jpg"
              className="card-img-top"
              alt="Marketplace"
            />
            <div className="card-body">
              <h5 className="card-title">Marketplace</h5>
              <p className="card-text">
                Browse and buy products from listed startups.
              </p>
              <Link to="/" className="btn btn-primary">
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
