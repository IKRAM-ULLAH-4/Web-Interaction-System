import { Link } from "react-router-dom";

function HeroSection() {
  // Images in public/images folder
  const photos = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
  ];

  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold">Kwick Web Interaction System</h1>
            <p className="lead text-muted mb-4">
              A modern platform for real-time messaging, calls, and seamless
              collaboration powered by cutting-edge technology.
            </p>
            <div>
              <Link to="/login" className="btn btn-primary btn-lg me-2">
                Get Started
              </Link>
              <a
                href="#howitworks"
                className="btn btn-outline-secondary btn-lg"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Carousel */}
          <div className="col-lg-6">
            <div
              id="heroCarousel"
              className="carousel slide shadow overflow-hidden"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={photo} // ✅ Load from public folder
                      className="d-block w-100"
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
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
