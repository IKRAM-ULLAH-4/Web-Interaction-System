function Contact()
 {

  const btnHandle = () => {
    console.log("Button Clicked..");
    
  };
  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold mb-3 display-5">Contact Administrator</h2>
        <p className="text-muted mb-4">
          Got questions or feedback? We'd love to hear from you.
        </p>

        <form className="mx-auto" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Your Name"
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email Address"
          />
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Write your message..."
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={btnHandle}
          >
            Send Message
          </button>
        </form>

        <p className="mt-3 text-muted">
          Or email us at{" "}
          <a href="mailto:admin@example.com" className="fw-semibold">
            admin@example.com
          </a>
        </p>
      </div>
    </section>
  );
}

export default Contact;
