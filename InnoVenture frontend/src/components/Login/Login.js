// Login.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import SignUp from "./SignUp";
import { GoogleButton } from "react-google-button";
import loginImage from "../Images/logo.png"; // Adjust the path as necessary
import loginVec from "../Images/login_vec.jpg"
import axios from "axios";

const Login = () => {
  const curruser = useAuthState(auth);
  const id = curruser[0]?.uid
  const [logintype, setLogType] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Access the navigate function
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  const handleLogin = async () => {
    try {
      if (!email.includes("@")) alert("Invalid Email");
      else {

        const response = await axios.get(`http://localhost:8000/checkLoginType/${email}`);
        console.log("logintype: ", logintype);

        const status = response.data.success;
        console.log("status: ", status);



        if (status && logintype !== 'investor') {
          await signInWithEmailAndPassword(email, password);
          navigate("/startup");
        } else if (!status && logintype === 'investor') {
          await signInWithEmailAndPassword(email, password);
          navigate("/");
        }

      }
    } catch (error) {
      console.log("Error!!!!");
    }
    //validate and home
    // <Home/>
  };

  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <>
      <div class="container my-auto mx-auto login-signup">
        <div class="card card0">
          <div class="d-flex flex-lg-row flex-column-reverse">
            <div class="card card1 shadow">
              <div class="row justify-content-center my-auto">
                <div class="col-md-8 col-10 my-2">
                  <div class="row justify-content-center px-3 mb-3">
                    <img id="logo" src={`${loginImage}`} />
                  </div>
                  <h3 class="text-center heading">We are InnoVenture</h3>
                  <h6 class="msg-info">Please login to your account</h6>

                  <div class="form-group">
                    <label class="form-control-label ">Username</label>
                    <input type="text" id="email" name="email" placeholder="Phone no or email id" class="form-control" onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label">Password</label> 
                    <input type="password" id="psw" name="psw" placeholder="Password" class="form-control" onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label ">User Type</label>
                    <select id="dropdownId" name="dropdownName" onChange={(e) => setLogType(e.target.value)} className="form-select" >
                      <option  value="startup" selected>
                        Startup Login
                      </option>
                      <option value="investor">Investor Login</option>
                    </select>
                  </div>

                  <div class="row justify-content-center mt-3 px-3">
                    <button class="btn-block btn-color"  onClick={handleLogin}>Login to Innoventure</button>
                  </div>

                  <div class="row justify-content-center  px-3">
                    <button class="btn-block btn-color"onClick={handleAdminLogin}>Admin Login</button>
                  </div>


                </div>
              </div>
              <div class="bottom text-center mb-5">
                <p class="sm-text mx-auto mb-3">Don't have an account?
                  <Link to="/signup"> <button class="btn btn-white ml-2">Create new</button></Link>
                </p>
              </div>
            </div>
            <div class="card card2">
              <div class="my-auto mx-md-5 px-md-5 right">
                <img src={`${loginVec}`} className="img-fluid" />
                <h3 class="text-white">We are more than just a company</h3> <small class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
