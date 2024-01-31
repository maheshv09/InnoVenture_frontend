import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../Images/login_image.jpg";
import img2 from "../Images/investment.jpg";
import img3 from "../Images/galaxy2.jpg";

const Home = () => {
  return (
    <div>
      {/* <nav>
        <ul classNameName="navbar">
          <li><Link to="/invest">Invest</Link></li>
          <li><Link to="/trends">Trends</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li ><Link to="/logout">Logout</Link></li>
        </ul>
      </nav> */}
      {/* <div>
        <h2>Welcome to the Home Page!</h2>
      </div> */}
      {/* <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img3} className="d-block  " alt="..." width="200PX" />
            <div className="carousel-caption d-none d-md-block">
              <h5>So why InnoVenture?</h5>
              <p>BEcause we your money!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={img} className="d-block w-100" alt="..." width="300px" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Grow your startup</h5>
              <p>Hassle free platform between investors and founder!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={img} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div> */}
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
