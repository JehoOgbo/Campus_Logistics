export default function DeliveryTips({ tips }) {
  return (
    <div className="max-w-md my-3 p-6 rounded-lg border border-gray-200 shadow-sm animate-slide-in">
      <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
        🚚 Delivery Tips
      </h2>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="flex items-start gap-3 p-3 rounded-md border border-gray-100 hover:border-primary transition"
          >
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
              {index + 1}
            </span>
            <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
