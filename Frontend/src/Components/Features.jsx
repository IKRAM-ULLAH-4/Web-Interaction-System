import { useEffect, useState } from "react";
import { getFeatures } from "../Service/api";

function Features() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeatures();
        setFeatures(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load features");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
              <img
                src={feature.img}
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
      </div>
    </section>
  );
}

export default Features;
