import { Link } from "react-router-dom";

export default function PrimarySection() {
  return (
    <div className="bg-[url(/pic4.jpg)] bg-cover relative bg-center  flex items-center    py-16 md:py-44">
      <div className="absolute inset-y-0 left-0 w-3/4  opacity-70 bg-gradient-to-r from-[#092238]   z-0"></div>
      <div className="w-full px-4 md:w-1/2 text-center md:text-left self-start md:py-0 text-shadow-lg relative z-10 ">
        <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold leading-tight  text-gray-200 ">
          Deliver Your Goods within and around Campuses
        </h1>
        <p className="text-xl font-semibold text-gray-200  md:text-lg mb-8 max-w-2xl mx-auto md:mx-0 ">
          A logistics solution for Students. Empowering Small Businesses and
          Student Driven Initiatives
        </p>
        <Link to="/delivery">
          <button className=" transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded p-2 text-2xl bg-[#e07900] text-white font-semibold ml-5">
            Make a Delivery Today!
          </button>
        </Link>
      </div>
    </div>
  );
}
