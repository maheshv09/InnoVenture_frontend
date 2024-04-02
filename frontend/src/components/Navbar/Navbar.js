import { signOut } from "firebase/auth";
import React from "react";
import auth from "../../firebase_init";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth);
    navigate("/");
    // alert("Logged out!!")
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "rgb(252, 223, 184)",
          fontFamily: "lucida-sans",
          fontSize: "large",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
            style={{ fontSize: "x-large", fontFamily: "georgia" }}
          >
            InnoVenture
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>{" "}
              </li>
              <li className="nav-item">
                <Link to="/explore" className="nav-link">
                  Explore
                </Link>{" "}
              </li>
              <li className="nav-item">
                <Link to="/invest" className="nav-link">
                  Invest
                </Link>{" "}
              </li>
              <li className="nav-item">
                <Link to="/aboutUs" className="nav-link">
                  About Us
                </Link>{" "}
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>{" "}
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>{" "}
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
        <form className="d-flex" role="search">
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
