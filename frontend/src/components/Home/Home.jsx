import React from "react";
import "./Home.css";
import { Link,useNavigate } from "react-router-dom";
import img from "../Images/login_image.jpg"
import img2 from "../Images/investment.jpg"
import img3 from "../Images/galaxy2.jpg"


const Home = () => {
  return (
  <div >
      {/* <nav>
        <ul classNameName="navbar">
          <li><Link to="/invest">Invest</Link></li>
          <li><Link to="/trends">Trends</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li ><Link to="/logout">Logout</Link></li>
        </ul>
      </nav> */}

<nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">InnoVenture</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="./home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./invest">Invest</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./trend">Trends</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success" type="submit" >Search</button>
    </form>
</nav>


<div>
        <h2>Welcome to the Home Page!</h2>
</div>
<div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img  src={img3} className="d-block  " alt="..." width='200PX'/>
      <div className="carousel-caption d-none d-md-block">
        <h5>So why InnoVenture?</h5>
        <p>BEcause we your money!</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={img} className="d-block w-100" alt="..."  width="300px"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Grow your startup</h5>
        <p>Hassle free platform between investors and founder!</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={img} className="d-block w-100" alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
<h3>Out Testimonials</h3>
<div className="testimonials-section">
  {/* Testimonial 1 (Left-aligned) */}
  <div className="row align-items-center mb-4">
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <p className="card-text">Testimonial content...</p>
          <h5 className="card-title">- Person's Name</h5>
        </div>
      </div>
    </div>
    <div className="col-md-6"></div> {/* Empty column for alignment */}
  </div>

  {/* Testimonial 2 (Right-aligned) */}
  <div className="row align-items-center mb-4">
    <div className="col-md-6"></div> {/* Empty column for alignment */}
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <p className="card-text">Testimonial content...</p>
          <h5 className="card-title">- Person's Name</h5>
        </div>
      </div>
    </div>
  </div>

  {/* More testimonials... */}
</div>

</div>
  );
};

export default Home;
