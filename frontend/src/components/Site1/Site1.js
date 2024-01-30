import React, { useEffect, useState } from "react";
import "./Site1.css"
import img from "../Images/company2.jpg"
import img2 from "../Images/gold.jpg"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast, Button } from 'react-bootstrap';
const handlePool=()=>{
    return(
        alert("Added to Pool!")
    )
}

const AboutUs = () => (
    <div className="sectionBox">
        <h3>About Us</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</p>
        
    </div>
);

const CompanyOverview = () => (
    
    <div className="CompanyOverviewBox" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h3>About Our Startup</h3>
        <p className="company-description">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

        </p>
        <ul className="company-info list-unstyled">
            <li>Founding Date: Lorem Ipsum</li>
            <li>Annual Revenue: Lorem Ipsum</li>
            <li>Sector: Lorem Ipsum</li>
            {/* Add other info as needed */}
        </ul>
    </div>
);




const useScrollEffect = () => {
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.sectionBox, .CompanyOverviewBox, .productsBox');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                // Check if the top of the element is less than 80% of the window height
                if (rect.top < window.innerHeight * 0.8) {
                    el.classList.add('visible');
                }
            });
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
};

const Products=()=>{
    return(
        
<div className="productsBox" >
<h3>Products</h3><br />

    <div className="row">
      <div className="col-md-4">
      <div className="card1"  style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundPosition: 'center'  , width: '18rem'}}>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="btn btn-primary"  onClick={handlePool}>Add to Pool</button>
  </div><br/>

</div>
      </div>
      <div className="col-md-4">
      <div className="card1"  style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundPosition: 'center'  , width: '18rem'}}>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="btn btn-primary"  onClick={handlePool}>Add to Pool</button>
  </div>

</div>
      </div>
      <div className="col-md-4">
      <div className="card1"  style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundPosition: 'center'  , width: '18rem'}}>
   
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="btn btn-primary"  onClick={handlePool}>Add to Pool</button>


  </div>

</div>
      </div>
    </div>
  </div>
    )
}


const App = () => {
    useScrollEffect();
    const [showToast, setShowToast] = useState(false);

  const handlePool = () => {
    setShowToast(true);
    // Optionally, set a timeout to automatically hide the toast after a few seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

    return (
        <div>
            <h1>TechCorp</h1>
            <AboutUs />
            <br/>
            <CompanyOverview/>
            <br/>
            <Products />
        </div>
    );
};

export default App
