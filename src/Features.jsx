import "bootstrap/dist/css/bootstrap.min.css";
import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";
import photo3 from "./assets/photo3.jpg"; // Use real image

function Features() {
  return (
    <section className="py-5 bg-light" id="feature">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold"> Key Features</h2>
          <p className="text-muted">
            Discover what makes our platform fast, secure, and reliable.
          </p>
        </div>

        <div className="row g-4">
          {/* Feature 1 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src={photo1}
                className="card-img-top"
                alt="Instant Messaging"
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">💬 Instant Messaging</h5>
                <p className="card-text text-muted">
                  Chat with your friends or colleagues instantly and securely.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center">
                <small className="text-muted">Updated recently</small>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src={photo2}
                className="card-img-top"
                alt="Voice & Video Calls"
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">📞 Voice & Video Calls</h5>
                <p className="card-text text-muted">
                  Connect with anyone via crystal-clear voice and video calls.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center">
                <small className="text-muted">Updated recently</small>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <img src={photo3} className="card-img-top" alt="Cloud Storage" />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">☁️ Cloud Storage</h5>
                <p className="card-text text-muted">
                  Store and access your files securely anytime, anywhere.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center">
                <small className="text-muted">Updated recently</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
