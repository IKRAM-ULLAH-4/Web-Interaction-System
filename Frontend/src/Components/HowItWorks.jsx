import { useEffect, useState } from "react";
import { getSteps } from "../Service/api"

function HowItWorks() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const data = await getSteps();
        setSteps(data);
      } catch (err) {
        setError(err.message || "Failed to load steps.");
      } finally {
        setLoading(false);
      }
    };

    loadSteps();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h5>{error}</h5>
      </div>
    );
  }

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
          {steps.map((step) => (
            <div key={step._id} className="col-md-6 col-lg-3">
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