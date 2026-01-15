import { useEffect, useState } from "react";
import { getFeatures } from "../Service/api";

function Features() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeatures()
      .then((data) => {
        // ✅ Handles BOTH response shapes:
        // { features: [...] } OR [...]
        setFeatures(data.features || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch features:", err);
        setError("Failed to load features. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5">
        {error}
      </div>
    );
  }

  return (
    <section id="feature" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">Features</h2>

        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {features.map((feature) => (
            <div
              key={feature._id}
              className="card shadow"
              style={{ width: "18rem" }}
            >
              {
              console.log("Rendering feature:", feature.img)
              }
              {
              feature.img && (
               <img
  src={`https://kwick-backend.onrender.com${encodeURI(feature.img)}`}
  className="card-img-top"
  alt={feature.title}
  style={{ height: "180px", objectFit: "cover" }}
  onError={(e) => {
    console.error("❌ Image failed:", feature.img);
    e.currentTarget.style.display = "none";
  }}
/>
              )}

              <div className="card-body">
                <h5 className="card-title">{feature.title}</h5>
                <p className="card-text">{feature.text}</p>

                {feature.link && (
                  <a
                    href={feature.link}
                    className="btn btn-primary mt-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
