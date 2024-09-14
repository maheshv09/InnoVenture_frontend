import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getReportReq");
      setRequests(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching report requests:", error);
      setIsLoading(false);
    }
  };
  //fetchRequests();
  const handleApproveRequest = async (firebase_Id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/acceptReportReq/${firebase_Id}`
      );
      if (response.status === 200) {
        toast.success("Report request approved successfully!");
        fetchRequests();
      } else {
        toast.error("Error while approving report request");
      }
    } catch (error) {
      console.error("Error approving report request:", error);
      toast.error("Error while approving report request");
    }
  };

  const handleRejectRequest = async (reqId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/rejectReportReq/${reqId}`
      );
      if (response.status === 200) {
        toast.success("Report request rejected successfully!");
        fetchRequests();
      } else {
        toast.error("Error while rejecting report request");
      }
    } catch (error) {
      console.error("Error rejecting report request:", error);
      toast.error("Error while rejecting report request");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Admin Dashboard</h2>
      <div className="d-flex justify-content-end me-5">
        <button className="logout-button btn-get-started" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {requests.length === 0 ? (
            <p>No report requests found.</p>
          ) : (
            <ul className="requests-list row list-unstyled mt-5 container mx-auto">
              {requests.map((request) => (
                <li key={request._id} className="card col-md-4 shadow">
                  <p><span>Report ID:</span> {request._id}</p>
                  <p><span>Startup Name:</span> {request.startName}</p>
                  <p><span>Reason:</span> {request.reason}</p>
                  <div>
                    <button
                      onClick={() => handleApproveRequest(request.firebase_Id)}
                    >
                      Approve
                    </button>
                    <button onClick={() => handleRejectRequest(request._id)}>
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
