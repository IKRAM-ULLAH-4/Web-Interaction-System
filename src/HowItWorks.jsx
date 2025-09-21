import "bootstrap/dist/css/bootstrap.min.css";

function HowItWorks() {
  return (
    <section className="py-5 bg-light" id="howitworks">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5"> How It Works</h2>
          <p className="text-muted">
            A simple step-by-step workflow to understand our platform.
          </p>
        </div>

        <div className="row g-4">
          {/* Step 1 */}
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow h-100 text-center p-4">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
              >
                1
              </div>
              <h5 className="fw-bold">Sign Up & Login</h5>
              <p className="text-muted">
                Users sign up and log in securely with authentication.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow h-100 text-center p-4">
              <div
                className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
              >
                2
              </div>
              <h5 className="fw-bold">Real-time Messaging</h5>
              <p className="text-muted">
                Messages are sent instantly via Socket.IO technology.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow h-100 text-center p-4">
              <div
                className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
              >
                3
              </div>
              <h5 className="fw-bold">Peer-to-Peer Calls</h5>
              <p className="text-muted">
                WebRTC enables direct peer-to-peer calling with signaling.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow h-100 text-center p-4">
              <div
                className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
              >
                4
              </div>
              <h5 className="fw-bold">Cloud Storage</h5>
              <p className="text-muted">
                Media and files are securely stored in the cloud for access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
