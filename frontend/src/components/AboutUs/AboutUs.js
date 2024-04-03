import React from 'react'
import about from "../Images/about.jpg";
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section id="about" class="about mt-5">

      <div class="container pt-5" data-aos="fade-up">
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
  )
}

export default AboutUs