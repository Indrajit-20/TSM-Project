import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Build payload matching backend field names
      const payload = {
        name: formdata.name,
        email: formdata.email,
        phone_no: formdata.mobile,
        address: "",
        gender: formdata.gender,
        password: formdata.password,
      };

      // Direct API call
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload
      );

      if (response.status === 201 || response.status === 200) {
        alert("Registration Successful!");
        // You can redirect the user to login page here
      }
    } catch (err) {
      console.log(
        "Error during registration:",
        err.response || err.message || err
      );
      const message =
        err.response?.data?.message || err.message || "Registration failed";
      alert(`Registration failed: ${message}`);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 py-5">
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ width: "32rem" }}
      >
        <div className="card-body p-5">
          <h3 className="text-center fw-bold mb-4 text-primary">Join TSM</h3>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label small fw-bold text-secondary"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control rounded-pill px-3 py-2 border-secondary-subtle"
                placeholder="Enter full name"
                autoComplete="name"
                required
                onChange={handleChange}
              />
            </div>

            <div className="row">
              {/* Email */}
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="email"
                  className="form-label small fw-bold text-secondary"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control rounded-pill px-3 py-2 border-secondary-subtle"
                  placeholder="name@mail.com"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                />
              </div>
              {/* Mobile */}
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="mobile"
                  className="form-label small fw-bold text-secondary"
                >
                  Mobile No.
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="form-control rounded-pill px-3 py-2 border-secondary-subtle"
                  placeholder="10-digit number"
                  pattern="[0-9]{10}"
                  autoComplete="tel"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              {/* DOB */}
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="dob"
                  className="form-label small fw-bold text-secondary"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  max={today}
                  className="form-control rounded-pill px-3 py-2 border-secondary-subtle"
                  required
                  onChange={handleChange}
                />
              </div>
              {/* Gender */}
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-bold text-secondary d-block">
                  Gender
                </label>
                <div className="mt-2">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      required
                      onChange={handleChange}
                    />
                    <label className="form-check-label small" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="Female"
                      required
                      onChange={handleChange}
                    />
                    <label className="form-check-label small" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="form-label small fw-bold text-secondary"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                minLength="6"
                className="form-control rounded-pill px-3 py-2 border-secondary-subtle"
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                required
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm mb-3"
            >
              Register Now
            </button>
            <div className="text-center">
              <span className="text-muted small">Already a member? </span>
              <Link to="/login" className="small fw-bold text-decoration-none">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
