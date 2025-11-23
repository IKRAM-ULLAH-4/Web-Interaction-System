import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import loginphoto from "../assets/loginPage_photo.png"
import loginphoto from "../assets/loginPage_photo.png";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../Service/api.js";
import { useState } from "react";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      alert(response.message || "Login successful");
      setLoggedIn(true);
      reset();
    } catch (err) {
      alert(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) {
    return <Navigate to="/homepage" replace />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="container rounded-4 shadow-lg overflow-hidden"
        style={{ backgroundColor: "#a06060ff", minHeight: "400px" }}
      >
        <div className="row">
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label text-black">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent text-black">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    {...register("email")}
                    className="form-control"
                    placeholder="Enter your Gmail address"
                  />
                </div>
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label text-black">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent text-black">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    {...register("password")}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <button
                className="btn btn-primary w-100 fw-bold"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
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
