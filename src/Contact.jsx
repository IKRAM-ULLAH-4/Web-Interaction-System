function Contact() {
  const btnHandle = (e) => {
    e.preventDefault(); // Prevent page reload
    alert("Message sent successfully ✅");
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

          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email Address"
              />
            </div>

            <div className="mb-3">
              <textarea
                className="form-control form-control-lg"
                rows="4"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
              onClick={btnHandle}
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
