import { FaBoxOpen, FaTruck, FaMapMarkedAlt, FaSmile } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaBoxOpen className="text-4xl text-[#e07900] mb-4" />,
      title: "Place Your Order",
      description:
        "Use our easy-to-use platform to book a delivery. Just tell us what to deliver and where.",
    },
    {
      icon: <FaTruck className="text-4xl text-[#e07900] mb-4" />,
      title: "We Pick It Up",
      description:
        "A dedicated runner will be dispatched to your location to securely pick up your package.",
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl text-[#e07900] mb-4" />,
      title: "Track Your Delivery",
      description:
        "Watch your package in real-time as it makes its way across campus to its destination.",
    },
    {
      icon: <FaSmile className="text-4xl text-[#e07900] mb-4" />,
      title: "Delivered & Done",
      description:
        "Your package is delivered to your recipient's door, safe and sound, within the specified time.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 md:py-24 ">
      <div className="container mx-auto px-4 animate-in fade-in duration-1000">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#092238] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple, four-step process ensures your goods get to their
            destination on campus quickly and reliably.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-[#092238] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
