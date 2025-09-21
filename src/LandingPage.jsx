import Contact from "./Contact";
import Features from "./Features";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";
function LandingPage() {
  return (
    <>
      <div style={{ border: "1px solid black" }}>
        <Navbar />
      </div>

      <div style={{ border: "1px solid black" }}>
        <HeroSection />
      </div>

      <div>
        <Features />
      </div>
      <div style={{ border: "1px solid black" }}>
        <HowItWorks />
      </div>
      <div style={{ border: "1px solid yellow" }}>
        <Contact />
      </div>
      <div style={{ border: "1px solid green" }}>
        <Footer />
      </div>
    </>
  );
}
export default LandingPage;
