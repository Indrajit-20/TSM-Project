import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logging  ...");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container-fluid g-0">
      <div className="row g-0">
        {/* SIDEBAR - Added sticky-top and vh-100 */}
        <div
          className="col-md-2 p-3 text-white shadow d-flex flex-column sticky-top"
          style={{
            backgroundColor: "#0d6efd",
            height: "100vh",
            position: "sticky",
            top: 0,
          }}
        >
          <h4 className="text-center fw-bold mb-5 border-bottom pb-3">
            ADMIN
          </h4>

          <ul className="nav flex-column gap-3">
            <li className="nav-item">
              <button
                className="btn btn-light w-100 text-start"
                onClick={() => navigate("/admin")}
              >
                {" "}
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-white w-100 text-start"
                onClick={() => navigate("/admin/manage-packages")}
              >
                Manage Packages
              </button>
            </li>
          </ul>

          <div className="mt-auto pb-3">
            <button
              className="btn btn-danger w-100 fw-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA - Scrollable */}
        <div className="col-md-10 p-5 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
