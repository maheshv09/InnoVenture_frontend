
import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase_init';
const Startup = ({firstTime,userEmail}) => {
  const user=useAuthState(auth)
  console.log("user",user)
  // const temp=axios.get(`http://localhost:8000/isStartupPresent/${email}`)
  // const [profile, setProfile] = useState({
  //   name: startupProfile.name ,
  //   description: '',
  //   photo: null, 
  //   USP: '',
  //   dataUpload: null, 
  // });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' || name === 'dataUpload') {
      setProfile({...profile, [name]: files[0]});
    } else {
      setProfile({...profile, [name]: value});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log(profile);
  };

  return (
    <div>
      <h1>Startup Profile</h1>
      {!isEditing ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Description: {profile.description}</p>
          <p>USP: {profile.USP}</p>
          {/* Display photo and data upload if available */}
          <p>Photo: {profile.photo && <img src={URL.createObjectURL(profile.photo)} alt="Profile" />}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={profile.name} onChange={handleChange} /><br />

          <label>Description</label>
          <input name="description" value={profile.description} onChange={handleChange} /><br />

          <label>Photo</label>
          <input type="file" name="photo" onChange={handleChange} /><br />

          <label>USP</label>
          <input name="USP" value={profile.USP} onChange={handleChange} /><br />

          <label>Data Upload</label>
          <input type="file" name="dataUpload" onChange={handleChange} /><br />

          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default Startup;
