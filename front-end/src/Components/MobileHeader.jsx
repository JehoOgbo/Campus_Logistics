import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function MobileHeader() {
  const [menu, setMenu] = useState(false);
  return (
    <nav className="bg-[#092238] p-3 text-gray-200 font-semibold shadow-md  w-full fixed top-0 z-20">
      <div className="flex justify-between  ">
        <img className="h-15  mr-4" src="/trace.svg" alt="logo" />
        <div
          className={`flex justify-end h-auto pt-2 pointer ${
            menu
              ? "animate-slide-out duration-300"
              : "animate-slide-in duration-300"
          }`}
          onClick={() => setMenu(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>

        <div
          className={`flex  fixed right-0 shadow-xl/30  top-0  z-40 bg-secondary h-screen w-80 flex-col items-center space-y-6  ${
            menu
              ? "animate-slide-in duration-2000"
              : "animate-slide-out duration-2000"
          } `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-10 absolute top-4 left-4"
            onClick={() => setMenu(false)}
          >
            <path
              fillRule="evenodd"
              d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="space-y-7 text-2xl tracking-wide leading-tight flex flex-col pt-17 animate-fade-in-up duration-2000   ">
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
            <a href="#">Blog</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
