import { FaUserPlus } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useRef } from "react";

function RegistrationPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const FullNameRef = useRef(null);
  const btnRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(FullNameRef.current.value);
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    console.log(btnRef.current.value);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container shadow-lg rounded-4 overflow-hidden">
        <div className="row">
          {/* Left Side - Branding */}
          <div
            className="col-lg-6 d-flex flex-column align-items-center justify-content-center text-white p-5"
            id="RegLeft"
          >
            <img
              src={logo}
              alt="Logo"
              className="mb-3 img-fluid"
              style={{ maxWidth: "200px" }}
            />
            <h1 className="fw-bold text-center">Kwick Chat</h1>
            <p className="text-center" style={{ maxWidth: "300px" }}>
              A smarter way to connect with people. Join now and be part of the
              conversation.
            </p>
          </div>

          {/* Right Side - Registration Form */}
          <div
            className="col-lg-6 d-flex align-items-center justify-content-center bg-white p-4 "
            style={{ minHeight: "400px" }}
          >
            <div className="w-100" style={{ maxWidth: "350px" }}>
              <div className="text-center mb-4">
                <FaUserPlus size={40} color="#007bff" />
                <h3 className="mt-2 fw-bold">Register</h3>
                <p className="text-muted">Create your Kwick account</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Full Name</label>
                  <input
                    ref={FullNameRef}
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    ref={emailRef}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <button
                  ref={btnRef}
                  value="Sign Up"
                  className="btn btn-primary w-100"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-3 text-muted">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
