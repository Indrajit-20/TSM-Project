import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagePackage = () => {
  const [fomdata, setFormdata] = useState({
    name: "",
    destination: "",
    package_type: "Domestic",
    image_url: "",
    location: "",
    duration: "",
    price: "",
    description: "",
  });

  const [packages, setpackages] = useState([]);

  const getTours = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/packages");
      // Some environments/tools may wrap the array; normalize to an array
      const raw = res.data;
      const list = Array.isArray(raw) ? raw : raw?.value || raw?.data || [];
      // Trim stray whitespace in image paths (some records had trailing \n)
      const cleaned = list.map((p) => ({
        ...p,
        image_url: p.image_url ? p.image_url.toString().trim() : p.image_url,
      }));
      setpackages(cleaned);
    } catch (err) {
      console.log("Error: Check if backend is running on 5000", err);
    }
  };

  // Small helper to normalize image URLs for display in the table
  const getImageSrc = (image_url) => {
    if (!image_url) return "/default-tour.jpg";
    const t = image_url.toString().trim();
    if (/^https?:\/\//i.test(t)) return t;
    if (t.startsWith("/")) return `http://localhost:5000${t}`;
    return `http://localhost:5000/${t}`;
  };

  useEffect(() => {
    getTours();
  }, []);

  const handleOnChange = (e) => {
    setFormdata({ ...fomdata, [e.target.name]: e.target.value });
  };

  const packageAdd = async (e) => {
    e.preventDefault();

    if (
      !fomdata.name ||
      !fomdata.price ||
      !fomdata.destination ||
      !fomdata.image_url
    ) {
      alert("Please fill in Package Name, Price, Destination and Image URL.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // may contain raw token or 'Bearer <token>' depending on login

      // Ensure payload uses backend-expected field names
      const payload = {
        name: fomdata.name,
        destination: fomdata.destination,
        price: fomdata.price,
        duration: fomdata.duration,
        location: fomdata.location,
        image_url: fomdata.image_url,
        package_type: fomdata.package_type,
        description: fomdata.description,
      };

      await axios.post("http://localhost:5000/api/packages/add", payload, {
        headers: {
          Authorization: token,
        },
      });

      alert("Package Added Successfully");

      // Reset Form (use the same shape and default values as initial state)
      setFormdata({
        name: "",
        destination: "",
        package_type: "Domestic",
        image_url: "",
        location: "",
        duration: "",
        price: "",
        description: "",
      });

      getTours(); // Correctly refresh the list [cite: 2025-12-12]
    } catch (err) {
      alert("You are not authorized or Route not found.");
      console.error(err);
    }
  };

  const deleteTour = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/packages/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        alert("Package deleted!");
        getTours();
      } catch (err) {
        console.error(err);
        alert("Unauthorized or error deleting.");
      }
    }
  };

  return (
    <>
      <div className="container-fluid p-4">
        <h2 className="fw-bold text-primary mb-4">📦 Package Management</h2>

        <div className="card shadow-sm border-0 rounded-4 mb-5">
          <div className="card-body p-4">
            <h5 className="card-title mb-4 fw-bold text-secondary">
              Add New Tour
            </h5>
            <form onSubmit={packageAdd}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">
                    Package Name
                  </label>
                  <input
                    type="text"
                    name="name" // ADDED NAME
                    value={fomdata.name} // ADDED VALUE
                    className="form-control"
                    placeholder="e.g. Wonders of Dubai"
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Type</label>
                  <select
                    name="package_type"
                    className="form-select"
                    value={fomdata.package_type}
                    onChange={handleOnChange}
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={fomdata.destination}
                    className="form-control"
                    placeholder="e.g. Goa, India"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label small fw-bold">Image URL</label>
                  <input
                    type="text"
                    name="image_url"
                    value={fomdata.image_url}
                    className="form-control"
                    placeholder="/images/example.jpg or https://..."
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold">Location</label>
                  <input
                    type="text"
                    name="location" // ADDED NAME
                    value={fomdata.location}
                    className="form-control"
                    placeholder="City, Country"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Duration</label>
                  <input
                    type="text"
                    name="duration" // ADDED NAME
                    value={fomdata.duration}
                    className="form-control"
                    placeholder="5 Days"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Price (₹)</label>
                  <input
                    type="number"
                    name="price" // ADDED NAME
                    value={fomdata.price}
                    className="form-control"
                    placeholder="9999"
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={fomdata.description}
                    className="form-control"
                    placeholder="Brief details about the package"
                    onChange={handleOnChange}
                    required
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

        {/* Packages Table */}
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <h5 className="mb-3">Existing Packages</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Destination</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((p) => (
                    <tr key={p._id}>
                      <td style={{ width: 80 }}>
                        <img
                          src={getImageSrc(p.image_url)}
                          alt={p.name}
                          style={{ width: 72, height: 48, objectFit: "cover" }}
                        />
                      </td>
                      <td>{p.name}</td>
                      <td>{p.destination}</td>
                      <td>{p.package_type}</td>
                      <td>₹{p.price}</td>
                      <td style={{ maxWidth: 240 }}>
                        {p.description
                          ? p.description.length > 120
                            ? p.description.slice(0, 120) + "..."
                            : p.description
                          : "-"}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteTour(p._id)}
                        >
                          Delete
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
