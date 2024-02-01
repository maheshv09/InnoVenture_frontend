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
  const [mobileNum, setMobileNum] = useState('');
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
        mobileNum:mobileNum,
        name:name,
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
    if(typeof mobileNum != "number" && mobileNum>=0 && mobileNum.length()==10 )
        alert("Invalid mobileNum")
    if((dob.charAt(2) == '/'&&dob.charAt(5)== '/' && dob.length()===10)){
      const splitDob=dob.split('/');
      const day=splitDob[0];
      const month=splitDob[1];
      const year=splitDob[2];
      if(typeof month =='number'&& typeof day =='number'&& typeof year =='number' && month<=12 ){
        //leap year
        if(year%4==0 && year%100!=0 ){
            if((month==2 && day>29))
              alert('Invalid date for feb month')
            else if( month%2==1 && day>31)
              alert('Invalid date')
            else if(month%2==0 && day>30)
              alert('Invalid date')
            else
              alert("All good")

        }
        else{// not leap
           if((month==2 && day>28))
              alert('Invalid date for feb month')
            else if( month%2==1 && day>31)
              alert('Invalid date')
            else if(month%2==0 && day>30)
              alert('Invalid date')
        }
      }
    }
    
    
    navigate("/home");
  } 

  return (
    <div className="SignUp">

      <div className="SignUpBox"  style={ { width: '50%',padding: '20px'}}>
      <h2 style={{  textAlign: 'center',color: '#333333'}}>Sign Up</h2>
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
         <input type="text" name="birthDate"  onChange={(e) => setDOB(e.target.value)}/>   
      <label>Age</label>
      <input type="text" placeholder="Your Mobile Number" onChange={(e) => setMobileNum(e.target.value)} /><br />

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
