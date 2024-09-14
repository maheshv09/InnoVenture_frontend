import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../Images/hero-img.png";
import heroBg from "../Images/hero-bg.png";
import about from "../Images/about.jpg";
import value1 from "../Images/values-1.png"
import value2 from "../Images/values-2.png"
import value3 from "../Images/values-3.png"

const Home = () => {
  return (
    <>
      <section
        id="hero"
        class="hero d-flex align-items-center"
        style={{ background: `url(${heroBg}) top center no-repeat` }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-6 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">Welcome to InnoVenture</h1>
              <h2 data-aos="fade-up" data-aos-delay="400">
                Explore innovation, connect with visionary startups, and discover
            the future with InnoVenture.
              </h2>
              <div data-aos="fade-up" data-aos-delay="600">
                <div class="text-center text-lg-start">
                  <Link
                    to="/explore"
                    class="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Get Started</span>
                    <i class="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div
              class="col-lg-6 hero-img"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img src={`${heroImg}`} class="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>



      <section id="about" class="about">

      <div class="container" data-aos="fade-up">
        <div class="row gx-0">

          <div class="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
            <div class="content">
              <h3>Who We Are</h3>
              <h2> Explore innovation, connect with visionary startups, and discover
            the future with InnoVenture.</h2>
              <p>
              Whether you're an investor or a startup founder, InnoVenture is your
            go-to platform for exciting opportunities and the latest trends.
            Join us on this journey of exploration and growth.
              </p>
              <div class="text-center text-lg-start">
                <Link to="/explore" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                  <span>Explore</span>
                  
                </Link>
              </div>
            </div>
          </div>

          <div class="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
            <img src={`${about}`} class="img-fluid" alt="" />
          </div>

        </div>
      </div>

    </section>



    <section id="values" class="values mt-5">

      <div class="container" data-aos="fade-up">

        <header class="section-header">
          <h2>Our Services</h2>
          <p> Services we offfer to investors </p>
        </header>

        <div class="row">

          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div class="box">
              <img src={`${value1}`} class="img-fluid" alt="" />
              <h3>Explore Startups</h3>
              <p>Uncover innovation and potential with a click. Explore a diverse range of groundbreaking startups, fostering inspiration, collaboration, and partnership opportunities to drive entrepreneurial creativity forward.</p>
              <Link
                    to="/explore"
                    class="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Explore</span>
                  </Link>
            </div>
          </div>

          <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
            <div class="box">
              <img src={`${value2}`} class="img-fluid" alt="" />
              <h3>Invest</h3>
              <p>Drive the future with strategic investments. Connect with visionary founders, explore tailored opportunities, and contribute to shaping tomorrow's innovations with ease and confidence.</p>
              <Link
                    to="/invest"
                    class="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Invest</span>
                  </Link>
            </div>
          </div>

          <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="600">
            <div class="box">
              <img src={`${value3}`} class="img-fluid" alt="" />
              <h3>Marketplace</h3>
              <p>Access a vibrant ecosystem of innovation. Discover curated products, services, and investment opportunities from dynamic startups across industries, fostering connections and growth in a thriving entrepreneurial landscape.</p>
              <Link
                    to="/"
                    class="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Explore</span>
                  </Link>
            </div>
          </div>

        </div>

      </div>

    </section>



    </>
  );
};

export default Home;
