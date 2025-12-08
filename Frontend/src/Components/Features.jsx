import { useEffect, useState } from "react";
import { getFeatures } from "../Service/api";

function Features() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true); // track loading state
  const [error, setError] = useState(null); // track network errors

  useEffect(() => {
    setLoading(true);
    setError(null);

    getFeatures()
      .then((data) => {
        setFeatures(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch features:", err);
        setError("Failed to load features. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <section id="feature" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">Features</h2>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center my-5">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {features.map((feature) => (
              <div
                key={feature._id}
                className="card shadow"
                style={{ width: "18rem" }}
              >
                <img
                  src={`https://kwick-server.onrender.com${feature.img}`}
                  className="card-img-top"
                  alt={feature.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.text}</p>
                  {feature.link && (
                    <a href={feature.link} className="btn btn-primary mt-2">
                      Learn More
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Features;
