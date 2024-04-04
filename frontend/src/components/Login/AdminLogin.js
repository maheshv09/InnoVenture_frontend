import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase_init";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Admin logged in:", user);
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="login-signup container-md mx-auto my-auto shadow   p-5">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div class="form-group my-2">
          <label class="form-control-label ">Username</label>
          <input type="text" id="email" name="email" placeholder="Admin Id" class="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div class="form-group my-2">
          <label class="form-control-label ">Password</label>
          <input type="password" id="password" name="password" placeholder="Password id" class="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>


        <div class="row justify-content-center my-3 px-3">
          <button class="btn-block btn-color" type="submit">Login to Admin Innoventure</button>
        </div>
        </form>


        <div>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Back to User Login
          </Link>
        </div>
    </div>
  );
};

export default AdminLogin;
