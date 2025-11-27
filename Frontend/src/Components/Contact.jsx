import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const btnHandle = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container">
        <div
          className="card shadow-lg p-4 mx-auto"
          style={{ maxWidth: "600px", borderRadius: "1rem" }}
        >
          <h2 className="fw-bold mb-3 text-center display-6">
            Contact Administrator
          </h2>
          <p className="text-muted text-center mb-4">
            Got questions or feedback? We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit(btnHandle)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Your Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-danger mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email Address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-danger mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-3">
              <textarea
                className="form-control form-control-lg"
                rows="4"
                placeholder="Write your message..."
                {...register("message")}
              ></textarea>
              {errors.message && (
                <p className="text-danger mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
              style={{ borderRadius: "0.75rem" }}
            >
              Send Message
            </button>
          </form>

          <p className="mt-4 text-center text-muted">
            Or email us at{" "}
            <a href="mailto:ikrambtm444@gmail.com" className="fw-semibold">
              ikrambtm444@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
