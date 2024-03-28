import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import "./Login.css";
import auth from "../../firebase_init";
import axios from "axios"; //used for get-post requests
import loginImage from "../Images/logo.png"; // Adjust the path as necessary
import loginVec from "../Images/login_vec.jpg"

const SignUp = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [pass, setPassword] = useState("");
  const [dob, setDOB] = useState("");
  const [logintype, setLogType] = useState("");

  const navigate = useNavigate(); // Access the navigate function
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    console.log(auth);
    //validate and home
    // if (!email.includes("@")) alert("Invalid Email");
    // else if (
    //   typeof mobileNum != "number" &&
    //   mobileNum >= 0 &&
    //   mobileNum.length == 10
    // )
    //   alert("Invalid mobileNum");
    // else if (
    //   dob.charAt(2) == "/" &&
    //   dob.charAt(5) == "/" &&
    //   dob.length() === 10
    // ) {
    //   const splitDob = dob.split("/");
    //   const day = splitDob[0];
    //   const month = splitDob[1];
    //   const year = splitDob[2];
    //   if (
    //     typeof month == "number" &&
    //     typeof day == "number" &&
    //     typeof year == "number" &&
    //     month <= 12
    //   ) {
    //     //leap year
    //     if (year % 4 == 0 && year % 100 != 0) {
    //       if (month == 2 && day > 29) alert("Invalid date for feb month");
    //       else if (month % 2 == 1 && day > 31) alert("Invalid date");
    //       else if (month % 2 == 0 && day > 30) alert("Invalid date");
    //       else alert("All good");
    //     } else {
    //       // not leap
    //       if (month == 2 && day > 28) alert("Invalid date for feb month");
    //       else if (month % 2 == 1 && day > 31) alert("Invalid date");
    //       else if (month % 2 == 0 && day > 30) alert("Invalid date");
    //     }
    //   }
    // } else {
    try {
      const newUser = await createUserWithEmailAndPassword(email, pass);
      console.log("User Created as", newUser);
      const currUser = {
        mobileNum: mobileNum,
        name: name,
        email: email,
        dob: dob,
        logintype: logintype,
      };
      const { data } = axios.post("http://localhost:8000/postUser", currUser);
      console.log("DATA RECIEVED :", data);
    } catch (error) {
      console.log(error, "HEll");
    }

    navigate("/login");
  };

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
                  <h6 class="msg-info">Create Account</h6>

                  <div class="form-group">
                    <label class="form-control-label ">Username</label>
                    <input type="text" id="name" name="name" placeholder="Username" class="form-control" onChange={(e) => setName(e.target.value)} />
                  </div>


                  <div class="form-group">
                    <label class="form-control-label ">Email</label>
                    <input type="email" id="email" name="email" placeholder="email id" class="form-control" onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label">Password</label> 
                    <input type="password" id="psw" name="psw" placeholder="Password" class="form-control" onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label">Birthdate</label> 
                    <input type="text" id="bd" name="bd" placeholder="Birthdate" class="form-control" onChange={(e) => setDOB(e.target.value)} />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label">Contact Number</label> 
                    <input type="text" id="no" name="no" placeholder="Contact Number" class="form-control" onChange={(e) => setMobileNum(e.target.value)} />
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

                  <div class="row justify-content-center my-3 px-3">
                    <button class="btn-block btn-color"  onClick={handleSignUp}>Register to Innoventure</button>
                  </div>

                </div>
              </div>
              <div class="bottom text-center mb-5">
                <p class="sm-text mx-auto mb-3">Already have an account?
                  <Link to="/login"> <button class="btn btn-white ml-2">Login</button></Link>
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

export default SignUp;
