import { useState } from "react";

export default function MobileHeader() {
  const [menu, isMenu] = useState(false);
  return (
    <nav className="bg-[#092238] p-3 text-gray-200 font-semibold shadow-xl/30">
      <div className="flex justify-between ">
        <img className="h-15  mr-4" src="/trace.svg" alt="logo" />
        <div className="flex justify-end h-auto pt-2 ">
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
      </div>
    </nav>
  );
}
