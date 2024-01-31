import React, { useEffect, useState  } from "react";
import { Link,useNavigate } from "react-router-dom";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"
import "./SignUp.css";
import auth from "../../firebase_init";
import axios from 'axios'   //used for get-post requests 

const SignUp = ({}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [pass, setPassword] = useState('');
  const [dob, setDOB] = useState('');
  const [logintype, setLogType] = useState('');


  const navigate = useNavigate(); // Access the navigate function
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);



  const handleSignUp=async()=>{
  
    console.log(auth);
    
    try{
    const newUser=await createUserWithEmailAndPassword(email,pass)
    console.log("User Created as",newUser)
      const currUser= {
        name:name,
        age:age,
        email:email,
        dob:dob,
        logintype:logintype
      }
      const {data}=axios.post('http://localhost:8000/postUser',currUser);
      console.log("DATA RECIEVED :", data);
    }
    catch(error){
console.log(error,"HEll")
    }
    //validate and home
    if(!(email.includes('@')))
        alert("Invalid Email")
    
    navigate("/home");
  } 

  return (
    <div className="SignUp">

      <div className="SignUpBox">
      <h2>Sign Up</h2>
      <label>Email</label>
      <input type="text" placeholder="abc@gmail.com" onChange={(e) => setEmail(e.target.value)} /><br />

      <label>Name</label>
      <input type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} /><br />

      <label>Password</label>
      <input type="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} /><br />
      {/* < div className="gender" >
           <label >Gender</label>
          <input className="radioLabel" type="radio" name="Gender" value="Male" id="userGender" onChange={(e) => setGender(e.target.value)} />Male
          <input className="radioLabel" type="radio" name="Gender" value="Female" id="userGender" onChange={(e) => setGender(e.target.value)} />Female<br/>
            
      </div> */}
      <label>BirthDate</label>
         <input type="date" name="birthDate"  onChange={(e) => setDOB(e.target.value)}/>   
      <label>Age</label>
      <input type="number" placeholder="Your Age" onChange={(e) => setAge(e.target.value)} /><br />

      <label for="dropdownId">Login Type</label>
    <select id="dropdownId" name="dropdownName"  onChange={(e) => setLogType(e.target.value)}>
        <option value="startup">Startup Login</option>
        <option value="investor">Investor Login</option>
    </select><br/>
    <button className="submitBut" type="submit" onClick={handleSignUp}>Sign Up</button>

      </div>
  </div>
  );
};

export default SignUp;
