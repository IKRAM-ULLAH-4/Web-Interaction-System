import { FaUserPlus } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { addUser } from "../Service/api"

const schema = z.object({
  fullName: z.string().min(6, "Full name must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function RegistrationPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await addUser(data);
      alert(res.message || "Registration successful");
      reset();
      navigate("/login");
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container shadow-lg rounded-4 overflow-hidden">
        <div className="row">
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

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className="form-control"
                    placeholder="Full Name"
                  />
                  {errors.fullName && (
                    <small className="text-danger">
                      {errors.fullName.message}
                    </small>
                  )}
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="form-control"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    {...register("password")}
                    className="form-control"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
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