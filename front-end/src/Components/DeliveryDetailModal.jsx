import PayButton from "../Components/PayButton";
export default function DeliveryDetailsModal({
  open,
  onClose,
  details,
  recName,
  recNum,
  weight,
  from,
  to,
  phone,
  price,
}) {
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
            <span className="font-semibold">Features:</span>{" "}
            {details.feature === "fragile" ? "Fragile" : "Not Fragile"}
          </p>
          <p>
            <span className="font-semibold">From:</span> {details.from}
          </p>
          <p>
            <span className="font-semibold">To:</span> {details.to}
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
          <PayButton amount={price} />
        </div>
      </div>
    </div>
  );
}
