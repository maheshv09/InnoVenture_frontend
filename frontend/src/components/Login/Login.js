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
import loginImage from '../Images/login_image.jpg'; // Adjust the path as necessary


const Login = () => {
  const optionLabelStyle = {
    textAlign: 'center',
    color: 'gray',
    display: 'inline-block',
  };
  
  const selectStyle = {
    padding: '5px',
    marginRight: '10px',
    backgroundColor: '#11cca9',
    borderRadius: '20px',
  };
  
  // For :hover and :focus effects on .LoginBox and input, consider using state or CSS classes instead.
  
  const loginH2Style = {
    textAlign: 'center',
    color: '#333333',
  };
  
  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#1d08d9',
  };
  
  const inputStyle = {
    width: '80%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'border-color 0.3s ease-in-out',
  };
  
  // Consider using event handlers for input:hover and input:focus to dynamically change styles.
  
  const submitButStyle = {
    background: '#5eaef4',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease-in-out',
  };
  
  const genderLabelStyle = {
    display: 'block',
    marginBottom: '10px',
    color: '#333',
  };
  
  const radioLabelStyle = {
    marginRight: '10px',
    color: '#6dda07',
    marginLeft: '0%',
  };
  
  // For .submitBut:hover, consider using event handlers to dynamically change styles.
  
  const paragraphStyle = {
    textAlign: 'center',
    marginTop: '20px',
    color: '#555',
  };
  
  const linkStyle = {
    color: '#0b26f2',
    textDecoration: 'none',
    fontWeight: 'bold',
  };
  
  // For p a:hover, consider using event handlers to dynamically change styles.
  
  const googleButStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  

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
    if(!newUser || logintype!==  'investor'){
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
    <div className="Login" style={{ display: 'flex',backgroundImage: `url(${loginImage})`, justifyContent: 'center',alignItems: 'center',height: '100vh', }}>


      <div className="LoginBox" style={{width: '50%', padding: '20px', background: 'linear-gradient(to right, #3498db, #11cca9)', borderRadius: '10px' }}>
        <h2 style= {{textAlign: 'center',color: '#333333',}}>Login</h2>
        <label style={{ display: 'block', marginBottom: '5px', color: '#1d08d9',}}>Email</label>
        <input style={{width: '80%', padding: '10px',marginBottom: '15px'}}
          type="email"
          placeholder="abc@gmail.com"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label style={{ display: 'block', marginBottom: '5px',color: '#1d08d9',}}>Password</label>
        <input
          type="password"
          placeholder="Your Password"
          id="pass"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label for="dropdownId" style={{ display: 'block', marginBottom: '5px',color: '#1d08d9',  }}>Login Type</label>
    <select id="dropdownId" name="dropdownName"  onChange={(e) => setLogType(e.target.value)}>
        <option value="startup" style={ {textAlign: 'center',color: 'gray',display: 'inline-block',}}>Startup Login</option>
        <option value="investor">Investor Login</option>
    </select><br/>
    <br/>
        <button className="submitBut" type="submit" onClick={handleLogin} style={{ background: '#5eaef4', color: '#fff',padding: '10px 20px'}}>
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
