import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

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
        <div className="border-b-1 flex justify-center py-3 mb-2 items-center">
          {" "}
          <img className="h-15 w-auto p" src="/trace.svg" alt="logo" />
        </div>
        <div className="flex px-6">
          {" "}
          <div
            className={`rounded-full  font-semibold  w-15 h-15  ${
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
          <div className="px-6 font-semibold pt-2 text-md">
            <p>{user.name}</p>
            <button
              className="text-sm font-light hover:opacity-50 rounded-2xl"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>

        <div>
          <ul className="flex flex-col p-3">
            {side.map((s) => (
              <>
                <NavLink
                  key={s}
                  className={({ isActive }) =>
                    `navlink relative group ${
                      isActive
                        ? "text-gray-100 text-xl      rounded-2xl py-2 px-10 my-1 "
                        : " px-8 py-2 text-xl  hover:opacity-50 rounded-2xl"
                    }`
                  }
                  to={`${s}`}
                >
                  {s === "delivery" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 absolute bottom-2 left-0 "
                    >
                      <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                      <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                      <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                    </svg>
                  ) : s === "settings" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 absolute bottom-2 left-0"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : s === "history" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 absolute bottom-2 left-0"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : s === "payments" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 absolute bottom-2 left-0"
                    >
                      <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                      <path
                        fillRule="evenodd"
                        d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    {}
                  )}

                  {s.charAt(0).toUpperCase() + s.slice(1)}

                  <span
                    className={`absolute bottom-0.5 left-10 h-0.5 bg-gray-100 transition-all duration-1000 ease-in-out ${
                      current === `/dashboard/${s}` ? " w-35 " : "w-0"
                    }`}
                  ></span>
                </NavLink>
              </>
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
