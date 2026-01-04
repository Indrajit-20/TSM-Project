import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagePackage = () => {
  const [packages, setpackages] = useState([]);

  // 1. Fetch backend API
  const getTours = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/packages");
      setpackages(res.data);
    } catch (err) {
      console.log("Error: Check if backend is running on 5000", err);
    }
  };

  useEffect(() => {
    getTours();
  }, []);

  const deleteTour = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        // 1. Get the token from storage
        const token = localStorage.getItem("token");

        // 2. Send the request with the "Authorization" Header (raw token expected by backend)
        await axios.delete(`http://localhost:5000/api/packages/${id}`, {
          headers: {
            Authorization: token, // backend expects the raw token string
          },
        });

        alert("Package deleted!");
        getTours(); // Refresh list
      } catch (err) {
        console.error(err);
        alert("You are not authorized to delete this. Please login as Admin.");
      }
    }
  };

  return (
    <>
      <div className="container-fluid p-4">
        <h2 className="fw-bold text-primary mb-4">📦 Package Management</h2>

        {/* Form Card */}
        <div className="card shadow-sm border-0 rounded-4 mb-5">
          <div className="card-body p-4">
            <h5 className="card-title mb-4 fw-bold text-secondary">
              Add New Tour
            </h5>
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">
                    Package Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Wonders of Dubai"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Type</label>
                  <select className="form-select">
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </select>
                </div>

                {/* 🌟 NEW: Image URL Input */}
                <div className="col-md-12">
                  <label className="form-label small fw-bold">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City, Country"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="5 Days"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="9999"
                  />
                </div>
                <div className="col-12 text-end">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 rounded-pill fw-bold"
                  >
                    + Add Package
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-3 text-secondary">Current Packages</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg._id}>
                      <td className="fw-bold">{pkg.name}</td>
                      <td>{pkg.destination || pkg.location}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            (pkg.type || pkg.category) === "international"
                              ? "bg-info"
                              : "bg-success"
                          }`}
                        >
                          {pkg.package_type || pkg.category || "N/A"}
                        </span>
                      </td>
                      <td>₹{pkg.price}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm me-2"
                          onClick={() => deleteTour(pkg._id)}
                        >
                          Delete
                        </button>
                        <button className="btn btn-outline-warning btn-sm">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagePackage;
