import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const navigate =useNavigate();

  const user = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("logout successful");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* 1. BRAND LOGO */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          TSM
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* 2. BOOKING CATEGORIES (Bus, Train, Airplane, Hotel) */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item px-2">
              <Link className="nav-link text-center" to="/flights">
                <div className={styles.navIcon}>✈️</div>
                <span className="small d-block">Flights</span>
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link text-center" to="/hotels">
                <div className={styles.navIcon}>🏨</div>
                <span className="small d-block">Hotels</span>
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link text-center" to="/trains">
                <div className={styles.navIcon}>🚆</div>
                <span className="small d-block">Trains</span>
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link text-center" to="/bus">
                <div className={styles.navIcon}>🚌</div>
                <span className="small d-block">Bus</span>
              </Link>
            </li>
          </ul>

          {/* 3. USER ACTIONS (Login / Register) */}
          <div className="d-flex align-items-center gap-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary btn-sm rounded-pill px-3"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm rounded-pill px-3"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm rounded-pill px-3"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
