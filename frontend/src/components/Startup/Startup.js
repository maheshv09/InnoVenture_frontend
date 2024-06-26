import { FaBuilding, FaStickyNote, FaRegHandPointUp, FaRupeeSign, FaWeight, FaArrowLeft, FaUser, FaMapMarkedAlt, FaMoneyBill } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6"
import { LuBadgePercent } from "react-icons/lu";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase_init";
import StartupForm from "./StartupForm";
import Marketplace from "../Marketplace/Marketplace";
import LoadingPage from "../LoadingPage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import InvestmentList from "../InvestmentList/InvestmentList";

import EquityRaising from "../Equity/EquityRaising";
import StartupCard from "./StartupCard"
import "./Startup.css";
import { UNSAFE_useRouteId } from "react-router-dom";


const Startup = ({ firstTime, userEmail }) => {
  const renderChart = () => {
    if (startup && startup.data) {
      console.log("STARTUP DATA :", startup.data);
      const parsedData = startup.data
        .split("\n")
        .map((line) => line.split(","));

      parsedData.shift(); // Remove header row
      const dates = parsedData.map((entry) => entry[0]); // Assuming date is at index 0
      const valuationInLakhs = parsedData.map((entry) => parseFloat(entry[1])); // Assuming open is at index 1

      let data = [];

      for (let i = 0; i < dates.length; i++) {
        let obj = {};
        obj["dates"] = dates[i];
        obj["valuationInLakhs"] = valuationInLakhs[i];

        data.push(obj);
      }
      // console.log("DATES :", dates);
      // console.log("Open At :", openValues);

      console.log("PArsedDATA---->", parsedData);
      return (
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dates" />
          <YAxis domain={["auto", "auto"]} tickCount={10} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valuationInLakhs" stroke="#8884d8" />
        </LineChart>
      );
    }
    return null;
  };

  const user = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [usp, setUsp] = useState("");
  const [categories, setCategories] = useState("");
  const [valuation, setValuation] = useState("");
  const [availableEquity, setAvailableEquity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [data, setData] = useState(null);
  console.log("user", user);
  const uid = user[0]?.uid;
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
      setIsLoading(true);
      console.log("HELOOOOO");
      const response = await axios.get(
        `http://localhost:8000/isStartupPresent/${uid}`
      );
      console.log("hii");
      console.log("Response:", response.data.message);
      if (response.data.message === "Not Found") {
        setFindUser(false);
        setIsLoading(false);
      } else {
        setFindUser(true);
        console.log("FINDUSER:", findUser);
        const start = await axios.get(
          `http://localhost:8000/getStartDet/${uid}`
        );
        console.log("startup", start.data);
        setIsLoading(false);

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
  // fetchEmail();
  const handleEditProfile = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSaveProfile = async (updatedProfileData) => {
    try {
      // console.log("MKVVV");
      const formData = new FormData();
      formData.append("name", updatedProfileData.name);
      formData.append("email", email);
      formData.append("description", updatedProfileData.description);
      formData.append("usp", updatedProfileData.usp);
      formData.append("categories", updatedProfileData.categories);
      formData.append("valuation", updatedProfileData.valuation);
      formData.append("availableEquity", updatedProfileData.availableEquity);
      formData.append("photo", updatedProfileData.photo);

      // If a new data file is provided, append it to the FormData
      if (updatedProfileData.data instanceof File) {
        formData.append("data", updatedProfileData.data);
      }
      console.log("FORMMMDATA::", formData);
      // Send updated profile data to backend
      const resp = await axios.patch(
        `http://localhost:8000/updateStartup/${uid}`,
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
  const [flag, setFlag] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData1 = new FormData();
    formData1.set("image", photo);
    //console.log("ZXC", formData);
    setFlag(true);
    await axios
      .post(
        "https://api.imgbb.com/1/upload?key=e260abee406449ae9e7c159665ef502c",
        formData1
      )
      .then((res) => {
        const url = res.data.data.display_url;
        setPhoto(url);
      });
    setFlag(false);
    var cat = categories.split(",");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", desc);
    formData.append("usp", usp);
    formData.append("categories", cat);
    formData.append("photo", photo);
    formData.append("data", data);
    formData.append("valuation", valuation);
    formData.append("availableEquity", availableEquity);
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
  console.log("----FIND USER--->", findUser);
  const [selectedOption, setSelectedOption] = useState("profile");
  console.log("OPTIONNN:", selectedOption);

  console.log("isLoading :", isLoading);

  return (
    <div>

      {isLoading ? (<LoadingPage />) :
        (

          <div className="startup">
            <h2 className="fw-bold my-3">Welcome {startup.name}</h2>
            <div className="mx-5 profile-options row d-flex justify-content-between">
              <div class="col-md-3" data-aos="zoom-out" data-aos-delay="200" onClick={() => setSelectedOption("profile")}>
                <div class="feature-box d-flex align-items-center">
                  <FaUser />
                  <h3>View Profile</h3>
                </div>
              </div>

              <div class="col-md-3" data-aos="zoom-out" data-aos-delay="200" onClick={() => setSelectedOption("equity")}>
                <div class="feature-box d-flex align-items-center">
                  <FaHandHoldingDollar />
                  <h3>Raise Equity</h3>
                </div>
              </div>

              <div class="col-md-3" data-aos="zoom-out" data-aos-delay="200" onClick={() => setSelectedOption("marketplace")}>
                <div class="feature-box d-flex align-items-center">
                  <FaMapMarkedAlt />
                  <h3>Marketplace</h3>
                </div>
              </div>

              <div class="col-md-3" data-aos="zoom-out" data-aos-delay="200" onClick={() => setSelectedOption("investments")}>
                <div class="feature-box d-flex align-items-center">
                  <FaMoneyBill />
                  <h3>Investment Details</h3>
                </div>
              </div>

            </div>



            <div className="content">
              {selectedOption === "profile" ? (
                isEditing ? (

                  <StartupForm
                    startup={startup}
                    onSubmit={handleSaveProfile}
                    onCancel={() => setIsEditing(false)}
                  />

                ) : (
                  <div>
                    {findUser ? (
                      <> <div className="d-flex justify-content-end me-5">
                        <button class="btn btn-color" onClick={handleEditProfile}>Edit Profile</button>
                      </div>
                        <StartupCard renderChart={renderChart} startup={startup} /></>
                    ) : (
                      <div className="edit-profile">
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
                          <label>Current Valuation</label>
                          <input
                            type="text"
                            value={profile.valuation || ""}
                            onChange={(e) =>
                              setProfile({ ...profile, valuation: e.target.value })
                            }
                          />
                          <br />

                          <label>Current Available Equity</label>
                          <input
                            type="text"
                            value={profile.availableEquity || ""}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                availableEquity: e.target.value,
                              })
                            }
                          />
                          <br />
                          <button type="submit">Save</button>
                        </form>
                      </div>
                    )}
                  </div>
                )
              ) : selectedOption === "equity" ? (
                <EquityRaising />
              ) : selectedOption === "marketplace" ? (
                <Marketplace firebase_Id={uid} />
              ) : (
                <>
                  <InvestmentList firebase_Id={uid} />
                </>
              )}
            </div>
          </div>
        )
      }
    </div>
  );
};
export default Startup;
