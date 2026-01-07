import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminState = () => {
  // 1. Create a state variable
  const [counts, setCounts] = useState({ pkg: 0, bnk: 0 });

  // 2. Fetch the data from your backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/packages/stats/count")
      .then(res => setCounts({ pkg: res.data.packages, bnk: res.data.bookings }))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="row g-3 mb-4">
      {/* Tour Packages Card */}
      <div className="col-md-3">
        <div className="card border-0 text-white h-100" style={{ background: "#10b981" }}>
          <div className="card-body">
            <h6 className="mb-2">Tour Packages</h6>
            {/* 3. Use the variable here! */}
            <h3 className="mb-0">{counts.pkg}</h3> 
          </div>
        </div>
      </div>

      {/* Bookings Card */}
      <div className="col-md-3">
        <div className="card border-0 text-white h-100" style={{ background: "#8b5cf6" }}>
          <div className="card-body">
            <h6 className="mb-2">Total Bookings</h6>
            <h3 className="mb-0">{counts.bnk}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};