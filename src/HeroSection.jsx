import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";
import photo3 from "./assets/photo3.jpg";

function HeroSection() {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold">Kwick Web Interaction System</h1>
            <p className="lead text-muted mb-4">
              A modern platform for real-time messaging, calls, and seamless
              collaboration powered by cutting-edge technology.
            </p>
            <div>
              <a href="#contact" className="btn btn-primary btn-lg me-2">
                Get Started
              </a>
              <a
                href="#howitworks"
                className="btn btn-outline-secondary btn-lg"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              id="heroCarousel"
              className="carousel slide shadow rounded overflow-hidden"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={photo1} className="d-block w-100" alt="Slide 1" />
                </div>
                <div className="carousel-item">
                  <img src={photo2} className="d-block w-100" alt="Slide 2" />
                </div>
                <div className="carousel-item">
                  <img src={photo3} className="d-block w-100" alt="Slide 3" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
