export default function Pricing() {
  return (
    <section className="bg-secondary py-16 px-4 md:px-0">
      {" "}
      {/* Changed background to bg-secondary */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          {" "}
          {/* Changed text to white */}
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          {" "}
          {/* Adjusted text for contrast */}
          Find the perfect plan for your delivery needs.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Up to 1kg */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-700 transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110">
            {" "}
            {/* Adjusted card background and border */}
            <h3 className="text-2xl font-semibold text-white mb-2">
              Up to 1kg
            </h3>{" "}
            {/* Changed text to white */}
            <span className="text-4xl font-bold text-primary mb-4">
              NGN200
            </span>{" "}
            {/* Using primary brand color */}
            <ul className="text-gray-300 text-left w-full mb-6">
              {" "}
              {/* Adjusted text for contrast */}
              <li className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-primary mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                Lightweight parcels
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-primary mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                Fastest delivery
              </li>
            </ul>
            <button className="mt-auto w-full px-6 py-3 bg-primary text-secondary rounded-lg font-semibold hover:bg-orange-600 transition">
              {" "}
              {/* Button using primary color */}
              Get Started
            </button>
          </div>

          {/* Card 2: 1kg to 5kg */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-700 transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110">
            {" "}
            {/* Adjusted card background and border */}
            <h3 className="text-2xl font-semibold text-white mb-2">
              1kg - 5kg
            </h3>{" "}
            {/* Changed text to white */}
            <span className="text-4xl font-bold text-primary mb-4">
              NGN1,500
            </span>{" "}
            {/* Using primary brand color */}
            <ul className="text-gray-300 text-left w-full mb-6">
              {" "}
              {/* Adjusted text for contrast */}
              <li className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-primary mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                Medium-sized packages
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-primary mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                Secure handling
              </li>
            </ul>
            <button className="mt-auto w-full px-6 py-3 bg-primary text-secondary rounded-lg font-semibold hover:bg-orange-600 transition">
              {" "}
              {/* Button using primary color */}
              Get Started
            </button>
          </div>

          {/* Card 3: Additional Weight */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-700 transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110">
            {" "}
            {/* Adjusted card background and border */}
            <h3 className="text-2xl font-semibold text-white mb-2">
              Additional Kg
            </h3>{" "}
            {/* Changed text to white */}
            <span className="text-4xl font-bold text-primary mb-4">
              NGN500
            </span>{" "}
            {/* Using primary brand color */}
            <ul className="text-gray-300 text-left w-full mb-6">
              {" "}
              {/* Adjusted text for contrast */}
              <li className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-primary mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                For every kg over 5kg
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-primary mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                Perfect for bulk orders
              </li>
            </ul>
            <button className="mt-auto w-full px-6 py-3 bg-primary text-secondary rounded-lg font-semibold hover:bg-orange-600 transition">
              {" "}
              {/* Button using primary color */}
              Contact Us
            </button>
          </div>
        </div>

        {/* Fragile Item Note */}
        <div
          className="mt-12 bg-yellow-900 border-l-4 border-primary text-gray-100 p-4 rounded-lg"
          role="alert"
        >
          {" "}
          {/* Adjusted background and text colors */}
          <p className="font-bold">Fragile Items</p>
          <p>
            An additional <strong className="text-primary">NGN200</strong> fee
            is applied to all prices for fragile items.
          </p>{" "}
          {/* Using primary brand color */}
        </div>
      </div>
    </section>
  );
}
