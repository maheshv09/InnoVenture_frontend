import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <>


      <footer class="text-white text-center text-lg-start footer mt-5">

        <div class="container p-4">

          <div class="row mt-4">

            <div class="col-lg-4 col-md-12 mb-4 mb-md-0 pe-5">
              <h5 class="text-uppercase mb-4">About company</h5>

              <p>
              At InnoVenture, we're passionate about innovation, connection, and the relentless pursuit of the future. Our platform is more than just a digital space—it's a dynamic ecosystem where visionaries, startups, and enthusiasts converge to explore, collaborate, and drive progress.
              </p>



              <div class="mt-4">

                <a type="button" class="btn btn-floating btn-warning btn-lg me-3"><i class="fab fa-facebook-f"></i></a>
                <a type="button" class="btn btn-floating btn-light btn-lg me-3"><i class="fab fa-dribbble"></i></a>
                <a type="button" class="btn btn-floating btn-light btn-lg me-3"><i class="fab fa-google-plus-g"></i></a>


              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4 pb-1">Subscribe to Us</h5>
              <p>Stay updated with our latest news and offerings.</p>

              <div class="form-outline form-white mb-4">
                <input type="text" id="formControlLg" class="form-control form-control-lg w-75" placeholder="Subscribe to Newsletter" />
                <button class="btn btn-primary mt-3">Subscribe</button>
              </div>


            </div>

            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4">Contact Information</h5>
              <ul class="fa-ul" style={{ marginLeft: "1.65em" }}>
                <li class="mb-3">
                  <span class="fa-li"><i class="fas fa-home"></i></span><span class="ms-2">Pune</span>
                </li>
                <li class="mb-3">
                  <span class="fa-li"><i class="fas fa-envelope"></i></span><span class="ms-2">info@innoventure.com</span>
                </li>
                <li class="mb-3">
                  <span class="fa-li"><i class="fas fa-phone"></i></span><span class="ms-2"> +91 9876543210</span>
                </li>
              </ul>
            </div>

          </div>

        </div>



        <div class="text-center p-3" style={{ backgroundColor: "#045DE9" }}>
          <p>&copy; 2024 InnoVenture. All rights reserved.</p>
        </div>

      </footer>



    </>
  );
};

export default Footer;
