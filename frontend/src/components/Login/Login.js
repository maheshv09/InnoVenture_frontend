// Login.js

import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {useAuthState, useSignInWithEmailAndPassword , useSignInWithGoogle} from "react-firebase-hooks/auth"
import auth from "../../firebase_init";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import SignUp from "./SignUp";
import {GoogleButton} from "react-google-button"

const Login = () => {
  const curruser=useAuthState(auth);
  const [logintype, setLogType] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Access the navigate function
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const handleGoogleLogin=async()=>{
     await signInWithGoogle();
    
  }


  const handleLogin=async()=>{
    try{
    const newUser=await signInWithEmailAndPassword(email,password)
    if(!newUser || logintype!=='investor'){
     alert("Invalid User");
     navigate("/signup");
    }
    else{
   navigate("/");
    }

    }
    catch(error){
      console.log("Error!!!!")
    }
    //validate and home
    // <Home/>
    navigate("/");
  } 
 


  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <div className="Login">


      <div className="LoginBox">
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="email"
          placeholder="abc@gmail.com"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Your Password"
          id="pass"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label for="dropdownId">Login Type</label>
    <select id="dropdownId" name="dropdownName"  onChange={(e) => setLogType(e.target.value)}>
        <option value="startup">Startup Login</option>
        <option value="investor">Investor Login</option>
    </select><br/>
    <br/>
        <button className="submitBut" type="submit" onClick={handleLogin}>
          Login
        </button><br></br>
      <div className="googleBut">
      <GoogleButton className="g-btn" type="light" onClick={handleGoogleLogin}  />
        </div>
        <p>
          login se phele register karo bhaiya{" "}
          <Link to="/signup"> daba tu</Link>
        </p>
      </div>
  
    </div>
  );
};

export default Login;
