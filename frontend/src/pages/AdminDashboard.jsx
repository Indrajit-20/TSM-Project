import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container-fluid g-0">
      <div className="row g-0 min-vh-100">
        
        {/* SIDEBAR*/}
        <div className="col-md-2 p-3 text-white shadow" style={{ backgroundColor: "#0d6efd" }}>
          <h4 className="text-center fw-bold mb-5 border-bottom pb-3">TSM ADMIN</h4>

          <ul className="nav flex-column gap-3">
            <li className="nav-item">
              <button className="btn btn-light w-100 text-start fw-bold text-primary rounded-3">
                📊 Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button className="btn text-white w-100 text-start rounded-3 opacity-75 border-0">
                👥 Manage Users
              </button>
            </li>
            <li className="nav-item">
              <button className="btn text-white w-100 text-start rounded-3 opacity-75 border-0">
                📦 Manage Packages
              </button>
            </li>
            <li className="nav-item">
              <button className="btn text-white w-100 text-start rounded-3 opacity-75 border-0">
                📅 View Bookings
              </button>
            </li>
            
            <li className="nav-item mt-5">
              <button onClick={logout} className="btn btn-danger w-100 rounded-pill shadow-sm">
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT - Matches Screenshot White Background */}
        <div className="col-md-10 p-5 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Admin Dashboard</h2>
          
          </div>

          <hr className="mb-5" />

          {/* INFO CARDS - Styled like your Tour Cards */}
          <div className="row g-4 mb-5">
            {[
              { title: "Total Users", value: "120", color: "text-primary" },
              { title: "Total Bookings", value: "45", color: "text-success" },
              { title: "Active Packages", value: "18", color: "text-info" },
              { title: "Total Revenue", value: "₹1,25,000", color: "text-warning" }
            ].map((card, index) => (
              <div className="col-md-3" key={index}>
                <div className="card shadow-sm border-0 rounded-4 p-4 text-center">
                  <h6 className="text-muted text-uppercase small fw-bold mb-2">{card.title}</h6>
                  <h3 className={`fw-bold ${card.color}`}>{card.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* TABLE AREA - Matches your "Explore" section feel */}
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4 border-bottom pb-2">Recent Booking Activity</h5>
              <div className="bg-light rounded p-5 text-center text-muted">
                <p>Welcome to your control panel. Use the sidebar to add new packages like "Dubai" or "Manali" to the home page.</p>
                <button className="btn btn-primary rounded-pill px-4 shadow-sm">Add New Package</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;