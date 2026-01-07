import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    price: "",
    description: "",
    duration: ""
  });

  // 1. Load the existing package details into the form
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error loading package info", err);
      }
    };
    fetchDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Send the UPDATE request to the backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/packages/update/${id}`, formData);
      alert("Package Updated Successfully!");
      navigate("/admin/manage-packages"); // Go back to the table
    } catch (err) {
      alert("Update failed!");
    }
  };

  return (
    <div className="container p-4">
      <div className="card shadow p-4" style={{ maxWidth: "600px", margin: "auto" }}>
        <h3>Update Package</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label>Package Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;