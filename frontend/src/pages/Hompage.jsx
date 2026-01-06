import styles from "../styles/Homepage.module.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PackageCard from "../components/PackageCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { ImSearch } from "react-icons/im";

const Hompage = () => {
  const [packages, setpackages] = useState([]);

  //fetch backend api
  useEffect(() => {
    const getTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages");
        setpackages(res.data);
      } catch (err) {
        console.log("Error: Check if backend is running on 5000", err);
      }
    };
    getTours();
  }, []);

  // The backend uses the field `package_type` (not `type`), so filter on that.
  const DomesticPackages = packages.filter(
    (pkg) => pkg.package_type === "Domestic"
  );

  const InternationalPackages = packages.filter(
    (pkg) => pkg.package_type === "International"
  );
  return (
    <>
      <Navbar />
      <div className={styles.heroImage}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 text-center text-white">
              <h1 className={`display-4 fw-bold mb-3 ${styles.heroTitle}`}>
                Explore the World with TSM
              </h1>
              <p className={`lead mb-5  ${styles.heroTitle1}`}>
                Find the best deals on domestic and international tours.
              </p>

              {/* The Search & Date Widget */}
              <div
                className={`d-flex flex-column flex-md-row align-items-center bg-white p-3 rounded-pill shadow-lg ${styles.searchWidget}`}
              >
                {/* 1. Where to? (Location) */}
                <div className="d-flex align-items-center px-3 border-end w-100 mb-2 mb-md-0">
                  <span className="me-2 text-primary ">
                    <FaLocationDot size={22} />{" "}
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Where to?"
                  />
                </div>

                {/* 2. When? (Date) */}
                <div className="d-flex align-items-center px-3 w-100 mb-3 mb-md-0">
                  <span className="me-2 text-primary">
                    <IoCalendarOutline size={24} />
                  </span>
                  <input
                    type="date"
                    className="form-control border-0 shadow-none"
                  />
                </div>

                {/* Search Button */}
                <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold">
                  <ImSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add this below the heroWrapper div */}
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="fw-bold border-bottom pb-2">Domestic Packages</h2>
            <p className="text-muted">
              Explore the beauty of your own country.
            </p>

            {DomesticPackages.length > 0 && (
              <div className={styles.cardContainer}>
                {DomesticPackages.map((pkg) => (
                  <PackageCard
                    key={pkg._id}
                    PackageName={pkg.name}
                    price={pkg.price}
                    duration={pkg.duration}
                    location={pkg.destination}
                    image_url={pkg.image_url}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <h2 className="fw-bold border-bottom pb-2">
              International Packages
            </h2>
            <p className="text-muted">
              Discover world-class luxury across the globe.
            </p>

            {InternationalPackages.length > 0 && (
              <div className={styles.cardContainer}>
                {InternationalPackages.map((pkg) => (
                  <PackageCard
                    key={pkg._id}
                    PackageName={pkg.name}
                    price={pkg.price}
                    duration={pkg.duration}
                    location={pkg.destination}
                    image_url={pkg.image_url}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {packages.length === 0 && (
        <div className="text-center w-100">
          <h3>No Tours Found</h3>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Hompage;
