export default function History() {
  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary rounded-xl shadow-xl/30 p-4 text-center">
          <p className="text-lg font-semibold">Deliveries Today</p>
          <p className="text-2xl text-primary font-bold">3</p>
        </div>
        <div className="bg-secondary rounded-xl shadow-xl/30 p-4 text-center">
          <p className="text-lg font-semibold">Pending</p>
          <p className="text-2xl text-yellow-500 font-bold">2</p>
        </div>
        <div className="bg-secondary rounded-xl shadow-xl/30 p-4 text-center">
          <p className="text-lg font-semibold">Completed</p>
          <p className="text-2xl text-green-600 font-bold">15</p>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="pt-2">
        <h2 className="text-xl text-gray-700 font-bold mb-2">
          Recent Deliveries
        </h2>
        <ul className="space-y-2">
          <li className="bg-gray-700 p-3 rounded">
            📦 Order #1234 — Completed
          </li>
          <li className="bg-gray-700 p-3 rounded">📦 Order #1235 — Pending</li>
          <li className="bg-gray-700 p-3 rounded">
            📦 Order #1236 — Completed
          </li>
        </ul>
      </div>
    </>
  );
}
