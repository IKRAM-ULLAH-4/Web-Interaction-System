import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import loginphoto from "./assets/loginPage_photo.png";

function LoginPage() {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "" }}
    >
      <div
        className="container rounded-4 shadow-lg overflow-hidden"
        style={{
          //   maxWidth: "1200px",
          backgroundColor: "#222161ff",
          minHeight: "800px",
        }}
      >
        <div className="row">
          {/* Left Side - Login Form */}
          <div
            className="col-md-6 text-white p-5 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "#ffffff", minHeight: "800px" }}
          >
            <div className="text-center mb-4">
              <i
                className="bi bi-chat-dots-fill"
                style={{ fontSize: "3rem", color: "black" }}
              ></i>
              <h3 className="fw-bold mt-3" style={{ color: "black" }}>
                Welcome Back
              </h3>
              <p className="text-muted">Login to access your account</p>
            </div>

            <form>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label text-black">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent text-black border-secondary">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-secondary t"
                    placeholder="user@gmail.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label text-black">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent text-black border-secondary">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control border-secondary"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Sign In Button */}
              <button className="btn btn-primary text-dark w-100 fw-bold">
                Sign In
              </button>
            </form>

            {/* Switch to Register */}
            <p className="text-center mt-3 text-muted">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitch && onSwitch();
                }}
                className="text-primary "
              >
                Sign Up
              </a>
            </p>
          </div>

          {/* Right Side - Illustration */}
          <div
            className="col-md-6 d-flex flex-column align-items-center justify-content-center text-white p-5"
            style={{
              background: "linear-gradient(135deg, #007bff, #6610f2)",
              minHeight: "400px",
            }}
          >
            <img
              src={loginphoto}
              alt="Illustration"
              className="img-fluid mb-3"
              style={{ maxHeight: "350px" }}
            />
            <h5 className="fw-bold">Connect anytime, anywhere</h5>
            <div className="d-flex gap-2 mt-2">
              <span className="badge bg-secondary">Free</span>
              <span className="badge bg-secondary">Easy Setup</span>
              <span className="badge bg-secondary">Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
