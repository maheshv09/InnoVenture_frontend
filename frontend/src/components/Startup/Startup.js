import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import StartupForm from "./StartupForm";

import "./Startup.css";
const Startup = ({ firstTime, userEmail }) => {
  const user = useAuthState(auth);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [usp, setUsp] = useState("");
  const [photo, setPhoto] = useState(null);
  const [data, setData] = useState(null);
  console.log("user", user);
  const email = user[0]?.email;
  const [findUser, setFindUser] = useState(false);
  const [startup, setStartup] = useState({});
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    fetchEmail();
  }, []);
  const fetchEmail = async () => {
    try {
      console.log("HELOOOOO");
      const response = await axios.get(
        `http://localhost:8000/isStartupPresent/${email}`
      );
      console.log("hii");
      console.log("Response:", response.data.message);
      if (response.data.message === "Not Found") {
        setFindUser(false);
      } else {
        setFindUser(true);
        console.log("FINDUSER:", findUser);
        const start = await axios.get(
          `http://localhost:8000/getStartDet/${email}`
        );
        console.log("startup", start.data);

        // Decode base64-encoded photo content
        // const photoContent = atob(start.data.photo.content);
        // console.log("PHOTOOO:", photoContent);
        // Convert data content to string
        const dataContent = start.data.data.content;

        // Update the startup state with the retrieved data
        setStartup({
          ...start.data,
          data: start.data.data.content,
        });
        console.log("STARTUP::", startup);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  fetchEmail();
  const handleEditProfile = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSaveProfile = async (updatedProfileData) => {
    try {
      console.log("MKVVV");
      const formData = new FormData();
      formData.append("name", updatedProfileData.name);
      formData.append("email", email);
      formData.append("description", updatedProfileData.description);
      formData.append("usp", updatedProfileData.usp);
      formData.append("photo", updatedProfileData.photo);
      // If a new photo file is provided, append it to the FormData

      // If a new data file is provided, append it to the FormData
      if (updatedProfileData.data instanceof File) {
        formData.append("data", updatedProfileData.data);
      }
      console.log("FORMMMDATA::", formData);
      // Send updated profile data to backend
      const resp = await axios.patch(
        `http://localhost:8000/updateStartup/${email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", resp);

      // Refresh startup data after update
      fetchEmail();
      setIsEditing(false); // Disable editing mode after saving
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [profile, setProfile] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" || name === "dataUpload") {
      setProfile({ ...profile, [name]: files[0] });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData1 = new FormData();
    formData1.set("image", photo);
    //console.log("ZXC", formData);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=e260abee406449ae9e7c159665ef502c",
        formData1
      )
      .then((res) => {
        const url = res.data.data.display_url;
        setPhoto(url);
      });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", desc);
    formData.append("usp", usp);
    formData.append("photo", photo);
    formData.append("data", data);

    try {
      const resp = await axios.post(
        "http://localhost:8000/postStartup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", resp);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Startup Profile</h1>
      {isEditing ? (
        <StartupForm
          startup={startup}
          onSubmit={handleSaveProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          {findUser ? (
            <div className="startup-details">
              <div className="image-container">
                {startup.photo && (
                  <img
                    className="startup-image"
                    src={startup.photo}
                    alt="Profile"
                  />
                )}
              </div>
              <div className="details-container">
                <h2 className="startup-name">{startup.name}</h2>
                <div className="detail-item">
                  <p className="detail-label">Description:</p>
                  <p className="detail-text">{startup.description}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">USP:</p>
                  <p className="detail-text">{startup.usp}</p>
                </div>
                {startup.data && (
                  <div className="detail-item">
                    <p className="detail-label">Data:</p>
                    <div className="detail-data">{startup.data}</div>
                  </div>
                )}
              </div>
              <button onClick={handleEditProfile}>Edit Profile</button>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />

                <label>Description</label>
                <input
                  name="description"
                  value={profile.description}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <br />

                <label>Photo</label>
                <input
                  type="file"
                  name="photo"
                  ref={fileInputRef}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <br />

                <label>USP</label>
                <input
                  name="USP"
                  value={profile.USP}
                  onChange={(e) => setUsp(e.target.value)}
                />
                <br />

                <label>Data Upload</label>
                <input
                  type="file"
                  name="dataUpload"
                  onChange={(e) => setData(e.target.files[0])}
                />
                <br />

                <button type="submit">Save</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Startup;
