import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminState = () => {
  const [stats, setStats] = useState({ users: 0, packages: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/packages/admin/stats"
      );
      setStats(res.data);
    } catch (err) {
      console.error("Stats error:", err);
    }
  };

  useEffect(() => {
    // Show loading while fetching and allow the effect to run normally.
    // React.StrictMode may cause the effect to run twice in development;
    // it's acceptable (and helps catch side-effect issues) but we avoid
    // showing placeholder zeros to users by using a loading state.
    const run = async () => {
      setLoading(true);
      await fetchStats();
      setLoading(false);
    };

    run();
    // Optional: Refresh data every 1 minute automatically
    const interval = setInterval(run, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="row g-3 mb-4">
      {/* User Card */}
      <div className="col-md-4">
        <div
          className="card border-0 text-white shadow-sm"
          style={{ background: "#3b82f6", borderRadius: "10px" }}
        >
          <div className="card-body p-4 text-center">
            <h6>Total Customers</h6>
            <h2 className="fw-bold">
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-white"
                  role="status"
                />
              ) : (
                stats.users
              )}
            </h2>
          </div>
        </div>
      </div>

      {/* Package Card */}
      <div className="col-md-4">
        <div
          className="card border-0 text-white shadow-sm"
          style={{ background: "#10b981", borderRadius: "10px" }}
        >
          <div className="card-body p-4 text-center">
            <h6>Tour Packages</h6>
            <h2 className="fw-bold">
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-white"
                  role="status"
                />
              ) : (
                stats.packages
              )}
            </h2>
          </div>
        </div>
      </div>

      {/* Booking Card */}
      <div className="col-md-4">
        <div
          className="card border-0 text-white shadow-sm"
          style={{ background: "#8b5cf6", borderRadius: "10px" }}
        >
          <div className="card-body p-4 text-center">
            <h6>Total Bookings</h6>
            <h2 className="fw-bold">
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-white"
                  role="status"
                />
              ) : (
                stats.bookings
              )}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminState;
