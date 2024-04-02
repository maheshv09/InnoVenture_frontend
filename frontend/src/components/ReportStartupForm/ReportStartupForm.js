import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase_init";

const ReportStartupForm = () => {
  const [reportText, setReportText] = useState("");
  const [userName, setUserName] = useState("");
  const [startName, setStartupName] = useState("");
  const { firebase_Id } = useParams();
  const user = useAuthState(auth);
  //console.log("USERRR:", user);
  const navigate = useNavigate();
  const getDet = async () => {
    const resp = await axios.get(
      `http://localhost:8000/getStartDet/${firebase_Id}`
    );
    const resp1 = await axios.get(
      `http://localhost:8000/getUser/${user[0].uid}`
    );
    const userDet = resp1.data;
    setUserName(userDet.name);
    const startup = resp.data;
    setStartupName(startup.name);
  };
  getDet();
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Report Text:", reportText);
    console.log("Startup Name:", startName);

    await axios.post("http://localhost:8000/reportStart", {
      firebase_Id: firebase_Id,
      startName: startName,
      reason: reportText,
      userName: userName,
    });
    navigate("/");
    toast.success("Startup Reported Successfully!");
    setReportText("");
  };

  return (
    <div>
      <h3>Report {startName}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Report:
          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportStartupForm;
