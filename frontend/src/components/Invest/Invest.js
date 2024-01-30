import React from "react";
import "./Invest.css";
import img from "../Images/gold.jpg"

import img2 from "../Images/company2.jpg"
import EquityProfile from '../Site2/Site2'; // Adjust the path accordingly

const equity = {
  name: "TechCorp Inc.",
  industry: "Technology",
  ceo: "Jane Doe",
  trends: [
    { month: "Jan", value: 120 },
    { month: "Feb", value: 210 },
    { month: "Mar", value: 180 },
    { month: "Apr", value: 250 },
    // ... more monthly data
  ],
  investors: [
    "Investor A",
    "Investor B",
    "Venture Capital XYZ",
    "Equity Fund 123",
    // ... more investors
  ]
};

const Home = () => {
  return (
    <div >
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
<h2>Invest into Equities!</h2>
<div className="page">
<div className="card1">
  <img src={img2} className="card-img-top" alt="..." />

  <div className="card-body">
    <h5 className="card-title">TechCorp Inc.</h5>
    <p className="card-text">This is a great equity to get started with . Trending and apealing market rates
</p>
    <a href="./site2" className="btn btn-primary">Go TechCorp</a>
    {/* <EquityProfile equity={equity} /> */}

  </div>
</div><br/>
<div className="card1">
  <img src={img} className="card-img-top" alt="..." />

  <div className="card-body">
    <h5 className="card-title">WasteMoney Pvt. Ltd.</h5>
    <p className="card-text">This is the best way to invest your money . Sell false cash to bank!!</p>
    <a href="./site1" className="btn btn-primary">Go wasteMoney</a>
  </div>
</div><br/>
<div className="card1">
  <img src={img} className="card-img-top" alt="..." />

  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div><br/>
<div className="card1">
  <img src={img} className="card-img-top" alt="..." />

  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div><br/>
<div className="card1">
  <img src={img} className="card-img-top" alt="..." />

  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
    </div>
  );
};

export default Home;
