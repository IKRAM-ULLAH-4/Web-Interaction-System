import Contact from "./Contact";
import Features from "./Features";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import MockupSection from "./MockupSection";
import Navbar from "./Navbar";
function LandingPage() {
  return (
    <>
    
      <div>
        <Navbar />
      </div>

      <div >
        <HeroSection />
      </div>

      <div>
        <Features />
      </div>
      <div>
        <MockupSection />
      </div>
      <div style={{ border: "" }}>
        <HowItWorks />
      </div>
      <div style={{  border: "" }}>
        <Contact />
      </div>
      <div style={{ border: "" }}>
        <Footer />
      </div>
    </>
  );
}
export default LandingPage;
