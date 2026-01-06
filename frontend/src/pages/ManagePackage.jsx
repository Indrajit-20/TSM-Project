import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagePackage = () => {
  const [fomdata, setFormdata] = useState({
    name: "",
    destination: "",
    type: "domestic",
    image_url: "",
    location: "", 
    duration: "",
    price: "",
  });

  const [packages, setpackages] = useState([]);

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

  // FIXED: Corrected the state name typo here
  const handleOnChange = (e) => {
    setFormdata({ ...fomdata, [e.target.name]: e.target.value }); 
  };

  const packageAdd = async (e) => {
    e.preventDefault();
    
    // VALIDATION: Check if essential fields are filled
    if (!fomdata.name || !fomdata.price) {
      alert("Please fill in the Package Name and Price.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/packages", fomdata, {
        headers: {
          Authorization: token, // Note: If your backend uses Bearer, use: `Bearer ${token}`
        },
      });

      alert("Package Added Successfully");
      setFormdata({
        name: "",
        destination: "",      
        type: "domestic",
        image_url: "",
        location: "",
        duration: "",
        price: "",
      });
      getTours(); 
    } catch (err) {
      alert("You are not authorized to add package. Please login as Admin.");
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
            <h5 className="card-title mb-4 fw-bold text-secondary">Add New Tour</h5>
            <form onSubmit={packageAdd}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Package Name</label>
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
                    name="type" // ADDED NAME
                    className="form-select" 
                    value={fomdata.type} 
                    onChange={handleOnChange}
                  >
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </select>
                </div>

                <div className="col-md-12">
                  <label className="form-label small fw-bold">Image URL</label>
                  <input
                    type="text"
                    name="image_url" // ADDED NAME
                    value={fomdata.image_url}
                    className="form-control"
                    placeholder="https://example.com/image.jpg"
                    onChange={handleOnChange}
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
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-primary px-5 rounded-pill fw-bold">
                    + Add Package
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Table remains the same... */}
      </div>
    </>
  );
};

export default ManagePackage;