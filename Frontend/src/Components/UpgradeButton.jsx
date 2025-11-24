import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../Service/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function UpgradeButton() {
  const handleUpgrade = async () => {
    try {
      const { url } = await createCheckoutSession();
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (err) {
      alert(err.message || "Payment failed");
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleUpgrade}>
      Upgrade to Premium
    </button>
  );
}
