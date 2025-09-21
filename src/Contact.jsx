function Contact() {
  return (
    <section className="py-5 bg-light" id="contact">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6"> Contact Administrator</h2>
          <p className="text-muted">
            Got questions or feedback? We’d love to hear from you.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow border-0 p-4">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your message..."
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <p className="text-center text-muted mt-3">
              Or reach us directly at{" "}
              <a
                href="mailto:admin@example.com"
                className="fw-semibold text-decoration-none"
              >
                admin@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
