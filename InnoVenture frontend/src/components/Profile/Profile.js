import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoMail } from "react-icons/io5";
import { FaRegUser, FaQuestionCircle, FaAngleDown, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useAuthState(auth);
  const uid = user[0]?.uid;
  const [selectRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getUser/${uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        console.log("fetch user")
        const userData = await response.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    if (uid) {
      fetchUserData();
    }
  }, [uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return null;
  }

  const {
    mobileNum,
    name,
    email,
    dob,
    logintype,
    firebase_Id,
    purchasedAmount,
    purchasedEquity,
    equity,
    orders,
    address
  } = userData;
  const submitRating = async (productId) => {
    console.log("Rating :", selectRating, "PROD ID :", productId);
    const response = await axios.get(
      `http://localhost:8000/getProduct/${productId}`
    );
    const prevRatings = response.data.products[0].ratings;
    prevRatings.push(parseInt(selectRating));
    console.log("REPONSE :", selectRating);

    console.log("NEW ARRAY :", prevRatings);
    const response2 = await axios.patch(
      `http://localhost:8000/updateProd/${productId}`,
      {
        ratings: prevRatings,
      }
    );
  };
  return (
    <>
      <div className="profile">

        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="card shadow">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                  <div class="mt-3">
                    <h4> {name}</h4>
                    <p class="text-secondary mb-1"><IoMail /> {email}</p>
                    <p class="text-muted font-size-sm"><FaRegUser /> {logintype}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="col-md-8">
            <div class="card shadow mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Full Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {name}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {email}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Mobile</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {mobileNum}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">DOB</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {dob}
                  </div>
                </div>
                <hr />
                


              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 p-3 ">
            <div className="card shadow ">
              <h2 className="text-center card-title">Equity</h2>

              {equity && Object.keys(equity) && Object.keys(equity).map((stock, index) => (
                <div className="card mx-3 p-3 mb-2">
                  <p><span>Stock :</span> {stock}</p>
                  <p><span>Purchased Amount:</span> {equity[stock].purchasedAmount}</p>
                  <p><span>Purchased Equity:</span> {equity[stock].purchasedEquity}</p>

                </div>

              ))}


            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow container mx-auto mt-3">
              <h2 className="text-center card-title">Orders</h2>
              <div className="row text-center fw-bold">
                <div className="col-md-3">Product</div>
                <div className="col-md-2">Price</div>
                <div className="col-md-2">Quantity</div>
                <div className="col-md-5">Give Ratings</div>
              </div>
              <hr/>
              {orders && Object.keys(orders) && Object.keys(orders).map((product, index) => (
                
                <div key={index} className="row text-center">
                  <div className="col-md-3">{product}</div>
                  <div className="col-md-2">{orders[product].price}</div>
                  <div className="col-md-2">{orders[product].quantity}</div>
                  {orders[product].review != "0" ? (
                    <div className="col-md-2">{orders[product].review}</div>
                  ) : (
                    <div className="col-md-5">
                      Give Rating : <br/>
                      <select>
                        <option value="1" onClick={() => setSelectedRating(1)}>
                          1
                        </option>
                        <option value="2" onClick={() => setSelectedRating(2)}>
                          2
                        </option>
                        <option value="3" onClick={() => setSelectedRating(3)}>
                          3
                        </option>
                        <option value="4" onClick={() => setSelectedRating(4)}>
                          4
                        </option>
                        <option value="5" onClick={() => setSelectedRating(5)}>
                          5
                        </option>
                      </select>
                      <button onClick={() => submitRating(orders[product].id)} className="submitRating">
                        <FaCheck  />
                      </button>
                    </div>
                  )}
                </div>
                
              ))}

            </div>
          </div>

        </div>


      </div>

    </>
  );
};

export default Profile;
