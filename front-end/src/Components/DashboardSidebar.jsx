import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../Contexts/UserContext";
export default function DashboardSidebar() {
  const side = ["delivery", "history", "payments", "settings"];
  const navigate = useNavigate;
  const { user, current, setToken } = useContext(UserContext);
  function handleSignOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  useEffect(() => {});
  return (
    <>
      <nav className="sticky top-0 flex flex-col w-60 bg-gradient-to-b from-[#1e3c72] to-[#2a5298] text-gray-200   shadow-xl/70 h-screen">
        <div
          className={`rounded-full  font-semibold  w-30 h-30 ${
            !user.image_path && "bg-primary"
          } flex items-center justify-center bg-center bg-cover self-center mt-2 border-r-4 shadow-xl/30`}
          style={
            user.image_path
              ? { backgroundImage: `url(${user.image_path})` } // existing image
              : {}
          }
        >
          {!user.image_path && (
            <h1 className="p-2 text-5xl ">
              {user.name
                .split(" ")
                .map((word) => word[0])
                .join(".")
                .toUpperCase()}
            </h1>
          )}
        </div>
        <div className="px-6 font-light pt-2 text-xl">
          <p>Welcome, {user.name}</p>
          <button
            className="text-sm font-semibold hover:opacity-50 rounded-2xl"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>

        <div>
          <ul className="flex flex-col p-3">
            {side.map((s) => (
              <NavLink
                className={({ isActive }) =>
                  `navlink relative group ${
                    isActive
                      ? "text-gray-100 text-xl      rounded-2xl p-2  my-3"
                      : " px-2 py-2 text-xl  hover:opacity-50 rounded-2xl"
                  }`
                }
                to={`${s}`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
                <span
                  className={`absolute bottom-0.5 left-2 h-0.5 bg-gray-100 transition-all duration-1000 ease-in-out ${
                    current === `/dashboard/${s}` ? " w-47 " : "w-0"
                  }`}
                ></span>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="mt-auto text-center border-t border-gray-500 pt-8 ">
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} A&U. All rights reserved.
          </p>
        </div>
      </nav>
    </>
  );
}
