import React from 'react'

const AdminState = () => {
  return (
       <div className="row g-3 mb-4">
      {/* Total Customers */}
      <div className="col-md-3">
        <div
          className="card border-0 text-white h-100"
          style={{ background: "#3b82f6" }}
        >
          <div className="card-body">
            <h6 className="mb-2">Total Customers</h6>
            <h3 className="mb-0">12</h3>
          </div>
        </div>
      </div>

      {/* Tour Packages */}
      <div className="col-md-3">
        <div
          className="card border-0 text-white h-100"
          style={{ background: "#10b981" }}
        >
          <div className="card-body">
            <h6 className="mb-2">Tour Packages</h6>
            <h3 className="mb-0">4</h3>
          </div>
        </div>
      </div>

      {/* Tour Package Booking*/}
      <div className="col-md-3">
        <div
          className="card border-0 text-white h-100"
          style={{ background: "#8b5cf6" }}
        >
          <div className="card-body">
            <h6 className="mb-2">Tour Package Booking</h6>
            <h3 className="mb-0">15</h3>
          </div>
        </div>
      </div>

      {/* Flight Booking */}
      <div className="col-md-3">
        <div
          className="card border-0 text-white h-100"
          style={{ background: "#f59e0b" }}
        >
          <div className="card-body">
            <h6 className="mb-2">Flight Booking</h6>
            <h3 className="mb-0">8</h3>
          </div>
        </div>
      </div>

      {/* Train Booking*/}
      <div className="col-md-3">
        <div
          className="card border-0 text-white h-100"
          style={{ background: "#bf3a3eff" }}
        >
          <div className="card-body">
            <h6 className="mb-2">Train Booking</h6>
            <h3 className="mb-0">15</h3>
          </div>
        </div>
      </div>

      {/* Bus Booking*/}
      <div className="col-md-3">
        <div
          className="card border-0 text-white h-100"
          style={{ background: "#80d6fdff" }}
        >
          <div className="card-body">
            <h6 className="mb-2">Bus Booking</h6>
            <h3 className="mb-0">15</h3>
          </div>
        </div>
      </div>

      {/* Hotel Booking*/}
      <div className="col-md-3">
        <div
          className="card border-0 text-white h-100"
          style={{ background: "#da46b0ff" }}
        >
          <div className="card-body">
            <h6 className="mb-2">Hotel Booking</h6>
            <h3 className="mb-0">15</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminState;
