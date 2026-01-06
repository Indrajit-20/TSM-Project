import React from "react";
import styles from '../styles/PackageCard.module.css';

const PackageCard = ({ PackageName, price, location, image_url,duration }) => {
  return (
    <>
      <div className={`card ${styles.cardWrap,styles.display}`} style={{ width: "18rem" }}>
        <img 
          src={`http://localhost:5000${image_url}`} 
          className={`card-img-top ${styles.cardImg}`} 
          alt={PackageName} 
        />
        
        <div className="card-body">
          {/* Apply titleWrap to handle long names like "Dubai Luxury Tour" */}
          <h5 className={`card-title ${styles.titleWrap}`}>{PackageName}</h5>
          <p className="card-text text-muted small">
            Discover the wonders of {PackageName} with our exclusive travel package.
          </p>
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
          <button className="btn btn-outline-primary btn-sm">Details</button>
          <button className="btn btn-primary btn-sm">Book Now</button>
        </div>
      </div>
    </>
  );
};

export default PackageCard;