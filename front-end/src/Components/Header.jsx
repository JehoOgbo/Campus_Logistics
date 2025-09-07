import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-[#092238] p-3 text-gray-200 font-semibold shadow-xl/30">
      <div className="container mx-auto flex justify-between items-center">
        <img className="h-15 w-auto mr-4" src="/trace.svg" alt="logo" />
        <div className="space-x-7 text-xl  ">
          <a href="#">Pricing</a>

          <NavLink className="relative group " to="/delivery">
            Delivery
            <span className=" absolute top-8 bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </NavLink>
          <NavLink className="relative group" to="/tracking">
            Tracking
            <span className=" absolute top-8 bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </NavLink>

          <NavLink className="relative group" to="/support">
            Support
            <span className=" absolute top-8 bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </NavLink>
          <a href="#">About Us</a>
        </div>
        <div className="flex justify-end space-x-4 text-lg">
          <NavLink
            className=" text-[#092238] bg-gray-200 hover:bg-[#e07900] hover:border-[#e07900] hover:shadow-xl/30 hover:text-amber-50  border-solid px-2 py-2 rounded-xl border-2"
            to="/Register"
          >
            Sign Up
          </NavLink>
          <NavLink
            className="  text-amber-50  border-s-gray-200 border-solid px-2 py-1 rounded-lg border-2"
            to="/login"
          >
            Log In
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
