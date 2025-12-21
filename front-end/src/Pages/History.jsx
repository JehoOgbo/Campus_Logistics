export default function History() {
  return (
    <div className="mt-3">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Deliveries Today */}
        <div className="bg-gray-50 rounded-xl shadow-md p-6 text-center border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Deliveries Today</p>
          <p className="mt-2 text-3xl text-primary font-bold">3</p>
        </div>

        {/* Pending */}
        <div className="bg-gray-50 rounded-xl shadow-md p-6 text-center border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Pending</p>
          <p className="mt-2 text-3xl text-secondary font-bold">2</p>
        </div>

        {/* Completed */}
        <div className="bg-gray-50 rounded-xl shadow-md p-6 text-center border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Completed</p>
          <p className="mt-2 text-3xl text-[#2a5298] font-bold">15</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl text-gray-800 font-bold mb-4 flex items-center gap-2">
          📋 Recent Deliveries
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="flex items-center gap-2">
              📦 <span className="font-medium text-gray-700">Order #1234</span>
            </span>
            <span className="text-green-600 font-semibold">Completed</span>
          </li>
          <li className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="flex items-center gap-2">
              📦 <span className="font-medium text-gray-700">Order #1235</span>
            </span>
            <span className="text-yellow-500 font-semibold">Pending</span>
          </li>
          <li className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="flex items-center gap-2">
              📦 <span className="font-medium text-gray-700">Order #1236</span>
            </span>
            <span className="text-green-600 font-semibold">Completed</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
