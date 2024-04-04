import { FaDollarSign, FaStar } from "react-icons/fa";

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
  const user = useAuthState(auth);
  console.log("USERRRRR:", user);
  const firebaseId = user[0]?.uid;
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
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    fetchStartup();
  }, [firebase_Id]); // Added firebase_Id as a dependency to fetch data when it changes
  const getAggregate = (productRatingArray) => {
    console.log(productRatingArray);
    var avgRating = 0.0;
    var sum = 0.0;
    if (productRatingArray) {
      for (var i = 0; i < productRatingArray.length; i++) {
        sum = parseFloat(sum) + parseInt(productRatingArray[i]);
        // console.log("Cuurent i :",i)
      }
      // console.log("SUM :",sum)
      avgRating = parseFloat(sum) / parseFloat(productRatingArray.length);
    }
    console.log("RATING TYPE :", avgRating);
    return parseFloat(avgRating);
  };

  const sortProducts = (type) => {
    let sortedProducts = [...products]; // Create a copy of the products array

    switch (type) {
      case 0:
        sortedProducts.sort(
          (a, b) => getAggregate(b.ratings) - getAggregate(a.ratings)
        ); // Sort by review (rating)
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
  const handleAddToCart = async (productId) => {
    const productToAdd = products.find((product) => product._id === productId);
    if (productToAdd) {
      setSelectedProducts([...selectedProducts, productToAdd]);
      console.log("PRODDD:", productToAdd);
      var obj = {};
      const userResp = await axios.get(
        `http://localhost:8000/getUser/${firebaseId}`
      );
      const userDoc = userResp.data;
      obj = userDoc.cart;
      console.log("OBJJJJJJ:", obj);
      const price = parseFloat(productToAdd.price.replace("rs", ""));
      if (productToAdd.name in obj) {
        obj[productToAdd.name].quantity += 1;
        // obj[productToAdd.name].price =
        //   parseInt(obj[productToAdd.name].price) + parseInt(price);
      } else {
        console.log("HII1:", obj);
        obj[productToAdd.name] = {
          quantity: 1,
          price: price,
          id: productToAdd._id,
          review: 0,
        };
        console.log("HII2:", obj);
      }

      if (obj) {
        console.log("OBJ:", obj);
        const resp = await axios.patch(
          `http://localhost:8000/updateUser/${userDoc.firebase_Id}`,
          {
            cart: obj,
          }
        );
        console.log("OBJ:", resp);
      }
      toast.success("Product added to cart!");
    }
  };

  return (
    <div>
      {startup && (
        <section id="about" class="about user_market">

          <div class="container" data-aos="fade-up">
            <div class="row gx-0">

              <div class="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                <div class="content">
                  <h3>StartUp Details</h3>
                  <h2>{startup.name}</h2>
                  <p>
                    {startup.description}
                  </p>
                  <div class="text-center text-lg-start">
                    <h2>USP : </h2>
                    <p>{startup.usp}</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                <img src={startup.photo} class="img-fluid" alt="startup photo" width={'600px'} />
              </div>

            </div>
          </div>

        </section>
      )}

      {/* Products of startup */}

      <section className="user_market_products">
        <h2 className="fw-bold">Products</h2>

        <div className="d-flex justify-content-end ">
          <select onChange={(e) => sortProducts(parseInt(e.target.value))} className="select">
            <option value="5">No Filter</option>
            <option value="0">Sort by Review</option>
            <option value="1">Sort by Price</option>
            <option value="2">Sort by Category</option>
          </select>
        </div>


        {/*  List all products */}
        <div className="products mt-5 container">
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="card col-md-3 border-0 rounded-0 shadow m-2 p-0">
                <img src={product.photo} class="card-img-top rounded-0" alt="..." />
                <div class="card-body mt-3 mb-3">
                  <div class="row">
                    <div class="col-10">
                      <h4 class="card-title">{product.name}</h4>
                      <p>{product.description}</p>
                    </div>
                  </div>
                </div>
                <div class="row align-items-center text-center g-0">
                  <div class="col-3">
                    <h5>
                      <FaDollarSign/> {product.price}</h5>
                  </div>
                  <div class="col-6">
                    <button class="btn  btn-primary w-100 p-3 rounded-0" onClick={() => handleAddToCart(product._id)}>Add To Cart</button>
                  </div>
                  <div class="col-3">
                    <h5>
                      <FaStar/> {getAggregate(product.ratings)} </h5>
                  </div>
                </div>
                </div>

              ))}
              </div>
          </div>

      </section>


    </div>
  );
};

export default UserMarket;
