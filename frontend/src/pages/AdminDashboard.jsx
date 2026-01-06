import React from "react";
import { useNavigate, Outlet } from "react-router-dom"; 

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid g-0">
      <div className="row g-0 min-vh-100">
        
        {/* SIDEBAR (Stays constant) */}
        <div className="col-md-2 p-3 text-white shadow" style={{ backgroundColor: "#0d6efd" }}>
          <h4 className="text-center fw-bold mb-5 border-bottom pb-3">TSM ADMIN</h4>
          <ul className="nav flex-column gap-3">
            <li className="nav-item">
              <button className="btn btn-light w-100 text-start" onClick={() => navigate("/admin")}> Dashboard</button>
            </li>
            <li className="nav-item">
              <button className="btn text-white w-100 text-start" onClick={() => navigate("/admin/manage-packages")}>Manage Packages</button>
            </li>
            {/* ... other buttons ... */}
          </ul>
        </div>

        {/* MAIN CONTENT AREA (This changes!) */}
        <div className="col-md-10 p-5 bg-white">
          <Outlet /> {/* 👈 THIS IS THE MAGIC: It displays the sub-pages here */}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;