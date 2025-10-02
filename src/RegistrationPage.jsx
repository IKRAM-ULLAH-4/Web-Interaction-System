import { FaUserPlus } from "react-icons/fa";
import LoginPage from "./LoginPage";
import logo from "./assets/logo.png";

function RegistrationPage({ onSwitch }) {
  const handlClick = (e) => {
    navigate("/login");
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "" }}
    >
      <div className="container shadow-lg rounded-4 overflow-hidden">
        <div className="row">
          {/* Left Side - Branding */}
          <div
            className="col-md-6 d-flex flex-column align-items-center justify-content-center text-white p-5"
            style={{
              background: "linear-gradient(135deg, #007bff, #6610f2)",
              minHeight: "400px",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className="mb-2"
              style={{ width: "250px", height: "250px" }}
            />
            <h1 className="fw-bold">Kwick Chat</h1>
            <p className="text-center" style={{ maxWidth: "300px" }}>
              A smarter way to connect with people. Join now and be part of the
              conversation.
            </p>
          </div>

          {/* Right Side - Registration Form */}
          <div
            className="col-md-6 d-flex align-items-center justify-content-center bg-white p-5"
            style={{ minHeight: "800px" }}
          >
            <div className="w-100" style={{ maxWidth: "350px" }}>
              <div className="text-center mb-4">
                {/* <img src={logo} alt="" /> */}
                <FaUserPlus size={40} color="#007bff" />
                <h3 className="mt-2 fw-bold">Register</h3>
                <p className="text-muted">Create your Kwick account</p>
              </div>
              <form>
                <div className="mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <button className="btn btn-primary w-100">Sign Up</button>
              </form>
              <p className="text-center mt-3 text-muted">
                Already have an account?{" "}
                <a href="#" onClick={handlClick}>
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
