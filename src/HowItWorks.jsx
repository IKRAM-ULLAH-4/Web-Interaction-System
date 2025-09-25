function HowItWorks() {
  const steps = [
    {
      number: 1,
      color: "bg-primary text-white",
      title: "Sign Up & Login",
      description: "Users sign up and log in securely with authentication.",
    },
    {
      number: 2,
      color: "bg-success text-white",
      title: "Real-time Messaging",
      description: "Messages are sent instantly via Socket.IO technology.",
    },
    {
      number: 3,
      color: "bg-warning text-dark",
      title: "Peer-to-Peer Calls",
      description: "WebRTC enables direct peer-to-peer calling with signaling.",
    },
    {
      number: 4,
      color: "bg-danger text-white",
      title: "Cloud Storage",
      description:
        "Media and files are securely stored in the cloud for access.",
    },
  ];

  return (
    <section className="py-5 bg-light" id="howitworks">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5">How It Works</h2>
          <p className="text-muted">
            A simple step-by-step workflow to understand our platform.
          </p>
        </div>

        <div className="row g-4">
          {
            steps.map((step, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              {console.log(index  , "and "  , step.number)}
              <div className="card border-0 shadow h-100 text-center p-4">
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 ${step.color}`}
                  style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                >
                  {step.number}
                </div>
                <h5 className="fw-bold">{step.title}</h5>
                <p className="text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
