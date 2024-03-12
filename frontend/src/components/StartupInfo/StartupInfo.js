import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access URL params
import "./StartupInfo.css"; // Assuming you have a CSS file for styling

const StartupInfo = () => {
  const [startup, setStartup] = useState(null);
  const { email } = useParams(); // Get the startup ID from URL params

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getStartDet/${email}` // Assuming you have an endpoint to fetch details of a single startup by ID
        );
        setStartup(response.data);
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    fetchStartup();
  }, [email]); // Fetch startup details whenever ID changes

  return (
    <div>
      {startup ? (
        <div className="startup-info">
          <h2>{startup.name}</h2>
          <p>
            <strong>Description:</strong> {startup.description}
          </p>
          <p>
            <strong>USP:</strong> {startup.usp}
          </p>
          {startup.data && (
            <div>
              <p>
                <strong>Data:</strong>
              </p>
              <pre>{startup.data.content}</pre>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StartupInfo;
