import { useContext, useState } from "react";

import { UserContext } from "../Contexts/UserContext";

import History from "./History";
import DeliveryForm from "../Components/DeliveryForm";

export default function Delivery() {
  // const tips = [
  //   "✅ Double‑check your address and phone number",
  //   "📦 Be available to receive your package",
  //   "🔔 Track your delivery for updates",
  //   "📝 Add clear notes for special instructions",
  //   "🔒 Inspect items before confirming receipt",
  // ];

  const { user } = useContext(UserContext);

  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(!formOpen);
    // setFeature("");
    // setWeight(0);
    // setPrice(0);
    window.scrollTo({ top: 0, behaviour: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 animate-fade-in-up duration-300 flex-col">
      <p className="text-3xl text-gray-700 p-3">Welcome, {user.name}</p>
      <div className=" p-2 text-gray-700">
        <h1 className="text-3xl font-bold text-gray-700">
          Ready to send something?
        </h1>
        <p className="mt-1 text-gray-600 text-sm md:text-md">
          Your delivery starts here — simple, fast, reliable.
        </p>
        {/* Helpful Tips */}
        {!formOpen && <History />}

        {/* Action Button */}
        <button
          disabled={formOpen}
          onClick={handleFormOpen}
          className={`rounded-2xl text-gray-100 bg-primary px-5 py-3 tracking-wide text-lg font-semibold shadow-lg mt-6 ${
            formOpen
              ? "opacity-40 cursor-not-allowed"
              : "hover:scale-105 transition-transform duration-300 ease-in-out"
          }`}
        >
          Start New Delivery +
        </button>
      </div>

      {formOpen && <DeliveryForm setFormOpen={setFormOpen} />}
    </div>
  );
}
