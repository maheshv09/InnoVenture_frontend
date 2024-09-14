import { signOut } from "firebase/auth";
import React from "react";
import auth from "../../firebase_init";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './Navbar.css'
import logo from "../Images/logo.png"

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogOut = async () => {
    await signOut(auth);
    navigate("/");
    // alert("Logged out!!")
  };
  return (
    <>
      <nav class="navbar navbar-expand-md navbar-light fixed-top shadow">
        <div class="container">
          <Link class="navbar-brand d-xs-block py-3" to="#">
            <img src={`${logo}`} height="40" alt="Company Logo" />
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav me-auto">

              {
                location.pathname !== '/startup' ?
                  <>
                    <li class="nav-item">
                      <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/explore">Explore Startups</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link mx-1" to="/invest">Invest</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link mx-1" to="/aboutUs">About Us</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link mx-1" to="/cart">Cart</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link mx-1" to="/profile">Profile</Link>
                    </li>
                    

                  </>
                  :
                  ""
              }
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item logout">
                <button class="mx-1  btn " onClick={handleLogOut}>Log Out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
