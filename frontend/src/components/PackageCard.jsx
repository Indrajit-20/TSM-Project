import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PackageCard.module.css";

const getImageSrc = (image_url = "") => {
  const trimmed = String(image_url).trim();
  if (!trimmed) return "/default-tour.jpg";
  if (/^https?:\/\//i.test(trimmed)) return trimmed; // absolute URL
  const normalized = trimmed.replace(/\\+/g, "/").replace(/^\/+/, "");
  const path = normalized.startsWith("images/")
    ? normalized
    : `images/${normalized}`;
  return `http://localhost:5000/${path}`; // ensure URL matches backend static route
};

const PackageCard = ({
  id,
  PackageName,
  price,
  location,
  image_url,
  duration,
  description,
}) => {
  const snippet = description
    ? description.length > 100
      ? description.slice(0, 100) + "..."
      : description
    : `Discover the wonders of ${PackageName}`;

  return (
    <>
      <div
        className={`card ${styles.cardWrap} ${styles.display}`}
        style={{ width: "18rem" }}
      >
        <img
          src={getImageSrc(image_url)}
          className={`card-img-top ${styles.cardImg}`}
          alt={PackageName}
        />

        <div className="card-body">
          {/* Apply titleWrap to handle long names like "Dubai Luxury Tour" */}
          <h5 className={`card-title ${styles.titleWrap}`}>{PackageName}</h5>
          <p className="card-text text-muted small">{snippet}</p>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="text-muted small">Location:</span> {location}
          </li>
          <li className="list-group-item">
            <span className="text-muted small">Duration:</span> {duration}
          </li>
          <li className="list-group-item">
            <span className="text-muted small">Price:</span>
            <span className={styles.priceText}> ₹{price}</span>
          </li>
        </ul>

        <div className="card-body d-flex justify-content-between">
          <Link
            to={`/packages/${id}`}
            className="btn btn-outline-primary btn-sm"
          >
            Details
          </Link>
          <button className="btn btn-primary btn-sm">Book Now</button>
        </div>
      </div>
    </>
  );
};

export default PackageCard;
