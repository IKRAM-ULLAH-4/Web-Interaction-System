

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 ">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>KWIS</h5>
            <p className="small">
               {new Date().getFullYear()} KWIS. All rights reserved.
            </p>
          </div>

          <div className="col-md-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#feature" className="text-light text-decoration-none">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#howitworks"
                  className="text-light text-decoration-none"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div className="col-md-4">
            <h6>Follow Us</h6>
            <a href="#" className="text-light me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-light me-3">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-light">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
