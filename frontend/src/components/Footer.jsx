import styles from '../styles/Footer.module.css';
const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white py-5 mt-5 ">
        <div className="container">
          <div className="row ">
            {/* Company Name & Info */}
            <div className="col-lg-3 col-md-6 mb-4 ">
              <h5>Flyvedya Tourism</h5>
              <p className="small mb-3">
                Your trusted travel partner for domestic & international tours.
                Book flights, bus,Trains, hotels, and packages seamlessly.
              </p>
              <p className="small mb-0">
                115, Rytham Plaza
                <br />
                Nikol, Ahmedabad
              </p>
            </div>

            {/* Information */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h6>Information</h6>
              <ul className="list-unstyled small">
                <li>
                  <a href="/" className="text-white text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-white text-decoration-none">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="text-white text-decoration-none"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-white text-decoration-none"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h6>Address</h6>
              <p className="small mb-0">
                115, Rytham Plaza
                <br />
                Nr. Amar Jawan Circle
                <br />
                Nikol, Ahmedabad - 382350
                <br />
                Gujarat, India
              </p>
            </div>

            {/* Contact Us */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h6>Contact Us</h6>
              <p className="small mb-1">
                <i className="fas fa-phone me-2"></i>+91 9082963043
              </p>
              <p className="small mb-1">
                <i className="fas fa-envelope me-2"></i>
                flyvedyatourism@gmail.com
              </p>
            </div>

            {/* Follow Us */}

            <div className="col-md-3 mb-3">
              <h6>Follow Us</h6>
              <div className="p-2 border rounded mb-1">
                <a
                  href="https://facebook.com/flyvedyatourism"
                  target="_blank"
                  className="d-flex text-white text-decoration-none"
                >
                  Facebook
                </a>
              </div>
              <div className="p-2 border rounded mb-1">
                <a
                  href="https://www.instagram.com/flyvedya.tourism"
                  target="_blank"
                  className="d-flex text-white text-decoration-none"
                >
                  Instagram
                </a>
              </div>
              <div className="p-2 border rounded">
                <a
                  href="https://wa.me/919082963043"
                  target="_blank"
                  className="d-flex text-white text-decoration-none"
                >
                  +91 9082963043
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <hr className="my-4" />
          <div className="text-center small">
            <p>&copy; 2026 Flyvedya Tourism. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
