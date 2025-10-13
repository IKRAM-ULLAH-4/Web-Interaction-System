import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";

const featuresData = [
  {
    img: photo1,
    title: "Instant Messaging",
    text: "Stay connected with friends and colleagues in real-time. Fast, reliable, and secure chat at your fingertips.",
    link: "#",
  },
  {
    img: photo2,
    title: "Crystal-Clear Calls (VoIP Will try with WebRTC)",
    text: "Enjoy seamless peer-to-peer voice calls with exceptional clarity. Connect instantly without interruptions.",
    link: "#",
  },
  {
    img: photo3,
    title: "Smart Storage & Sharing",
    text: "Share photos, videos, and documents effortlessly. Your files are always safe and accessible when you need them.",
    link: "#",
  },
];

function Features() {
  return (
    <section
      id="feature"
      className="py-5 bg-light"
      style={{ border: "1px solid black" }}
    >
      <h2 className="text-center mb-4 fw-bold">Features</h2>
      <div className="d-flex flex-wrap gap-3  justify-content-center">
        {featuresData.map((data, Index) => {
          console.log(Index);
          return (
            <div
              key={Index}
              className="card shadow "
              style={{ width: "18rem" }}
            >
              <img src={data.img} className="card-img-top " alt={data.title} />
              <div
                className="card-body "
                style={{ border: "1px solid yellow" }}
              >
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;
