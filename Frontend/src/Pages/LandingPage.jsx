import Features from "../Components/Features";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";
import MockupSection from "../Components/MockupSection";
import Navbar from "../Components/Navbar";
import Contact from "../Components/Contact";
import HowItWorks from "../Components/HowItWorks";
import UpgradeButton from "../Components/UpgradeButton";
import { Link } from "react-router-dom";
import { UserInfo } from "../Context/UserInfoContext";
function LandingPage() {

  const {number} = UserInfo();
  return (
    <>
      <div>
        <Navbar />
      </div>
      {/* <h1>{number}</h1> */}
      <div>
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
      <div style={{ border: "" }}>
        <Contact />
      </div>
      <div style={{ border: "" }}>
        <Footer />
      </div>
    </>
  );
}
export default LandingPage;
