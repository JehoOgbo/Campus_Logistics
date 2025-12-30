import { useContext, useEffect } from "react";
import PayButton from "../Components/PayButton";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
export default function DeliveryDetailsModal({
  open,
  onClose,
  recName,
  recNum,
  weight,
  f_location_id,
  t_location_id,
  from,
  to,
  phone,
  price,
  recEmail,
  customerEmail,
  feature,
}) {
  const { user } = useContext(UserContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white shadow-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Delivery Details
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Recipient Name:</span> {recName}
          </p>
          <p>
            <span className="font-semibold">Recipient Phone:</span> {recNum}
          </p>
          <p>
            <span className="font-semibold">Weight:</span> {weight} kg
          </p>
          <p>
            <span className="font-semibold">Features:</span> {feature}
          </p>
          <p>
            <span className="font-semibold">From:</span> {from}
          </p>
          <p>
            <span className="font-semibold">To:</span> {to}
          </p>
          <p>
            <span className="font-semibold">Your Phone:</span>
            {phone}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Cancel
          </button>
          <PayButton
            amount={price}
            recName={recName}
            recNum={recNum}
            recEmail={recEmail}
            to={to}
            from={from}
            weight={weight}
            recEmail={recEmail}
            customerEmail={customerEmail}
            feature={feature}
          />
        </div>
      </div>
    </div>
  );
}
