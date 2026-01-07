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
  const [editId, setEditId] = useState(null); // 🔹 UPDATE MODE

  // ================= FETCH PACKAGES =================
  const getTours = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/packages");
      setpackages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Backend not running", err);
    }
  };

  useEffect(() => {
    getTours();
  }, []);

  // ================= IMAGE HELPER =================
  const getImageSrc = (img) => {
    if (!img) return "/default-tour.jpg";
    return img.startsWith("http")
      ? img
      : `http://localhost:5000/${img}`;
  };

  // ================= FORM CHANGE =================
  const handleOnChange = (e) => {
    setFormdata({ ...fomdata, [e.target.name]: e.target.value });
  };

  // ================= ADD PACKAGE =================
  const packageAdd = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/packages/add",
        fomdata,
        {
          headers: { Authorization: token },
        }
      );

      alert("Package Added Successfully");
      resetForm();
      getTours();
    } catch (err) {
      alert("Add failed or unauthorized");
      console.error(err);
    }
  };

  // ================= EDIT (FILL FORM) =================
  const handleEdit = (pkg) => {
    setEditId(pkg._id);
    setFormdata({
      name: pkg.name,
      destination: pkg.destination,
      package_type: pkg.package_type,
      image_url: pkg.image_url,
      location: pkg.location,
      duration: pkg.duration,
      price: pkg.price,
      description: pkg.description,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= UPDATE PACKAGE =================
  const updatePackage = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/packages/${editId}`,
        fomdata,
        {
          headers: { Authorization: token },
        }
      );

      alert("Package Updated Successfully");
      resetForm();
      setEditId(null);
      getTours();
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  // ================= DELETE PACKAGE =================
  const deleteTour = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/packages/${id}`,
        {
          headers: { Authorization: token },
        }
      );

      alert("Package deleted");
      getTours();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  // ================= RESET FORM =================
  const resetForm = () => {
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
  };

  return (
    <>
      <div className="container-fluid p-4">
        <h2 className="fw-bold text-primary mb-4">
          📦 Package Management
        </h2>

        {/* ================= FORM ================= */}
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <h5 className="fw-bold">
              {editId ? "Update Package" : "Add New Package"}
            </h5>

            <form onSubmit={editId ? updatePackage : packageAdd}>
              <div className="row g-3">

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Package Name"
                    name="name"
                    value={fomdata.name}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <select
                    className="form-select"
                    name="package_type"
                    value={fomdata.package_type}
                    onChange={handleOnChange}
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Destination"
                    name="destination"
                    value={fomdata.destination}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Image URL"
                    name="image_url"
                    value={fomdata.image_url}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Location"
                    name="location"
                    value={fomdata.location}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Duration"
                    name="duration"
                    value={fomdata.duration}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    name="price"
                    value={fomdata.price}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <input
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={fomdata.description}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="col-12 text-end">
                  <button
                    className={`btn ${
                      editId ? "btn-warning" : "btn-primary"
                    } px-4`}
                    type="submit"
                  >
                    {editId ? "Update Package" : "+ Add Package"}
                  </button>

                  {editId && (
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={() => {
                        resetForm();
                        setEditId(null);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>

              </div>
            </form>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Destination</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={getImageSrc(p.image_url)}
                        alt={p.name}
                        width="60"
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.destination}</td>
                    <td>{p.package_type}</td>
                    <td>₹{p.price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
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
    </>
  );
};

export default ManagePackage;
