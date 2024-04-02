import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserMarket.css";
const UserMarket = ({ selectedProducts, setSelectedProducts }) => {
  const { firebase_Id } = useParams();
  const [startup, setStartup] = useState(null);
  const [products, setProducts] = useState([]);
  //const [selectedProducts, setSelectedProducts] = useState([]);
  console.log("SEL_PRODS:", selectedProducts);
  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getStartDet/${firebase_Id}`
        );
        setStartup(response.data);
        const response1 = await axios.get(
          `http://localhost:8000/getProducts/${firebase_Id}`
        );
        setProducts(response1.data.products);
        console.log("RESPONSE :",response1.data.products)
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    fetchStartup();
  }, [firebase_Id]); // Added firebase_Id as a dependency to fetch data when it changes
  



  const getAggregate=(productRatingArray)=>{

    console.log(productRatingArray)
    var avgRating=0.0;
    var sum=0.0;
    if(productRatingArray){
      for (var i=0;i<productRatingArray.length;i++) {
        sum=parseFloat(sum)+parseInt(productRatingArray[i]);
        // console.log("Cuurent i :",i) 
      }
      // console.log("SUM :",sum)
      avgRating=parseFloat(sum)/parseFloat(productRatingArray.length)
    }
    console.log("RATING TYPE :",avgRating)
    return parseFloat(avgRating)
  }

  const handleAddToCart = (productId) => {
    const productToAdd = products.find((product) => product._id === productId);
    if (productToAdd) {
      setSelectedProducts([...selectedProducts, productToAdd]);
      toast.success("Product added to cart!");
    }
  };

  const sortProducts = (type) => {
    let sortedProducts = [...products]; // Create a copy of the products array
  
    switch (type) {
      case 0:
        sortedProducts.sort((a, b) =>  getAggregate(b.ratings)-getAggregate(a.ratings)); // Sort by review (rating)
        break;
      case 1:
        sortedProducts.sort((a, b) => a.price - b.price); // Sort by price
        break;
      case 2:
        // Sort by category
        sortedProducts.sort((a, b) => {
          if (a.category < b.category) return -1;
          if (a.category > b.category) return 1;
          return 0;
        }); 
        break;
      default:
        break;
      }
  
    setProducts(sortedProducts); // Update state with the sorted array
  };
  console.log("PRODUCTS :",products)

  return (
    <div>
      <h2>Startup Details</h2>
      {startup && (
        <div>
          <h3>{startup.name}</h3>
          <p>{startup.description}</p>
          <p>
            <strong>USP:</strong> {startup.usp}
          </p>
          <img src={startup.photo} alt="Startup Photo" />
        </div>
      )}
      <h2>Products</h2>
      <select onChange={(e) => sortProducts(parseInt(e.target.value))}>
        <option value="5">No Filter</option>
  <option value="0">Sort by Review</option>
  <option value="1">Sort by Price</option>
  <option value="2">Sort by Category</option>
</select>


      <div className="product-cards">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {product.photo && <img src={product.photo} alt="Product" />}
            <p>Price: {product.price}</p>
            <p>Ratings: {getAggregate(product.ratings)}</p>
            <button onClick={() => handleAddToCart(product._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMarket;
