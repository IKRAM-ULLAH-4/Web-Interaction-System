import { useRef } from "react";
import loginphoto from "../assets/loginPage_photo.png";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const signUpClicked = (e) => {
    e.preventDefault();

    const emailValue = emailRef.current.value.trim();
    const passwordValue = passwordRef.current.value.trim();

    // Gmail validation regex
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailValue) {
      alert("Please enter your email!");
      return;
    }
    if (!gmailPattern.test(emailValue)) {
      alert("Please enter a valid Gmail address (must end with @gmail.com)");
      return;
    }
    if (!passwordValue) {
      alert("Please enter your password!");
      return;
    }

    // All good → go to profile page with email
    navigate("/profile", { state: { email: emailValue } });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="container rounded-4 shadow-lg overflow-hidden"
        style={{ backgroundColor: "#a06060ff", minHeight: "400px" }}
      >
        <div className="row">
          {/* Left Panel */}
          <div
            className="col-lg-6 d-flex flex-column align-items-center justify-content-center text-white p-5 order-1 order-lg-2"
            style={{
              background: "linear-gradient(135deg, #007bff, #6610f2)",
              minHeight: "400px",
            }}
          >
            <img
              src={loginphoto}
              alt="Illustration"
              className="img-fluid mb-3"
              style={{ maxHeight: "250px" }}
            />
            <h5 className="fw-bold text-center">Connect anytime, anywhere</h5>
            <div className="d-flex gap-2 mt-2">
              <span className="badge bg-secondary">Free</span>
              <span className="badge bg-secondary">Easy Setup</span>
              <span className="badge bg-secondary">Private</span>
            </div>
          </div>

          {/* Right Panel (Login Form) */}
          <div
            className="col-lg-6 d-flex flex-column justify-content-center p-5 order-2 order-lg-1"
            style={{ backgroundColor: "#ffffff", minHeight: "400px" }}
          >
            <div className="text-center mb-4">
              <i
                className="bi bi-chat-dots-fill"
                style={{ fontSize: "3rem", color: "black" }}
              ></i>
              <h3 className="fw-bold mt-3 text-black">Welcome Back</h3>
              <p className="text-muted">Login to access your account</p>
            </div>

            <form>
              <div className="mb-3">
                <label className="form-label text-black">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent text-black">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    ref={emailRef}
                    type="email"
                    className="form-control"
                    placeholder="Enter your Gmail address"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-black">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent text-black">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                className="btn btn-primary w-100 fw-bold"
                onClick={signUpClicked}
              >
                Sign In
              </button>
            </form>

            <p className="text-center mt-3 text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
