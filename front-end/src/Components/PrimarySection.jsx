import { Link } from "react-router-dom";

export default function PrimarySection() {
  return (
    <div className="bg-[url(/pic4.jpg)] bg-cover relative bg-center pt-25   flex items-center animate-background-pan-new    py-16 md:py-49">
      <div className="absolute inset-y-0 left-0 w-3/4  opacity-70 bg-gradient-to-r from-[#092238]   z-0"></div>
      <div className="w-full px-4 md:w-1/2 text-center md:text-left self-start md:py-0 text-shadow-lg relative z-10 ">
        <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold leading-tight  text-gray-200  animate-fade-in-up duration-1000">
          Deliver Your Goods within and around Campuses
        </h1>
        <p className="text-xl font-semibold text-gray-200  md:text-lg mb-8 max-w-2xl mx-auto md:mx-0 animate-fade-in-up   ">
          A logistics solution for Students. Empowering Small Businesses and
          Student Driven Initiatives
        </p>
        <Link to="/delivery">
          <button
            className="ml-5 px-6 py-3 text-lg font-semibold text-white 
             bg-gradient-to-r from-orange-500 to-amber-600 
             rounded-full shadow-lg 
             transition-transform duration-300 ease-out 
             hover:scale-105 hover:shadow-xl hover:from-orange-600 hover:to-amber-700 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Make a Delivery Today!
          </button>
        </Link>
      </div>
    </div>
  );
}
