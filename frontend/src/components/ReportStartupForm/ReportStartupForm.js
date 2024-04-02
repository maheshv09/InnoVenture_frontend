import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ReportStartupForm = () => {
  const [reportText, setReportText] = useState("");
  const [startName, setStartupName] = useState("");
  const { firebase_Id } = useParams();
  const navigate = useNavigate();
  const getDet = async () => {
    const resp = await axios.get(
      `http://localhost:8000/getStartDet/${firebase_Id}`
    );
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
