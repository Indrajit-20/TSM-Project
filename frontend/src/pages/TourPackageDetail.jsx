import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [travelers, setTravelers] = useState(1);
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/packages/${id}`)
      .then((res) => setPkg(res.data))
      .catch((err) =>
        console.error("Fetch package error:", err.response?.data || err.message)
      );
  }, [id]);

  const bookPackage = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to book a package.");

    try {
      const payload = {
        userId: localStorage.getItem("userId") || null,
        packageId: id,
        travellers: Number(travelers),
        startDate,
      };

      const headers = { Authorization: token };

      const res = await axios.post(
        "http://localhost:5000/api/tour-bookings/book",
        payload,
        { headers }
      );
      alert(res.data?.message || "Booking created! Admin will approve.");
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Booking failed. Make sure you're logged in."
      );
    }
  };

  if (!pkg) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8">
          <img
            src={(function (img) {
              if (!img) return "/default-tour.jpg";
              const t = img.toString().trim();
              if (/^https?:\/\//i.test(t)) return t;
              if (t.startsWith("/")) return `http://localhost:5000${t}`;
              return `http://localhost:5000/${t}`;
            })(pkg.image_url)}
            className="img-fluid rounded mb-4"
            alt={pkg.name}
            style={{ height: "400px", objectFit: "cover" }}
          />

          <h2>{pkg.name}</h2>
          <p className="text-muted">
            {pkg.destination} | {pkg.duration}
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <h5>
                ₹{pkg.price} <small>/person</small>
              </h5>
              <span
                className={`badge ${
                  pkg.package_type === "Domestic" ? "bg-success" : "bg-warning"
                }`}
              >
                {pkg.package_type}
              </span>
            </div>
            <div className="col-md-6">
              {/* No start/end dates in model — show createdAt instead */}
              <p>
                <strong>Added:</strong> {new Date(pkg.createdAt).toDateString()}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h6>Description</h6>
            <p>{pkg.description}</p>
          </div>

          {/* Booking form */}
          <div className="card p-4">
            <h5>Book Now</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Travelers</label>
                <input
                  type="number"
                  className="form-control"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  min="1"
                  max="10"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3 d-flex align-items-end">
                <button className="btn btn-primary w-100" onClick={bookPackage}>
                  Book Now (₹{pkg.price * travelers})
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card sticky-top" style={{ top: "20px" }}>
            <div className="card-body">
              <h6>Quick Info</h6>
              <ul className="list-unstyled">
                <li>
                  <strong>Price:</strong> ₹{pkg.price}/person
                </li>
                <li>
                  <strong>Type:</strong> {pkg.package_type}
                </li>
                <li>
                  <strong>Duration:</strong> {pkg.duration}
                </li>
              </ul>
              <button className="btn btn-success w-100 mb-2">
                WhatsApp Inquiry
              </button>
              <button className="btn btn-outline-primary w-100">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
