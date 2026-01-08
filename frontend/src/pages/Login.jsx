import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [Logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  // 2. Handle input changes using the [name] shortcut
  const handleChange = (e) => {
    setLogindata({ ...Logindata, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        Logindata
      );

      if (response.status === 200) {
        const { role, token, message } = response.data;

        // store token for authenticated requests 
        if (token) localStorage.setItem("token", token);
        if (response.data?.userId)
          localStorage.setItem("userId", response.data.userId);

        alert(message || "Login Successful");

        // 4. Role-Based Redirection
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ width: "24rem" }}
      >
        <div className="card-body p-5">
          {/* Title */}
          <h3 className="text-center fw-bold mb-4 ">Login Now </h3>

          <form onSubmit={handleSubmit}>
            {/* Email / Mobile Number Input */}
            <div className="mb-3">
              <label className="form-label small fw-bold">Email</label>
              <input
                type="text"
                name="email"
                value={Logindata.email}
                className="form-control rounded-pill px-3 py-2"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="form-label small fw-bold">Password</label>
              <input
                type="password"
                name="password"
                value={Logindata.password}
                className="form-control rounded-pill px-3 py-2"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm mb-3"
            >
              Login
            </button>

            {/* Register Link */}
            <div className="text-center">
              <span className="text-muted small">Don't have an account? </span>
              <Link
                to="/register"
                className="small fw-bold text-decoration-none"
              >
                Register now
              </Link>
              <br />
              <Link to="/" className="small fw-bold text-decoration-none">
                Go Homepage
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
